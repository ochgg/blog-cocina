const fs = require("fs");
const path = require("path");
const { validarArticulo } = require("../helpers/validar");
const Articulo = require("../models/Articulo");


const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de artículos"
    });
}

const crear = (req, res) => {

    // Recoger parametros por post a guardar
    let parametros = req.body;

    // Validar datos
    try {
        validarArticulo(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    // Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    // Asignar valores a objeto basado en el modelo (manual o automatico)
    //articulo.titulo = parametros.titulo;

    // Guardar el articulo en la base de datos
    articulo.save((error, articuloGuardado) => {

        if (error || !articuloGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el artículo"
            });
        }

        // Devolver resultado
        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Articulo creado con exito!!"
        })
    });
}

module.exports = {
    prueba,
    // curso,
    crear,
    // listar,
    // uno,
    // borrar,
    // editar,
    // subir,
    // imagen,
    // buscador
}