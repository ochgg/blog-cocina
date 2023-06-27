const express = require("express");

const mysql = require("mysql2/promise");
const connection = require("./config/connection");
const cors = require("cors");

require("dotenv").config();

//Mensaje de bienvenida
console.log("Bienvenido a la API DESDE MI COCINA");

//Conexion a la nbase de datos
connection();

//Crear servidor node
const app = express();
const port = process.env.PORT;

//Configurar cors
app.use(cors());

//Convertir los datos del body o objetos json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//Ruta de prueba
app.get("/ruta-prueba", (req, res) => {
  return res.status(200).json({
    id: 1,
    nombre: "Omar",
    apellido: "Gannem",
  });
});

app.listen(port, function () {
  console.log(`Servidor NODE en el puerto ${port}`);
});

module.exports = app;