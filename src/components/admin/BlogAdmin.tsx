"use client";

import { ChangeEvent, ClipboardEvent, FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { isAppwriteConfigured } from "@/lib/appwrite";
import { authClient } from "@/lib/auth-client";
import type { BlogPost, BlogPostInput } from "@/types/blog";
import styles from "./BlogAdmin.module.css";

const emptyPost: BlogPostInput = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  tags: [],
  publishDate: new Date().toISOString(),
  readTime: "5 min read",
  image: "",
  imageFileId: "",
  published: false,
  seo: { title: "", description: "", keywords: [] },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function stringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
}

interface ContentImage {
  alt: string;
  url: string;
  rawUrl: string;
  width: number;
  fullMatch: string;
}

function extractContentImages(content: string): ContentImage[] {
  const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const images: ContentImage[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const [fullMatch, alt, rawUrl] = match;
    const widthMatch = rawUrl.match(/#width=(\d+)$/);
    const width = widthMatch ? Math.min(100, Math.max(25, Number(widthMatch[1]))) : 100;
    const cleanUrl = rawUrl.replace(/#width=\d+$/, "");

    images.push({
      alt: alt || "Pasted image",
      url: cleanUrl,
      rawUrl,
      width,
      fullMatch,
    });
  }

  return images;
}

export default function BlogAdmin() {
  const { data: session, isPending: sessionPending, refetch: refetchSession } = authClient.useSession();
  const user = session?.user;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogPostInput>(emptyPost);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingContentImage, setUploadingContentImage] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [jsonText, setJsonText] = useState("");
  const [showJsonInput, setShowJsonInput] = useState(false);
  const [message, setMessage] = useState("");

  const contentImages = extractContentImages(form.content);

  const loadPosts = useCallback(async () => {
    const response = await fetch("/api/admin/blog", { cache: "no-store" });
    const body = await response.json() as BlogPost[] | { error?: string };
    if (!response.ok) throw new Error("error" in body ? body.error || "Unable to load posts." : "Unable to load posts.");
    setPosts(body as BlogPost[]);
  }, []);

  useEffect(() => {
    if (!user) return;
    loadPosts().catch((error) => setMessage(error instanceof Error ? error.message : "Unable to load posts."));
  }, [loadPosts, user]);

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview(form.imageFileId ? form.image : "");
      return;
    }

    const previewUrl = URL.createObjectURL(coverFile);
    setCoverPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [coverFile, form.image, form.imageFileId]);

  async function login(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const result = await authClient.signIn.username({ username, password });
      if (result.error) throw new Error(result.error.message || "Unable to sign in.");
      await refetchSession();
      setPassword("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await authClient.signOut();
    setPosts([]);
    resetForm();
  }

  function resetForm() {
    setEditingId(null);
    setForm({ ...emptyPost, publishDate: new Date().toISOString() });
    setCoverFile(null);
    setMessage("");
  }

  function editPost(post: BlogPost) {
    setEditingId(String(post.id));
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags,
      publishDate: post.publishDate || new Date().toISOString(),
      readTime: post.readTime,
      image: post.image,
      imageFileId: post.imageFileId || "",
      published: Boolean(post.published),
      seo: post.seo,
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function loadJson(rawJson: string) {
    try {
      const parsed = JSON.parse(rawJson) as Record<string, unknown>;
      if (Array.isArray(parsed) || !parsed || typeof parsed !== "object") {
        throw new Error("The JSON file must contain one blog post object.");
      }

      const title = typeof parsed.title === "string" ? parsed.title.trim() : "";
      const excerpt = typeof parsed.excerpt === "string" ? parsed.excerpt.trim() : "";
      const content = typeof parsed.content === "string" ? parsed.content.trim() : "";
      const category = typeof parsed.category === "string" ? parsed.category.trim() : "";
      if (!title || !excerpt || !content || !category) {
        throw new Error("JSON requires title, excerpt, content, and category fields.");
      }

      const seo = parsed.seo && typeof parsed.seo === "object"
        ? parsed.seo as Record<string, unknown>
        : {};
      const rawDate = typeof parsed.publishDate === "string" ? parsed.publishDate : new Date().toISOString();
      const publishDate = new Date(rawDate);
      if (Number.isNaN(publishDate.getTime())) throw new Error("publishDate must be a valid date.");

      setEditingId(null);
      setCoverFile(null);
      setForm({
        title,
        slug: typeof parsed.slug === "string" ? slugify(parsed.slug) : slugify(title),
        excerpt,
        content,
        category,
        tags: stringList(parsed.tags),
        publishDate: publishDate.toISOString(),
        readTime: typeof parsed.readTime === "string" ? parsed.readTime : "5 min read",
        image: "",
        imageFileId: "",
        published: parsed.published === true,
        seo: {
          title: typeof seo.title === "string" ? seo.title : "",
          description: typeof seo.description === "string" ? seo.description : "",
          keywords: stringList(seo.keywords),
        },
      });
      setMessage("JSON loaded. Add a cover image, review the post, then save it.");
      setJsonText("");
      setShowJsonInput(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to import this JSON file.");
    }
  }

  async function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) loadJson(await file.text());
  }

  async function pasteContentImage(event: ClipboardEvent<HTMLTextAreaElement>) {
    const image = Array.from(event.clipboardData.items)
      .find((item) => item.kind === "file" && item.type.startsWith("image/"))
      ?.getAsFile();
    if (!image) return;

    event.preventDefault();
    const start = event.currentTarget.selectionStart;
    const end = event.currentTarget.selectionEnd;
    setUploadingContentImage(true);
    setMessage("Uploading pasted image...");

    try {
      const data = new FormData();
      data.set("image", image, image.name || `pasted-image-${Date.now()}.png`);
      const response = await fetch("/api/admin/blog/image", { method: "POST", body: data });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || "Unable to upload image.");

      const markdown = `\n![Pasted image](${result.url}#width=100)\n`;
      setForm((current) => ({
        ...current,
        content: `${current.content.slice(0, start)}${markdown}${current.content.slice(end)}`,
      }));
      setMessage("Image uploaded and inserted into article.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to upload image.");
    } finally {
      setUploadingContentImage(false);
    }
  }

  function updateImageWidth(targetImage: ContentImage, newWidth: number) {
    const newRawUrl = `${targetImage.url}#width=${newWidth}`;
    const newMarkdown = `![${targetImage.alt}](${newRawUrl})`;
    setForm((current) => ({
      ...current,
      content: current.content.replace(targetImage.fullMatch, newMarkdown),
    }));
  }

  function removeImageFromContent(targetImage: ContentImage) {
    setForm((current) => ({
      ...current,
      content: current.content.replace(targetImage.fullMatch, "").trim(),
    }));
  }

  function downloadJsonTemplate() {
    const template = {
      title: "Article title",
      slug: "article-title",
      excerpt: "A short summary of the article.",
      content: "# Introduction\n\nWrite the article in Markdown.",
      category: "Networking",
      tags: ["networking", "security"],
      publishDate: new Date().toISOString(),
      readTime: "5 min read",
      published: false,
      seo: {
        title: "Article title",
        description: "A search-friendly description.",
        keywords: ["networking", "security"],
      },
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(template, null, 2)], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "blog-post-template.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function savePost(event: FormEvent) {
    event.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage("");
    try {
      const data = new FormData();
      data.set("post", JSON.stringify(form));
      if (coverFile) data.set("cover", coverFile);
      const response = await fetch(editingId ? `/api/admin/blog/${editingId}` : "/api/admin/blog", {
        method: editingId ? "PATCH" : "POST",
        body: data,
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to save the post.");
      const successMessage = editingId ? "Post updated." : "Post created.";
      resetForm();
      setMessage(successMessage);
      await loadPosts().catch(() => setMessage(`${successMessage} Refresh the page to update the library.`));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save the post.");
    } finally {
      setSaving(false);
    }
  }

  async function deletePost(post: BlogPost) {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;

    try {
      const response = await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to delete the post.");
      if (editingId === String(post.id)) resetForm();
      setMessage("Post deleted.");
      await loadPosts().catch(() => setMessage("Post deleted. Refresh the page to update the library."));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete the post.");
    }
  }

  if (!isAppwriteConfigured) {
    return (
      <main className={styles.centered}>
        <div className={styles.loginCard}>
          <p className={styles.eyebrow}>Configuration required</p>
          <h1>Connect the blog collection</h1>
          <p>Add the Appwrite database, blog table, and bucket IDs described in <code>APPWRITE_SETUP.md</code>.</p>
        </div>
      </main>
    );
  }

  if (sessionPending) {
    return <main className={styles.centered}><div className={styles.loginCard}><p>Checking session...</p></div></main>;
  }

  if (!user) {
    return (
      <main className={styles.centered}>
        <form className={styles.loginCard} onSubmit={login}>
          <p className={styles.eyebrow}>Private workspace</p>
          <h1>Blog studio</h1>
          <p>Sign in with your administrator username and password.</p>
          <label>Username<input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required /></label>
          <label>Password<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          {message && <p className={styles.error}>{message}</p>}
          <button type="submit" disabled={loading || sessionPending}>{loading ? "Signing in..." : "Sign in"}</button>
          <Link href="/blog">Back to blog</Link>
        </form>
      </main>
    );
  }

  return (
    <main className={styles.admin}>
      <header className={styles.topbar}>
        <div><span>HP / Studio</span><strong>Blog administration</strong></div>
        <nav><Link href="/blog" target="_blank">View site</Link><button onClick={logout}>Sign out</button></nav>
      </header>

      <div className={styles.workspace}>
        <section className={styles.editor}>
          <div className={styles.metrics}>
            <div><strong>{posts.length}</strong><span>Total entries</span></div>
            <div><strong>{posts.filter((post) => post.published).length}</strong><span>Published</span></div>
            <div><strong>{posts.filter((post) => !post.published).length}</strong><span>Drafts</span></div>
          </div>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>{editingId ? "Editing entry" : "New entry"}</p><h1>{editingId ? "Refine the story" : "Write something useful"}</h1></div>
            {editingId && <button className={styles.textButton} onClick={resetForm}>Cancel edit</button>}
          </div>

          <div className={styles.importCard}>
            <div className={styles.importIcon}>{"{ }"}</div>
            <div><strong>Import from JSON</strong><p>Load a prepared article into the editor, then review and publish it.</p></div>
            <div className={styles.importActions}>
              <button type="button" onClick={downloadJsonTemplate}>Download template</button>
              <button type="button" onClick={() => setShowJsonInput((visible) => !visible)}>Paste JSON</button>
              <label className={styles.importButton}>Choose file<input type="file" accept="application/json,.json" onChange={importJson} /></label>
            </div>
            {showJsonInput && (
              <div className={styles.jsonInput}>
                <textarea value={jsonText} onChange={(event) => setJsonText(event.target.value)} rows={10} placeholder={'{\n  "title": "Article title",\n  "content": "# Introduction"\n}'} />
                <div><button type="button" onClick={() => { setJsonText(""); setShowJsonInput(false); }}>Cancel</button><button type="button" onClick={() => loadJson(jsonText)} disabled={!jsonText.trim()}>Load into editor</button></div>
              </div>
            )}
          </div>

          <form onSubmit={savePost} className={styles.form}>
            <label className={styles.full}>Title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value, slug: editingId ? form.slug : slugify(event.target.value) })} required maxLength={180} /></label>
            <label className={styles.full}>Slug<input value={form.slug} onChange={(event) => setForm({ ...form, slug: slugify(event.target.value) })} required maxLength={180} /></label>
            <label className={styles.full}>Excerpt<textarea value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} required maxLength={500} rows={3} /></label>
            <label className={styles.full}>Content <small>{uploadingContentImage ? "Uploading pasted image..." : "Markdown supported - paste an image to upload it"}</small><textarea className={styles.contentEditor} value={form.content} onPaste={pasteContentImage} onChange={(event) => setForm({ ...form, content: event.target.value })} required rows={18} /></label>
            
            {contentImages.length > 0 && (
              <div className={`${styles.full} ${styles.imagePreviewSection}`}>
                <span className={styles.previewLabel}>
                  {contentImages.length === 1 ? "Image preview" : `Image previews (${contentImages.length})`}
                </span>
                <div className={styles.imagePreviewGrid}>
                  {contentImages.map((img, index) => (
                    <div key={`${img.url}-${index}`} className={styles.imagePreviewCard}>
                      <div className={styles.imageFrame}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={img.alt || `Preview ${index + 1}`}
                          style={{ width: `${img.width}%` }}
                        />
                      </div>
                      <div className={styles.imageControls}>
                        <div className={styles.imageControlHeader}>
                          <span className={styles.imageAlt}>{img.alt || "Pasted image"}</span>
                          <span className={styles.imageWidthBadge}>{img.width}% width</span>
                        </div>
                        <input
                          type="range"
                          min="25"
                          max="100"
                          step="5"
                          value={img.width}
                          onChange={(event) => updateImageWidth(img, Number(event.target.value))}
                        />
                        <div className={styles.imageActions}>
                          <button
                            type="button"
                            className={styles.removeImageBtn}
                            onClick={() => removeImageFromContent(img)}
                          >
                            Remove image
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <label>Category<input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required maxLength={80} /></label>
            <label>Read time<input value={form.readTime} onChange={(event) => setForm({ ...form, readTime: event.target.value })} required maxLength={30} /></label>
            <label className={`${styles.full} ${styles.uploadField}`}>Cover image <small>JPG, PNG, or WebP</small>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setCoverFile(event.target.files?.[0] || null)} required={!form.imageFileId} />
              {(coverFile || form.imageFileId) && (
                <span className={styles.fileName}>{coverFile ? coverFile.name : "Current image will be kept"}</span>
              )}
            </label>
            {coverPreview && <div className={`${styles.full} ${styles.coverPreview}`}><Image src={coverPreview} alt="Cover preview" width={400} height={225} unoptimized style={{ width: "100%", height: "auto" }} /><span>Cover preview</span></div>}
            <label>Publish date<input type="datetime-local" value={form.publishDate.slice(0, 16)} onChange={(event) => setForm({ ...form, publishDate: new Date(event.target.value).toISOString() })} required /></label>
            <label>Tags <small>Comma separated</small><input value={form.tags.join(", ")} onChange={(event) => setForm({ ...form, tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) })} /></label>

            <div className={`${styles.full} ${styles.seoBlock}`}>
              <h2>Search preview</h2>
              <label>SEO title<input value={form.seo.title} onChange={(event) => setForm({ ...form, seo: { ...form.seo, title: event.target.value } })} maxLength={200} placeholder="Defaults to post title" /></label>
              <label>SEO description<textarea value={form.seo.description} onChange={(event) => setForm({ ...form, seo: { ...form.seo, description: event.target.value } })} maxLength={500} rows={3} placeholder="Defaults to excerpt" /></label>
              <label>SEO keywords <small>Comma separated</small><input value={form.seo.keywords.join(", ")} onChange={(event) => setForm({ ...form, seo: { ...form.seo, keywords: event.target.value.split(",").map((keyword) => keyword.trim()).filter(Boolean) } })} /></label>
            </div>

            <div className={`${styles.full} ${styles.publishBar}`}>
              <label className={styles.toggle}><input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} /><span /> Publish immediately</label>
              <button type="submit" disabled={saving}>{saving ? "Saving..." : editingId ? "Update post" : "Create post"}</button>
            </div>
            {message && <p className={`${styles.full} ${styles.message}`}>{message}</p>}
          </form>
        </section>

        <aside className={styles.library}>
          <div className={styles.libraryHeader}><div><p className={styles.eyebrow}>Library</p><h2>{posts.length} {posts.length === 1 ? "entry" : "entries"}</h2></div></div>
          <div className={styles.postList}>
            {posts.length === 0 && <p className={styles.empty}>Your first story starts in the editor.</p>}
            {posts.map((post) => (
              <article key={post.id} className={styles.postCard}>
                <div className={styles.postMeta}><span className={post.published ? styles.live : styles.draft}>{post.published ? "Live" : "Draft"}</span><time>{new Date(post.publishDate || post.date).toLocaleDateString()}</time></div>
                <h3>{post.title}</h3><p>{post.category}</p>
                <div><button onClick={() => editPost(post)}>Edit</button><button className={styles.deleteButton} onClick={() => deletePost(post)}>Delete</button></div>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}

