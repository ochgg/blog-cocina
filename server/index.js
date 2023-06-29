const express = require("express");
const mysql = require("mysql2/promise");
const connection = require("./config/connection");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

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

//Rutas
const routes_articulo = require("./routes/articulo");

//Carga las rutas
app.use("/", routes_articulo);

// Configurar la ruta para servir archivos estáticos
app.use('/public/uploads/images', express.static('public/uploads/images'));

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname);
  }
});

const upload = multer({ storage });

// Ruta para la carga de imágenes
app.post('/create', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No se ha seleccionado ninguna imagen.');
    }

    // Aquí puedes realizar cualquier procesamiento adicional con la imagen cargada

    // Obtener la ruta de la imagen cargada
    const imagePath = req.file.path.replace('public/', '');

    // Guardar la ruta de la imagen en la base de datos
    const dbConnection = await connection();
    const createArticuloSql = 'INSERT INTO posts (title, content, image) VALUES (?, ?, ?)';
    const [result] = await dbConnection.query(createArticuloSql, [req.body.title, req.body.content, imagePath]);

    res.json({ id: result.insertId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
});


/////////// Ruta para obtener Articulos/////////////////
app.get("/articulos", async (req, res) => {
  try {
    const dbConnection = await connection();
    const getArticulosSql = "SELECT * FROM posts";
    const [articulos] = await dbConnection.query(getArticulosSql);
    res.json(articulos);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
  }
});

app.listen(port, function () {
  console.log(`Servidor NODE en el puerto ${port}`);
});

module.exports = app;