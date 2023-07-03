import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
// import { GiBroom } from "react-icons/gi";
import { BiPencil } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";

export const Article = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [articulo, setArticulo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const response = await fetch(Global.url + `articulo/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener el artículo");
        }
        const data = await response.json();
        console.log(data);
        setArticulo(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchArticulo();
  }, [id]);

  useEffect(() => {
    if (articulo) {
      setFormData({
        title: articulo?.title || "",
        content: articulo?.content || "",
      });
    }
  }, [articulo]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const saveChanges = async () => {
    try {
      const { title, content } = formData;

      const formDataToSend = new FormData(); // Renombra la variable a 'formDataToSend' o cualquier otro nombre

      console.log('Image:', image);

      formDataToSend.append('title', title);
      formDataToSend.append('content', content);

      // Adjunta la imagen al FormData si existe
      if (image) {
        formDataToSend.append('image', image);
      }

      const response = await fetch(Global.url + `editar/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });
      const responseData = await response.json();

      if (response.ok) {
        setIsSaved(true);
        setIsEditMode(false);
        setIsModified(true);
        console.log("Los cambios se guardaron correctamente");

        // Obtener la URL de la imagen nueva desde la respuesta del servidor
        if (image) {
          // Obtener la URL de la imagen nueva desde la respuesta del servidor
          const newImageUrl = responseData.imageUrl;
          setImageUrl(newImageUrl);
        }
      } else {
        console.error("Error al guardar los cambios:", responseData.error);
        // Mostrar mensaje de error al usuario

        setError("Error al guardar los cambios. Por favor, inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      // Mostrar mensaje de error al usuario
      setError("Error al guardar los cambios. Por favor, inténtelo de nuevo.");
    }
  };

  const onSubmit = (data) => {
    setIsSaved(true);
    setIsEditMode(false);
    setIsModified(true);
    // setImagePreview("true");
    saveChanges(data);
  };

  const handleReset = () => {
    reset(formData);
    setImageUrl("");
    setImagePreview("");
    setIsEditMode(false);
    setIsModified(false);
    setIsSaved(false);
    setShowBackButton(false);
    setShowImage(false);
  };

  const enterEditMode = () => {
    setIsEditMode(true);
    setShowBackButton(true);
    setShowImage(true);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Desea borrar la receta?");

    if (confirmDelete) {
      try {
        const request = await fetch(Global.url + `delete/${id}`, {
          method: "DELETE",
        });
        const data = await request.json();

        if (data.status === "success") {
          console.log("La publicación ha sido eliminada correctamente");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          console.error("Error al eliminar la publicación:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="py-5 bg-light">
      <div className="container">
        <Form
          className="row form-border"
          onSubmit={handleSubmit(onSubmit)}
          onReset={handleReset}
        >
          <h1 className="text-center mb-4">Editar Receta</h1>
          {isSaved && (
            <div className="alert alert-success" role="alert">
              ¡El artículo se actualizo correctamente!
            </div>
          )}
          {!isEditMode && articulo && !isSaved && (
            <div className="card shadow-sm">
              <img
                src={Global.url + articulo.image}
                className="img-fluid bd-placeholder-img card-img-top"
                width="100%"
                height="400"
                alt="Imagen de la receta"
              />
            </div>
          )}
          {(imagePreview || (isEditMode && showImage) || imageUrl || (isEditMode && !isSaved)) && (
            <div className="mb-3">
              <img
                src={imagePreview || imageUrl || (articulo && Global.url + articulo.image)}
                alt="Preview"
                className="img-fluid bd-placeholder-img card-img-top"
                width="100%"
                height="400"
              />
            </div>
          )}

          {(isEditMode || !articulo) && (
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Adjunta imagen:</Form.Label>
              <Form.Control
                type="file"
                name="image"
                {...register("image")}
                size="sm"
                onChange={handleFileChange}
              />
            </Form.Group>
          )}
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Título:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="ejemplo: Cachopo"
              value={formData.title || ''}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  title: e.target.value,
                }))
              }
            // disabled={!isEditMode}
            />
            {errors.title?.type === "required" && !isSaved && (
              <p>El campo título es requerido</p>
            )}
            {errors.title?.type === "minLength" && (
              <p>El campo debe tener mínimo 10 caracteres</p>
            )}
            {errors.title?.type === "maxLength" && (
              <p>El campo debe tener menos de 100 caracteres</p>
            )}
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Contenido:</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              rows={7}
              value={formData.content || ''}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  content: e.target.value,
                }))
              }
              style={{ height: `${(formData.content?.split('\n').length || 1) * 1.8}rem` }}

            // disabled={!isEditMode}
            />
            {errors.content?.type === "required" && !isSaved && (
              <p>El campo contenido es requerido</p>
            )}
            {errors.content?.type === "minLength" && (
              <p>El campo debe tener mínimo 10 caracteres</p>
            )}
            {errors.content?.type === "maxLength" && (
              <p>El campo debe tener menos de 2000 caracteres</p>
            )}
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={enterEditMode}
                disabled={isEditMode}
              >
                <BiPencil />
              </button>
              {isEditMode && (
                <button
                  type="submit"
                  className="btn btn-sm btn-outline-secondary ml-2"
                  onSubmit={onSubmit}
                >
                  <FaSave />
                </button>
              )}
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleDelete}
              >
                <RiDeleteBinLine />
              </button>

            </div>

            <small className="text-muted">
              {articulo && new Date(articulo.create_at).toLocaleDateString("es-ES")}
            </small>
          </div>
        </Form>
      </div>
    </div>
  );
  { error && <p>{error}</p> }

};

export default Article;
