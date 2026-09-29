import "server-only";

import { Client, Storage, TablesDB } from "node-appwrite";

const endpoint = process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const projectId = process.env.APPWRITE_PROJECT_ID || "6ab47c63000703c01e90";
const apiKey = process.env.APPWRITE_API_KEY || "";

export const serverAppwriteConfig = {
  endpoint,
  projectId,
  databaseId: process.env.APPWRITE_DATABASE_ID || "6ab484f100374f0f8a4a",
  blogTableId:
    process.env.APPWRITE_BLOG_TABLE_ID ||
    process.env.APPWRITE_BLOG_COLLECTION_ID ||
    "6ab48652001afd165522",
  bucketId: process.env.APPWRITE_BLOG_BUCKET_ID || "6ab482ab002d3a323044",
};

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);

export const serverTablesDB = new TablesDB(client);
export const serverStorage = new Storage(client);
