import path from "node:path";
import { promises as fs } from "node:fs";

const dbPath = path.join(process.cwd(), "tasks.json");

export async function readDB() {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function writeDB(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
}
