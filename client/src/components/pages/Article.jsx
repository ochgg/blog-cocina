import React, { useState, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiPencil } from 'react-icons/bi';
import { FaSave } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
// import DateComponent  from '../../helpers/Date';


export const Article = () => {
  const [articulo, setArticulo] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const request = await fetch(`${Global.url}articulo/${id}`);
        const data = await request.json();
        setArticulo(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchArticulo();
  }, [id]);

  if (!articulo) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 g-2 justify-content-center">
            {articulo.map(articulo => (
              <article key={articulo.id} className="col">
                <div className="card shadow-sm">
                  <img src={Global.url + articulo.image} className="bd-placeholder-img card-img-top" width="100%" height="225" alt="Imagen de la receta" />
                  <div className="card-body">
                    <div className="d-flex justify-content-center align-items-center">
                      <h2 className="card-item">{articulo.title}</h2>
                    </div>
                    <p className="card-text">{articulo.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button className="btn btn-sm btn-outline-secondary">
                          <BiPencil />
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          <FaSave />
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          <RiDeleteBinLine />
                        </button>
                      </div>
                      <small className="text-muted">
                        {new Date(articulo.create_at).toLocaleDateString('es-ES')}
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
