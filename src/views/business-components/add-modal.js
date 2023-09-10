import { useState } from 'react';
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveCategory = () => {
    const jsonObject = replaceKeysInJSON(formData);

    axios.post(props.api, jsonObject, {
        headers: {
          'Content-Type': 'application/json', 
        },
      }) 
    .then(response => {
        setFormData({});
        handleClose();
        successNotify(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
      failedNotify('Error Occured');
    });
  };

  function replaceKeysInJSON(jsonObject) {
    function replaceKey(obj) {
      for (const key in obj) {
        if (key.includes('.')) {
          const keys = key.split('.');
          const value = obj[key];
          delete obj[key];
          
          let currentObj = obj;
          for (let i = 0; i < keys.length - 1; i++) {
            const keyPart = keys[i];
            currentObj[keyPart] = currentObj[keyPart] || {};
            currentObj = currentObj[keyPart];
          }
  
          const lastKey = keys[keys.length - 1];
          currentObj[lastKey] = value;
        } else if (typeof obj[key] === 'object') {
          replaceKey(obj[key]);
        }
      }
    }
  
    replaceKey(jsonObject);
  
    // Convert the modified object back to a JSON string
    const outputJSON = JSON.stringify(jsonObject);
  
    return outputJSON;
  };

  const successNotify = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

    const failedNotify = (message) => toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Button onClick={handleShow}>{props.label}</Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "var(--bs-primary)" }}>
            {props.header}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {props.inputFields.map((field, index) => (
              <Form.Group as={Row} className="mb-3" key={index}>
                <Form.Label column sm="3" style={{ textAlign: "right" }}>
                  {field.label}:
                </Form.Label>
                <Col sm="9">
                  {field.type !== "select" && (
                    <Form.Control
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                    />
                  )}
                  {field.type === "select" && (
                    <Form.Select
                      id={field.name}
                      name={field.name}
                      onChange={handleInputChange}
                    >
                      {props.options.map((option) => (
                        <option key={option.categoryId} value={option.categoryId}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Col>
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveCategory}>
            Save Category
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModal;