import type { Metadata } from "next";
import BlogAdmin from "@/components/admin/BlogAdmin";

export const metadata: Metadata = {
  title: "Blog Admin",
  robots: { index: false, follow: false },
};

export default function BlogAdminPage() {
  return <BlogAdmin />;
}
