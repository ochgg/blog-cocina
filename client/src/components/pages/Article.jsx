import React from 'react'
import { useState, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';


export const Article = () => {

  const [articulo, setArticulo] = useState([]);

  useEffect(() => {
    let data = [
      {
        id: 1,
        title: "Titulo 1",
        contenido: "¡Una hamburguesa que sabe a México! Preparación paso a paso de hamburguesa mexicana para que te salga perfecta. Una hamburguesa de bacon casera muy fácil de hacer en casa."
      },

      {
        id: 2,
        title: "Titulo 2",
        contenido: "Contenido"
      },

      {
        id: 3,
        title: "Titulo 3",
        contenido: "Receta de arepas de choclo colombianas paso a paso para que te salga perfecta. Esta arepa se caracteriza por su sabor dulce e intenso a maíz."
      },

      {
        id: 4,
        title: "Titulo 4",
        contenido: "Contenido"
      },

      {
        id: 5,
        title: "Titulo 5",
        contenido: "Contenido"
      },

      {
        id: 6,
        title: "Titulo 6",
        contenido: "Contenido"
      },

    ];

    setArticulo(data);
  }, [])


  return (
    <>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Desde MI Cocina</h1>
            <p className="lead text-muted">¡Bienvenido a Desde MI Cocina! Descubre las recetas que sí funcionan, y cocina platos ricos con ingredientes de temporada y productos baratos. Aperitivos y entrantes, ensaladas, sopas y cremas, arroces y pastas, pescados y mariscos, carnes y aves, postres y dulces, sandwiches y bocadillos, panes y masas... Te encantarán todas estas recetas. ¡Buen provecho!</p>
          </div>
        </div>
      </section>

      <div className="py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {articulo.map(articulo => (
              <article key={articulo.id} className="col">
                <div className="card shadow-sm">
                  <Link to={"/articulo/"+articulo.id}>
                  <img src="https://i.blogs.es/8ad4da/arepas/1366_2000.jpg" className="bd-placeholder-img card-img-top" width="100%" height="225" alt="Imagen de la receta" />
                  </Link>
                  <div className="card-body">
                    <h3 className="card-item"><Link to={"/articulo/"+articulo.id}>{articulo.title}</Link></h3>
                    <p className="card-text">{articulo.contenido.slice(0, 47)+("...")}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <Link to={"/articulo/"+articulo.id} className="btn btn-sm btn-outline-secondary">
                          <IoEyeOutline />
                        </Link>
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          <RiDeleteBinLine />
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}