import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useCarrito } from "../../hooks/UseCarrito";
import { db } from "../../data/db";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCarrito();

  // Busca el producto en la "base de datos"
  const producto = db.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <Container className="text-center my-5">
        <h2>Producto no encontrado 😢</h2>
        <Button variant="dark" onClick={() => navigate(-1)}>
          ← Volver
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5 producto-detalle">
      <Row className="align-items-center">
        {/* Imagen */}
        <Col md={6} className="text-center">
          <img
            src={`/${producto.image}`}
            alt={producto.name}
            className="img-fluid rounded shadow-sm"
          />
        </Col>

        {/* Info del producto */}
        <Col md={6}>

          <h2 className="nombre-producto">{producto.name}</h2>

          <p className="descripcion-producto">{producto.description}</p>

          <h3 className="precio-detalle mb-4">
            ${producto.price.toLocaleString("es-CL")} CLP
          </h3>

          {/* Botón con animación y notificación */}
          <Button
            variant="dark"
            size="lg"
            className="me-3"
            onClick={(e) => {
              addToCart(producto);
              e.currentTarget.classList.add("cart-animate");
              setTimeout(() => e.currentTarget.classList.remove("cart-animate"), 400);
              if (window.mostrarToast)
                window.mostrarToast(`"${producto.name}" agregado al carrito ✅`);
            }}
          >
            🛒 Agregar al carrito
          </Button>

          {/* Botón volver */}
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => navigate(-1)}
          >
            ← Volver
          </Button>

          <hr className="my-4" />
          <p><strong>Disponibilidad:</strong> En stock ✅</p>
          <p><strong>Envíos:</strong> A todo Chile 🇨🇱</p>
        </Col>
      </Row>
    </Container>
  );
}
