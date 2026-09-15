import * as SQLite from "expo-sqlite";

let databaseInstance = null;

export async function getDatabase() {
  if (!databaseInstance) {
    databaseInstance = await SQLite.openDatabaseAsync("recetando.db");
  }

  return databaseInstance;
}

export async function initializeDatabase() {
  const db = await getDatabase();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS recetas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      tiempo TEXT,
      imagen TEXT,
      ingredientes TEXT NOT NULL,
      preparacion TEXT,
      fecha_creacion TEXT NOT NULL
    );
  `);

  console.log("Base de datos inicializada correctamente");
}
