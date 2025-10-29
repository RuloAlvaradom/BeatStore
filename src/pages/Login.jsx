import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useLogin } from "../hooks/ContextLogin";

export default function Login() {
  const { iniciarSesion } = useLogin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const manejarLogin = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    const { email, password } = formData;
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const usuarioGuardado = localStorage.getItem("usuarioBeatStore");
    if (!usuarioGuardado) {
      setError("No se encontró una cuenta registrada. Regístrate primero.");
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);
    if (usuario.email === email && usuario.password === password) {
      iniciarSesion(usuario);
      setExito("Inicio de sesión exitoso. Redirigiendo...");
      setTimeout(() => navigate("/perfil"), 1500);
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <Container className="auth-container">
      <div className="auth-form">
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {exito && <Alert variant="success">{exito}</Alert>}

        <Form onSubmit={manejarLogin}>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary" className="w-100 mt-2">
            Iniciar sesión
          </Button>
        </Form>

        <p className="text-center mt-3">
          ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>.
        </p>
      </div>
    </Container>
  );
}
