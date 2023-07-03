const express = require("express");
const mysql = require("mysql2/promise");
const connection = require("./config/connection");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

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

//Carga las rutas
app.get("/", (req, res) => {
  const data = {
    message: "Hola desde MI Cocina",
  };
  res.json(data);
});

// Configurar la ruta para servir archivos estáticos
app.use("/public/uploads/images", express.static("public/uploads/images"));

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname);
  },
});

const upload = multer({ storage });
// Ruta para la carga de imágenes
app.post("/create", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No se ha seleccionado ninguna imagen.");
    }

    // Obtener la ruta de la imagen cargada
    const imagePath = req.file.path.replace("public/", "");

    // Guardar la ruta de la imagen en la base de datos
    const dbConnection = await connection();
    const createArticuloSql =
      "INSERT INTO posts (title, content, image) VALUES (?, ?, ?)";
    const [result] = await dbConnection.query(createArticuloSql, [
      req.body.title,
      req.body.content,
      imagePath,
    ]);

    res.json({ id: result.insertId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
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

/////////// Ruta para obtener Un Articulo/////////////////
app.get("/articulo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const dbConnection = await connection();
    const getArticulosSql = "SELECT * FROM posts WHERE id_posts = ?";
    const [articulos] = await dbConnection.query(getArticulosSql, [id]);
    res.json(articulos);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
  }
});

//////// Ruta para eliminar un articulo ////////////////////
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params; // Obtiene el parámetro ID de la solicitud

  try {
    const dbConnection = await connection(); // Establece una conexión a la base de datos

    // Consulta SQL para obtener la imagen de la publicación antes de borrarla
    const selectImageSql = "SELECT image FROM posts WHERE id_posts = ?";
    const [selectResult] = await dbConnection.query(selectImageSql, [id]);

    if (selectResult.length === 0) {
      return res.status(404).json({ message: "La publicación no existe" });
    }

    const imageFileName = selectResult[0].image;

    // Consulta SQL para eliminar la publicación con el ID especificado
    const deleteArticuloSql = "DELETE FROM posts WHERE id_posts = ?";
    const [deleteResult] = await dbConnection.query(deleteArticuloSql, [id]);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: "La publicación no existe" });
    }

    // Borrar la imagen del servidor
    deleteImage(imageFileName);

    res.json({ status: "success" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
  }
});

//////////////////Editar articulo//////////////
app.put("/editar/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  try {
    const dbConnection = await connection();

    if (req.file) {
      const image = req.file;
      const imagePath = image.path.replace("public/");

      // Consulta SQL para obtener la imagen de la publicación antes de actualizarla
      const selectImageSql = "SELECT image FROM posts WHERE id_posts = ?";
      const [selectResult] = await dbConnection.query(selectImageSql, [id]);

      if (selectResult.length === 0) {
        return res.status(404).json({ message: "La publicación no existe" });
      }

      const imageFileName = selectResult[0].image;

      // Consulta SQL para actualizar la publicación con la nueva imagen
      const updateArticuloSql =
        "UPDATE posts SET title = ?, content = ?, image = ? WHERE id_posts = ?";
      const [updateResult] = await dbConnection.query(updateArticuloSql, [
        title,
        content,
        imagePath,
        id,
      ]);

      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: "La publicación no existe" });
      }

      // Borrar la imagen anterior del servidor
      deleteImage(imageFileName);

      res.json({ status: "success", imageUrl: imagePath });
    } else {
      // Consulta SQL para actualizar la publicación sin cambiar la imagen
      const updateArticuloSql =
        "UPDATE posts SET title = ?, content = ? WHERE id_posts = ?";
      const [updateResult] = await dbConnection.query(updateArticuloSql, [
        title,
        content,
        id,
      ]);

      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: "La publicación no existe" });
      }

      res.json({ status: "success" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
  }
});

////// Función para borrar una imagen del servidor///////////////
function deleteImage(imageFileName) {
  const imagePath = path.join(__dirname, "/", imageFileName);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error al borrar la imagen:", err);
    } else {
      console.log("Imagen borrada:", imageFileName);
    }
  });
}

app.listen(port, function () {
  console.log(`Servidor NODE en el puerto ${port}`);
});

module.exports = app;
