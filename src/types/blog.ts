export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  image: string;
  imageFileId?: string;
  thumbnail: string;
  publishDate?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface BlogPostInput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  image: string;
  imageFileId: string;
  published: boolean;
  seo: BlogPost["seo"];
}
