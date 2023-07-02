import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { BiPencil } from "react-icons/bi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";

export const Edit = () => {
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
    }
  };

  // Función para guardar los cambios
  const saveChanges = async (data) => {
    try {
      const { title, content } = data;
  
      const response = await fetch(Global.url + `editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          imageUrl: imageUrl, // Agregar el estado de imageUrl en la solicitud
        }),
      });
      const responseData = await response.json();
  
      if (response.ok) {
        setIsSaved(true);
        setIsEditMode(false);
        setIsModified(true);
        console.log("Los cambios se guardaron correctamente");
      } else {
        console.error("Error al guardar los cambios:", responseData.error);
      }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    setIsSaved(true);
    setIsEditMode(false);
    setIsModified(true);
    saveChanges(data); // Llamar a saveChanges con los datos del formulario
  };

  // const handleReset = () => {
  //   reset();
  //   setImageUrl("");
  //   setImagePreview("");
  //   setIsEditMode(false);
  //   setIsModified(false);
  //   setIsSaved(false);
  //   setShowBackButton(false);
  //   setShowImage(false);
  // };

  // Función para activar el modo de edición
  const enterEditMode = () => {
    setIsEditMode(true);
    setShowBackButton(true);
    setShowImage(true);
  };

  
  
  const handleReset = () => {
    reset();
    setImageUrl("");
    setImagePreview("");
    setIsEditMode(false);
    setIsModified(false);
    setIsSaved(false);
    setShowBackButton(false);
    setShowImage(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleGoBack = () => {
    if (isEditMode) {
      setIsEditMode(false);
      setShowBackButton(false);
      setShowImage(false);
    }
  };

  // Función para eliminar la publicación y la imagen
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
          // Realizar cualquier otra lógica necesaria después de eliminar la publicación
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
              ¡El artículo se guardó correctamente! Redireccionando al inicio...
            </div>
          )}
          {!isEditMode && articulo && (
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
          {(imagePreview || (isEditMode && showImage) || imageUrl) && (
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
              placeholder="ejemplo: Cachopo"
              defaultValue={articulo?.title || ""}
              {...register("title", {
                required: isEditMode && isSaved === false,
                minLength: 10,
                maxLength: 100,
              })}
              disabled={!isEditMode}
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
              rows={7}
              defaultValue={articulo?.content || ""}
              {...register("content", {
                required: isEditMode && isSaved === false,
                minLength: 10,
                maxLength: 2000,
              })}
              disabled={!isEditMode}
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
              {isEditMode ? (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleGoBack}
                >
                  <RiArrowGoBackLine />
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={enterEditMode}
                  disabled={isEditMode}
                >
                  <BiPencil />
                </button>
              )}
              {isEditMode && (
                <button
                  type="submit"
                  className="btn btn-sm btn-outline-secondary ml-2"
                  onClick={saveChanges}
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
              {new Date(articulo.create_at).toLocaleDateString("es-ES")}
            </small>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Edit;
