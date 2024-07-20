import  path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import { asyncSingleton } from "./singleton.server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.SQLITE_DATABASE_FILENAME) {
    throw new Error("The environment variable 'SQLITE_DATABASE_FILENAME' is not set. Please configure it in your environment variables.");
}

export async function getDatabaseInstance() {
    return await asyncSingleton(
        "sqlite",
        async () => await open({
            filename: path.resolve(__dirname, process.env.SQLITE_DATABASE_FILENAME as string),
            driver: sqlite3.Database,
        })
    );
}