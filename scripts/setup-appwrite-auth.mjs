import { Client, OrderBy, Storage, TablesDB, TablesDBIndexType } from "node-appwrite";

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required.`);
  return value;
};

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(required("APPWRITE_PROJECT_ID"))
  .setKey(required("APPWRITE_API_KEY"));
const tables = new TablesDB(client);
const storage = new Storage(client);
const databaseId = required("APPWRITE_DATABASE_ID");
const blogTableId = required("APPWRITE_BLOG_TABLE_ID");
const blogBucketId = required("APPWRITE_BLOG_BUCKET_ID");

const schemas = {
  [blogTableId]: {
    name: "blogs",
    rowSecurity: true,
    strings: [
      ["title", 180],
      ["slug", 180],
      ["excerpt", 500],
      ["content", 100000],
      ["category", 80],
      ["tags", 80, true],
      ["readTime", 30],
      ["imageFileId", 36],
      ["seoTitle", 200],
      ["seoDescription", 500],
      ["seoKeywords", 100, true],
    ],
    urls: ["image"],
    dates: ["publishDate"],
    indexes: [["slug_idx", TablesDBIndexType.Unique, ["slug"]]],
  },
  auth_users: {
    strings: [["name", 255], ["email", 320], ["image", 2048], ["username", 30], ["displayUsername", 255]],
    booleans: ["emailVerified"],
    dates: ["createdAt", "updatedAt"],
    indexes: [["email_unique", TablesDBIndexType.Unique, ["email"]], ["username_unique", TablesDBIndexType.Unique, ["username"]]],
  },
  auth_sessions: {
    strings: [["token", 255], ["ipAddress", 64], ["userAgent", 4096], ["userId", 36]],
    dates: ["expiresAt", "createdAt", "updatedAt"],
    indexes: [["token_unique", TablesDBIndexType.Unique, ["token"]], ["session_user", TablesDBIndexType.Key, ["userId"]]],
  },
  auth_accounts: {
    strings: [["accountId", 255], ["providerId", 100], ["userId", 36], ["accessToken", 16384], ["refreshToken", 16384], ["idToken", 16384], ["scope", 2048], ["password", 1024]],
    dates: ["accessTokenExpiresAt", "refreshTokenExpiresAt", "createdAt", "updatedAt"],
    indexes: [["provider_account", TablesDBIndexType.Unique, ["providerId", "accountId"]], ["account_user", TablesDBIndexType.Key, ["userId"]]],
  },
  auth_verifications: {
    strings: [["identifier", 320], ["value", 2048]],
    dates: ["expiresAt", "createdAt", "updatedAt"],
    indexes: [["verification_identifier", TablesDBIndexType.Key, ["identifier"]]],
  },
};

async function ignoreConflict(operation) {
  try {
    await operation();
  } catch (error) {
    if (error?.code !== 409) throw error;
  }
}

for (const [tableId, schema] of Object.entries(schemas)) {
  await ignoreConflict(() => tables.createTable({
    databaseId,
    tableId,
    name: schema.name || tableId,
    permissions: [],
    rowSecurity: schema.rowSecurity || false,
  }));
  for (const [key, size, array = false] of schema.strings) {
    await ignoreConflict(() => tables.createStringColumn({ databaseId, tableId, key, size, required: false, array }));
  }
  for (const key of schema.urls || []) {
    await ignoreConflict(() => tables.createUrlColumn({ databaseId, tableId, key, required: false }));
  }
  for (const key of schema.booleans || []) {
    await ignoreConflict(() => tables.createBooleanColumn({ databaseId, tableId, key, required: false }));
  }
  for (const key of schema.dates) {
    await ignoreConflict(() => tables.createDatetimeColumn({ databaseId, tableId, key, required: false }));
  }
}

async function createIndexWhenReady(operation) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      await operation();
      return;
    } catch (error) {
      if (error?.code === 409) return;
      if (attempt === 29) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

// Appwrite creates columns asynchronously; retry indexes until their columns are available.
for (const [tableId, schema] of Object.entries(schemas)) {
  for (const [key, type, columns] of schema.indexes) {
    await createIndexWhenReady(() => tables.createIndex({
      databaseId,
      tableId,
      key,
      type,
      columns,
      orders: columns.map(() => OrderBy.Asc),
    }));
  }
}

const bucket = await storage.getBucket({ bucketId: blogBucketId });
if (!bucket.fileSecurity) {
  await storage.updateBucket({
    bucketId: blogBucketId,
    name: bucket.name,
    permissions: bucket.$permissions,
    fileSecurity: true,
    enabled: bucket.enabled,
    maximumFileSize: bucket.maximumFileSize,
    allowedFileExtensions: bucket.allowedFileExtensions,
    compression: bucket.compression,
    encryption: bucket.encryption,
    antivirus: bucket.antivirus,
    transformations: bucket.transformations,
  });
}

console.log("Appwrite blog storage, blog table, and Better Auth tables are ready.");
