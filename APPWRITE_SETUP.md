# Appwrite TablesDB and Better Auth setup

The blog and Better Auth both use Appwrite TablesDB. Blog administration is available at `/admin/blog` and uses a username and password.

## 1. Appwrite resources

1. Add Web platforms for `localhost` and the production domain.
2. Create a database. The setup command below creates or completes the `blogs` table with row security enabled.
3. Create an image Storage bucket with file security enabled. Allow JPG, PNG, and WebP files.
4. Create a server API key with database row read/write and Storage file read/write scopes. Store it only as `APPWRITE_API_KEY`.

The setup command creates these columns in the `blogs` table:

| Column | Type | Size / setting | Required |
| --- | --- | --- | --- |
| `title` | String | 180 | Yes |
| `slug` | String | 180 | Yes |
| `excerpt` | String | 500 | Yes |
| `content` | String | 100000 | Yes |
| `category` | String | 80 | Yes |
| `tags` | String array | 80 | No |
| `publishDate` | Datetime | | Yes |
| `readTime` | String | 30 | Yes |
| `image` | URL | | No |
| `imageFileId` | String | 36 | No |
| `seoTitle` | String | 200 | No |
| `seoDescription` | String | 500 | No |
| `seoKeywords` | String array | 100 | No |

Add a unique index named `slug_idx` on `slug`. Do not grant table-level create, update, or delete permission to browser users. Published rows and files receive public read permission from the authenticated server API; drafts remain private.

## 2. Environment

Copy the variable names from `.env.example` into `.env.local`. Generate `BETTER_AUTH_SECRET` with at least 32 random bytes. Use the production site URL for `BETTER_AUTH_URL` in production.

## 3. Better Auth tables

Create or complete the blog table and the private `auth_users`, `auth_sessions`, `auth_accounts`, and `auth_verifications` tables:

```bash
npm run setup:appwrite
```

The script is idempotent. The API key needs permission to create tables, columns, and indexes while this command runs. You can replace it afterward with a key limited to row and file access.

## 4. Initial administrator

Set `BETTER_AUTH_ADMIN_EMAIL`, `BETTER_AUTH_ADMIN_USERNAME`, and a long random `BETTER_AUTH_SETUP_TOKEN`, then run:

```bash
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -H "x-admin-setup-token: YOUR_SETUP_TOKEN" \
  -d '{"name":"Administrator","email":"admin@example.com","username":"admin","password":"use-a-long-unique-password"}'
```

After the request succeeds, remove `BETTER_AUTH_SETUP_TOKEN` from every environment. Registration is rejected without that token, and admin API routes also require the configured username.

## 5. JSON import

The editor accepts one post object at a time. Use **Download template**, **Choose file**, or **Paste JSON**, then add a cover image and review the post before saving.
