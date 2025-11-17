import { useLogin } from "../hooks/ContextLogin";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const { usuario, cerrarSesion } = useLogin();
  const navigate = useNavigate();

  if (!usuario) {
    return (
      <Container className="auth-container text-center">
        <h2 className="text-light">Debes iniciar sesión para ver tu perfil</h2>
        <Button variant="primary" className="mt-3" onClick={() => navigate("/login")}>
          Ir al login
        </Button>
      </Container>
    );
  }

  const { nombre, apodo, rut, telefono, email, region, ciudad, calle, numeroCasa } = usuario;

  return (
    <Container className="perfil-container">
      <Card className="perfil-card shadow-lg">
        <Card.Body>
          <h2 className="perfil-titulo text-center mb-4">Mi Perfil</h2>

          <Row className="mb-4">
            <Col md={4} className="text-center">
              <div className="perfil-avatar">
                <img
                  src="/img/perfil.png"
                  alt="Avatar usuario"
                  className="perfil-foto"
                />
              </div>
              <h4 className="perfil-nombre mt-3">{nombre}</h4>
              {apodo && <p className="perfil-apodo">@{apodo}</p>}
            </Col>

            <Col md={8}>
              <h5 className="perfil-subtitulo mb-3">Información personal</h5>
              <ul className="perfil-info">
                <li><strong>Correo:</strong> {email}</li>
                <li><strong>Teléfono:</strong> {telefono}</li>
                <li><strong>RUT:</strong> {rut}</li>
              </ul>

              <h5 className="perfil-subtitulo mt-4 mb-3">Dirección de envío</h5>
              <ul className="perfil-info">
                <li><strong>Región:</strong> {region}</li>
                <li><strong>Ciudad:</strong> {ciudad}</li>
                <li><strong>Calle:</strong> {calle}</li>
                <li><strong>Número:</strong> {numeroCasa}</li>
              </ul>

              <div className="text-end mt-4">
                <Button
                  variant="danger"
                  onClick={() => {
                    cerrarSesion();
                    navigate("/");
                  }}
                >
                  Cerrar sesión
                </Button>
              </div>
            </Col>
          </Row>

          <hr className="text-secondary" />

          <h5 className="perfil-subtitulo mt-4">Historial de compras</h5>
          <p className="perfil-vacio">Aún no has realizado compras.</p>
        </Card.Body>
      </Card>
    </Container>
  );
}
