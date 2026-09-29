import "server-only";

import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { username } from "better-auth/plugins";
import { appwriteAdapter } from "@/lib/appwrite-auth-adapter";
import { serverAppwriteConfig, serverTablesDB } from "@/lib/appwrite-server";

const adminEmail = process.env.BETTER_AUTH_ADMIN_EMAIL?.trim().toLowerCase();
const adminUsername = process.env.BETTER_AUTH_ADMIN_USERNAME?.trim().toLowerCase();

export const auth = betterAuth({
  database: appwriteAdapter({
    databaseId: serverAppwriteConfig.databaseId,
    tables: serverTablesDB,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true },
  disabledPaths: ["/is-username-available"],
  plugins: [username({ immutableUsername: true })],
  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (context.path !== "/sign-up/email") return;

      const setupToken = context.headers?.get("x-admin-setup-token");
      const body = context.body as { email?: string; username?: string } | undefined;
      if (
        !process.env.BETTER_AUTH_SETUP_TOKEN ||
        setupToken !== process.env.BETTER_AUTH_SETUP_TOKEN ||
        !adminEmail ||
        !adminUsername ||
        body?.email?.trim().toLowerCase() !== adminEmail ||
        body?.username?.trim().toLowerCase() !== adminUsername
      ) {
        throw new APIError("FORBIDDEN", { message: "Administrator registration is disabled." });
      }
    }),
  },
});

export type AuthSession = typeof auth.$Infer.Session;
