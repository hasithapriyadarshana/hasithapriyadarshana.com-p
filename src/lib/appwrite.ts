import { Client, Storage, TablesDB } from "appwrite";

export const appwriteConfig = {
  endpoint: process.env.APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  projectId: process.env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "6ab47c63000703c01e90",
  databaseId: process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "6ab484f100374f0f8a4a",
  tableId:
    process.env.APPWRITE_BLOG_TABLE_ID ||
    process.env.APPWRITE_BLOG_COLLECTION_ID ||
    process.env.NEXT_PUBLIC_APPWRITE_BLOG_TABLE_ID ||
    process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID ||
    "6ab48652001afd165522",
  bucketId: process.env.APPWRITE_BLOG_BUCKET_ID || process.env.NEXT_PUBLIC_APPWRITE_BLOG_BUCKET_ID || "6ab482ab002d3a323044",
};

export const isAppwriteConfigured = Boolean(
  appwriteConfig.databaseId && appwriteConfig.tableId && appwriteConfig.bucketId,
);

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
