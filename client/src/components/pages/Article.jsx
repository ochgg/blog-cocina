import React, { useState, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiPencil } from 'react-icons/bi';
import { FaSave } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
// import DateComponent  from '../../helpers/Date';


export const Article = () => {
  const [articulo, setArticulo] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
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

  // Función para activar el modo de edición
  const enterEditMode = () => {
    setIsEditMode(true);
  };

  // Función para guardar los cambios
  const saveChanges = () => {
    // Realizar la lógica para guardar los cambios
    // ...
    setIsEditMode(false);
  };

  // Función para eliminar la publicación y la imagen
  const handleDelete = async () => {

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
        <div className="py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 g-2 justify-content-center">
              {articulo.map((articulo) => (
                <article key={articulo.id} className="col-md-10">
                  <div className="card shadow-sm">
                    <img src={Global.url + articulo.image} className="img-fluid bd-placeholder-img card-img-top" width="100%" height="400" alt="Imagen de la receta" />
                    <div className="card-body">
                      <div className="d-flex justify-content-center align-items-center">
                        <h2 className="card-item">{articulo.title}</h2>
                      </div>
                      <p className="card-text">{articulo.content}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-secondary" onClick={enterEditMode} disabled={isEditMode}>
                            <BiPencil />
                          </button>
                          {isEditMode && ( // Mostrar el botón FaSave solo cuando está en modo de edición
                            <button type="button" className="btn btn-sm btn-outline-secondary ml-2" onClick={saveChanges}>
                              <FaSave />
                            </button>
                          )}
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleDelete}>
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
