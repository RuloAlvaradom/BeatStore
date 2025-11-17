import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastNotificacion() {
  const [show, setShow] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const mostrarToast = (texto) => {
    setMensaje(texto);
    setShow(true);
    setTimeout(() => setShow(false), 2500);
  };

  window.mostrarToast = mostrarToast;

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast
        className="beat-toast"
        onClose={() => setShow(false)}
        show={show}
        delay={2500}
        autohide
      >
        <Toast.Header closeButton={false} className="beat-toast-header">
          <strong className="me-auto">🎶 BeatStore</strong>
        </Toast.Header>
        <Toast.Body className="beat-toast-body">{mensaje}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
