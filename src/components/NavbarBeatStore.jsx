import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrito } from "../hooks/UseCarrito";
import { useLogin } from "../hooks/ContextLogin";

export default function NavbarBeatStore() {
  const { cart } = useCarrito();
  const { usuario, cerrarSesion } = useLogin();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/img/logo.png"
            alt="BeatStore Logo"
            width="60"
            className="me-2"
          />
          BeatStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Guitarras */}
            <NavDropdown title="🎸 Guitarras" id="guitarras-dropdown" menuVariant="dark">
              <NavDropdown.Item as={Link} to="/guitarras-acusticas">Guitarras acústicas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/guitarras-electricas">Guitarras eléctricas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/guitarras-electroacusticas">Guitarras electroacústicas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cuerdas">Cuerdas y accesorios</NavDropdown.Item>
            </NavDropdown>

            {/* Bajos */}
            <NavDropdown title="🎵 Bajos" id="bajos-dropdown" menuVariant="dark">
              <NavDropdown.Item as={Link} to="/bajos-electricos">Bajos eléctricos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/bajos-electroacusticos">Bajos electroacústicos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/mastil">Mástil y repuestos</NavDropdown.Item>
            </NavDropdown>

            {/* Percusión */}
            <NavDropdown title="🥁 Percusión" id="percusion-dropdown" menuVariant="dark">
              <NavDropdown.Item as={Link} to="/baterias">Baterías</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/congas">Congas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/baquetas">Baquetas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/percusion-menor">Percusión menor</NavDropdown.Item>
            </NavDropdown>

            {/* Teclados y Pianos */}
            <NavDropdown title="🎹 Teclados y Pianos" id="teclados-dropdown" menuVariant="dark">
              <NavDropdown.Item as={Link} to="/teclados-digitales">Teclados digitales</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/pianos-electricos">Pianos eléctricos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/pianos-acusticos">Pianos acústicos</NavDropdown.Item>
            </NavDropdown>

            {/* Audio */}
            <NavDropdown title="🎧 Audio" id="audio-dropdown" menuVariant="dark">
              <NavDropdown.Item as={Link} to="/microfonos">Micrófonos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/monitores">Monitores de estudio</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/auriculares">Auriculares</NavDropdown.Item>
            </NavDropdown>

            {/* Coleccionables */}
            <NavDropdown title="🪩 Coleccionables" id="accesorios-dropdown" menuVariant="dark">
              <NavDropdown.Item as={Link} to="/vinilos">Vinilos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/posters">Posters</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/merch">Merch oficial</NavDropdown.Item>
            </NavDropdown>

            {/* Botones de sesión */}
            {usuario ? (
              <>
                <Nav.Link as={Link} to="/perfil">Mi perfil</Nav.Link>
                <Nav.Link onClick={cerrarSesion}>Cerrar sesión</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
              </>
            )}

            {/* Carrito con contador dinámico */}
            <Nav.Link as={Link} to="/carrito" className="position-relative">
              🛒 Carrito
              {totalItems > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "0.7rem" }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
