import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaSave } from "react-icons/fa";
import { GiBroom } from 'react-icons/gi';

export const Create = () => {
  return (
    <div className="d-flex justify-content-center">
      <Form className="row form-border">
        <h1 className="text-center mb-4">Agregar Receta</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Titulo:</Form.Label>
          <Form.Control type="text" placeholder="ejemplo: Cachopo" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Contenido:</Form.Label>
          <Form.Control as="textarea" rows={7} />
        </Form.Group>
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Adjunta imagen:</Form.Label>
          <Form.Control type="file" name="file0" size="sm" id="file" />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="secondary" type="submit">
            <FaSave className="mr-2" />
          </Button>
          <Button variant="secondary" type="submit">
            <GiBroom className="mr-2" />
          </Button> 
        </div>
      </Form>
    </div>
  );
};
