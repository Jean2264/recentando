import { getDatabase } from "./database";

export async function insertarReceta(receta) {
  const db = await getDatabase();
  const resultado = await db.runAsync(
    `
        INSERT INTO recetas (
        nombre,
        tiempo,
        imagen,
        ingredientes,
        preparacion,
        fecha_creacion    
        )
        VALUES (?,?,?,?,?,?)
        `,
    [
      receta.nombre,
      receta.tiempo ?? "",
      receta.imagen ?? null,
      JSON.stringify(receta.ingredientes ?? []),
      JSON.stringify(receta.preparacion ?? []),
      new Date().toISOString(),
    ],
  );

  return {
    id: String(resultado.lastInsertRowId),
    ...receta,
  };
}

export async function obtenerRecetas() {
  const db = await getDatabase();

  const filas = await db.getAllAsync(`
        SELECT * FROM recetas
        ORDER BY id DESC
        `);

  return filas.map((fila) => ({
    id: String(fila.id),
    nombre: fila.nombre,
    tiempo: fila.tiempo,
    imagen: fila.imagen,
    ingredientes: JSON.parse(fila.ingredientes || "[]"),
    preparacion: JSON.parse(fila.preparacion || "[]"),
    fechaCreacion: fila.fecha_creacion,
  }));
}

export async function obtenerRecetasPaginadas(limit = 20, offset = 0) {
  const db = await getDatabase();

  const filas = await db.getAllAsync(
    `
        SELECT * FROM
        recetas ORDER BY id DESC
        LIMIT ? OFFSET ?
        `,
    [limit, offset],
  );

  return filas.map((fila) => ({
    id: String(fila.id),
    nombre: fila.nombre,
    tiempo: fila.tiempo,
    imagen: fila.imagen,
    ingredientes: JSON.parse(fila.ingredientes || "[]"),
    preparacion: JSON.parse(fila.preparacion || "[]"),
    fechaCreacion: fila.fecha_creacion,
  }));
}
