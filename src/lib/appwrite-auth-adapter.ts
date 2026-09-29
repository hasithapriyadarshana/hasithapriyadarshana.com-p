import { ID, Query, type Models, type TablesDB } from "node-appwrite";
import { createAdapterFactory, type Where } from "better-auth/adapters";

type AppwriteAuthAdapterOptions = {
  databaseId: string;
  tables: TablesDB;
};

const tableNames: Record<string, string> = {
  user: "auth_users",
  session: "auth_sessions",
  account: "auth_accounts",
  verification: "auth_verifications",
};

function cleanRow<T>(row: Models.Row | Record<string, unknown>): T {
  const source = row as Record<string, unknown>;
  const data: Record<string, unknown> = { ...source, id: source.$id };
  for (const key of ["$id", "$createdAt", "$updatedAt", "$permissions", "$databaseId", "$tableId", "$sequence"]) {
    delete data[key];
  }
  return data as T;
}

function cleanData(data: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
}

function clauseQuery(clause: Where) {
  const field = clause.field === "id" ? "$id" : clause.field;
  const value = clause.value instanceof Date ? clause.value.toISOString() : clause.value;
  if (value === null) {
    return clause.operator === "ne" ? Query.isNotNull(field) : Query.isNull(field);
  }

  switch (clause.operator || "eq") {
    case "ne": return Query.notEqual(field, value);
    case "lt": return Query.lessThan(field, value);
    case "lte": return Query.lessThanEqual(field, value);
    case "gt": return Query.greaterThan(field, value);
    case "gte": return Query.greaterThanEqual(field, value);
    case "in": return Query.equal(field, value);
    case "not_in": return Query.notEqual(field, value);
    case "contains": return Query.contains(field, value as string);
    case "starts_with": return Query.startsWith(field, String(value));
    case "ends_with": return Query.endsWith(field, String(value));
    default: return Query.equal(field, value);
  }
}

function whereQueries(where: Where[] = []) {
  const clauses = where.map(clauseQuery);
  return where.some((clause) => clause.connector === "OR") && clauses.length > 1
    ? [Query.or(clauses)]
    : clauses;
}

export const appwriteAdapter = ({ databaseId, tables }: AppwriteAuthAdapterOptions) =>
  createAdapterFactory({
    config: {
      adapterId: "appwrite-tablesdb",
      adapterName: "Appwrite TablesDB",
      supportsDates: false,
      supportsBooleans: true,
      supportsJSON: false,
      supportsNumericIds: false,
      transaction: false,
    },
    adapter: () => ({
      create: async ({ model, data }) => {
        const { id, ...rowData } = cleanData(data);
        const row = await tables.createRow({
          databaseId,
          tableId: tableNames[model] || model,
          rowId: typeof id === "string" ? id : ID.unique(),
          data: rowData,
        });
        return cleanRow(row);
      },
      findOne: async ({ model, where }) => {
        const response = await tables.listRows({
          databaseId,
          tableId: tableNames[model] || model,
          queries: [...whereQueries(where), Query.limit(1)],
        });
        return response.rows[0] ? cleanRow(response.rows[0]) : null;
      },
      findMany: async ({ model, where, limit, offset, sortBy }) => {
        const queries = whereQueries(where);
        if (limit) queries.push(Query.limit(limit));
        if (offset) queries.push(Query.offset(offset));
        if (sortBy) {
          const field = sortBy.field === "id" ? "$id" : sortBy.field;
          queries.push(sortBy.direction === "desc" ? Query.orderDesc(field) : Query.orderAsc(field));
        }
        const response = await tables.listRows({ databaseId, tableId: tableNames[model] || model, queries });
        return response.rows.map((row) => cleanRow(row)) as never;
      },
      update: async ({ model, where, update }) => {
        const response = await tables.listRows({
          databaseId,
          tableId: tableNames[model] || model,
          queries: [...whereQueries(where), Query.limit(1)],
        });
        const row = response.rows[0];
        if (!row) return null;
        const updated = await tables.updateRow({
          databaseId,
          tableId: tableNames[model] || model,
          rowId: row.$id,
          data: cleanData(update as Record<string, unknown>),
        });
        return cleanRow(updated);
      },
      updateMany: async ({ model, where, update }) => {
        const response = await tables.updateRows({
          databaseId,
          tableId: tableNames[model] || model,
          queries: whereQueries(where),
          data: cleanData(update),
        });
        return response.rows.length;
      },
      delete: async ({ model, where }) => {
        const response = await tables.listRows({
          databaseId,
          tableId: tableNames[model] || model,
          queries: [...whereQueries(where), Query.limit(1)],
        });
        if (response.rows[0]) {
          await tables.deleteRow({ databaseId, tableId: tableNames[model] || model, rowId: response.rows[0].$id });
        }
      },
      deleteMany: async ({ model, where }) => {
        const response = await tables.deleteRows({
          databaseId,
          tableId: tableNames[model] || model,
          queries: whereQueries(where),
        });
        return response.rows.length;
      },
      count: async ({ model, where }) => {
        const response = await tables.listRows({
          databaseId,
          tableId: tableNames[model] || model,
          queries: whereQueries(where),
          total: true,
        });
        return response.total;
      },
    }),
  });
