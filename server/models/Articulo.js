const mysql = require('mysql2');
const connection = require("../config/connection");

// Conexión a la base de datos
connection();

// Definir el modelo Articulo
const Articulo = {
  crear: (nuevoArticulo, callback) => {
    const { image, title, content, crate_at } = nuevoArticulo;
    const query = `
      INSERT INTO posts (image, title, content, crate_at)
      VALUES (?, ?, ?, ?)
    `;
    const values = [image, title, content, crate_at];

    connection.query(query, values, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }

      const nuevoArticuloId = results.insertId;
      callback(null, nuevoArticuloId);
    });
  },
};

module.exports = Articulo;
