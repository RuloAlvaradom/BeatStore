import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useLogin } from "../hooks/ContextLogin";

export default function Registro() {
  const { registrarUsuario } = useLogin();
  const navigate = useNavigate();

  const regionesDeChile = [
    "Región de Arica y Parinacota",
    "Región de Tarapacá",
    "Región de Antofagasta",
    "Región de Atacama",
    "Región de Coquimbo",
    "Región de Valparaíso",
    "Región Metropolitana de Santiago",
    "Región del Libertador General Bernardo O’Higgins",
    "Región del Maule",
    "Región de Ñuble",
    "Región del Biobío",
    "Región de La Araucanía",
    "Región de Los Ríos",
    "Región de Los Lagos",
    "Región de Aysén del General Carlos Ibáñez del Campo",
    "Región de Magallanes y de la Antártica Chilena",
  ];

  const [formData, setFormData] = useState({
    nombre: "",
    apodo: "",
    rut: "",
    telefono: "",
    email: "",
    password: "",
    confirmarPassword: "",
    region: "",
    ciudad: "",
    calle: "",
    numeroCasa: "",
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- VALIDACIONES ---
  const validarRut = (rut) => {
    rut = rut.replace(/[^\dkK]/g, "");
    if (rut.length < 8) return false;
    const cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplo * cuerpo[i];
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const dvEsperado = 11 - (suma % 11);
    const dvFinal =
      dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();
    return dv === dvFinal;
  };

  const validarTelefono = (telefono) => {
    const regex = /^(?:\+?56)?(?:9\d{8})$/;
    return regex.test(telefono);
  };

  const manejarRegistro = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    const {
      nombre,
      rut,
      telefono,
      email,
      password,
      confirmarPassword,
      region,
      ciudad,
      calle,
      numeroCasa,
    } = formData;

    if (
      !nombre ||
      !rut ||
      !telefono ||
      !email ||
      !password ||
      !confirmarPassword ||
      !region ||
      !ciudad ||
      !calle ||
      !numeroCasa
    ) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Validación RUT
    if (!validarRut(rut)) {
      setError("El RUT ingresado no es válido.");
      return;
    }

    // Validación teléfono
    if (!validarTelefono(telefono)) {
      setError("El número de teléfono debe ser chileno y tener formato válido (+569XXXXXXXX).");
      return;
    }

    // Validación contraseñas
    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    registrarUsuario(formData);
    setExito("Registro exitoso. Redirigiendo...");
    setTimeout(() => navigate("/perfil"), 1500);
  };

  return (
    <Container className="auth-container">
      <div className="auth-form">
        <h2 className="text-center mb-4">Crear cuenta</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {exito && <Alert variant="success">{exito}</Alert>}

        <Form onSubmit={manejarRegistro}>
          <h5 className="mt-4 mb-3 text-light">Datos personales</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre completo *</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ej: Raúl Alvarado"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Apodo (opcional)</Form.Label>
                <Form.Control
                  type="text"
                  name="apodo"
                  placeholder="Ej: ElGuitarrista"
                  value={formData.apodo}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>RUT *</Form.Label>
                <Form.Control
                  type="text"
                  name="rut"
                  placeholder="Ej: 12.345.678-9"
                  value={formData.rut}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono *</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  placeholder="Ej: +56 9 12345678"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mt-4 mb-3 text-light">Datos de cuenta</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Crea una contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Confirmar contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmarPassword"
                  placeholder="Repite tu contraseña"
                  value={formData.confirmarPassword}
                  onChange={handleChange}
                  isInvalid={
                    formData.password &&
                    formData.confirmarPassword &&
                    formData.password !== formData.confirmarPassword
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Las contraseñas no coinciden.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mt-4 mb-3 text-light">Dirección de envío</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Región *</Form.Label>
                <Form.Select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                >
                  <option value="">Selecciona tu región</option>
                  {regionesDeChile.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ciudad *</Form.Label>
                <Form.Control
                  type="text"
                  name="ciudad"
                  placeholder="Ej: Santiago"
                  value={formData.ciudad}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Calle *</Form.Label>
                <Form.Control
                  type="text"
                  name="calle"
                  placeholder="Ej: Av. Providencia"
                  value={formData.calle}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Número *</Form.Label>
                <Form.Control
                  type="text"
                  name="numeroCasa"
                  placeholder="Ej: 1234"
                  value={formData.numeroCasa}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary" className="w-100 mt-3">
            Registrarse
          </Button>
        </Form>

        <p className="text-center mt-3">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>.
        </p>
      </div>
    </Container>
  );
}
