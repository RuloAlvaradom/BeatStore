import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrito } from "../../hooks/useCarrito";

export default function PercusionMenor() {
  const { addToCart } = useCarrito();

  const productos = [
    { id: 31, name: "Pandereta Meinl ABS", image: "img/percusion/percusionmenor1.jpg", price: 18990 },
    { id: 32, name: "Set de Maracas Profesionales", image: "img/percusion/percusionmenor2.jpg", price: 35500 },
    { id: 33, name: "Cencerro LP Aspire 5\"", image: "img/percusion/percusionmenor3.jpg", price: 29990 },
  ];

  return (
    <Container className="my-5 text-center">
      <h1 className="mb-4">Percusión Menor</h1>
      <Row>
        {productos.map((p) => (
          <Col md={4} className="mb-4" key={p.id}>
            <div className="card shadow-sm">
              <Link to={`/producto/${p.id}`}>
                <img src={p.image} alt={p.name} className="card-img-top" />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    to={`/producto/${p.id}`}
                    className="text-decoration-none nombre-producto"
                  >
                    {p.name}
                  </Link>
                </h5>

                <p className="card-text fw-bold">
                  ${p.price.toLocaleString("es-CL")} CLP
                </p>

                {/* Botón de agregar al carrito */}
                <button
                  className="btn btn-dark w-100"
                  onClick={(e) => {
                    addToCart(p);
                    e.currentTarget.classList.add("cart-animate");
                    setTimeout(() => e.currentTarget.classList.remove("cart-animate"), 400);
                    if (window.mostrarToast)
                      window.mostrarToast(`"${p.name}" agregado al carrito ✅`);
                  }}
                >
                  🛒 Agregar al carrito
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}