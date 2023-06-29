import React, { useState, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import ReactTimeAgo from 'react-time-ago';

export const Home = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    try {
      const request = await fetch(Global.url + "articulos/", {
        method: 'GET',
      });

      const data = await request.json();
      console.log(data);
      if (Array.isArray(data)) {
        setArticulos(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Función para eliminar la publicación y la imagen
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm('¿Desea borrar la receta?');

    if (confirmDelete) {
      try {
        const request = await fetch(Global.url + `delete/${id}`, { method: 'DELETE' });
        const data = await request.json();

        if (data.status === 'success') {
          console.log('La publicación ha sido eliminada correctamente');
          // Realizar cualquier otra lógica necesaria después de eliminar la publicación
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        } else {
          console.error('Error al eliminar la publicación:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    };

  return (
    <>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Desde MI Cocina</h1>
            <p className="lead text-muted">
              ¡Bienvenido a Desde MI Cocina! Descubre las recetas que sí funcionan, y cocina platos ricos con ingredientes
              de temporada y productos baratos. Aperitivos y entrantes, ensaladas, sopas y cremas, arroces y pastas, pescados
              y mariscos, carnes y aves, postres y dulces, sandwiches y bocadillos, panes y masas... Te encantarán todas estas
              recetas. ¡Buen provecho!
            </p>
          </div>
        </div>
      </section>
    
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {articulos.map(articulo => (
              <article key={articulo.id} className="col">
                <div className="card shadow-sm">
                  <Link to={'/articulo/' + articulo.id_posts}>
                    <img
                      src={Global.url + articulo.image}
                      className="bd-placeholder-img card-img-top"
                      width="100%"
                      height="225"
                      alt="Imagen de la receta"
                    />
                  </Link>
                  <div className="card-body">
                    <h2 className="card-item">
                      <Link to={'/articulo/' + articulo.id_posts}>{articulo.title}</Link>
                    </h2>
                    <p className="card-text">{articulo.content.slice(0, 47) +'...'}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <Link to={'/articulo/' + articulo.id_posts} className="btn btn-sm btn-outline-secondary">
                          <IoEyeOutline />
                        </Link>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(articulo.id_posts)}>
                          <RiDeleteBinLine />
                        </button>
                      </div>
                      <small className="text-muted">
                        <ReactTimeAgo date={new Date(articulo.create_at)} />
                      </small>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
