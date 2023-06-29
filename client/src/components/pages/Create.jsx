import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaSave } from 'react-icons/fa';
import { GiBroom } from 'react-icons/gi';
import { Global } from '../../helpers/Global';

export const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);

      const request = await fetch(Global.url + 'create/', {
        method: 'POST',
        body: formData,
      });

      const data = await request.json();
      console.log(title, content, image);
      console.log(data);
      setIsSaved(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setTitle('');
    setContent('');
    setImage(null);
  };

  useEffect(() => {
    if (isSaved) {
      const timer = setTimeout(() => {
        setIsSaved(false);
        window.location.href = '/';
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSaved]);

  return (
    <div className="d-flex justify-content-center">
      <Form className="row form-border" onSubmit={handleSubmit} onReset={handleReset}>
        <h1 className="text-center mb-4">Agregar Receta</h1>
        {isSaved && (
          <div className="alert alert-success" role="alert">
            ¡La receta se guardó correctamente! Redireccionando al home...
          </div>
        )}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Titulo:</Form.Label>
          <Form.Control type="text" placeholder="ejemplo: Cachopo" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Contenido:</Form.Label>
          <Form.Control as="textarea" rows={7} value={content} onChange={(e) => setContent(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Adjunta imagen:</Form.Label>
          <Form.Control type="file" name="file0" size="sm" onChange={handleFileChange} />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="secondary" type="submit">
            <FaSave className="mr-2" /> Guardar
          </Button>
          <Button variant="secondary" type="reset">
            <GiBroom className="mr-2" /> Limpiar
          </Button>
        </div>
      </Form>
    </div>
  );
};
