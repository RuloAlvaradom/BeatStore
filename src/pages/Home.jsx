import { Container, Row, Col, Carousel, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; 

export default function Home() {
  // Productos destacados en oferta
  const productosOferta = [
    {
      id: 101,
      name: "Squier Affinity Telecaster",
      image: "/img/guitarras/guitarraelectrica1.jpg",
      precioAnterior: 289990,
      precioNuevo: 249990,
    },
    {
      id: 102,
      name: "Micrófono Rode NT1-A",
      image: "/img/sonido/microfonos1.jpg",
      precioAnterior: 219990,
      precioNuevo: 199900,
    },
    {
      id: 103,
      name: "Batería Pearl Roadshow",
      image: "/img/percusion/baterias1.jpg",
      precioAnterior: 549990,
      precioNuevo: 499990,
    },
  ];

  return (
    <div>
      {/* Carrusel de portada */}
      <Carousel fade interval={4000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/carrusel/carrusel1.jpg"
            alt="Ofertas en guitarras"
          />
          <Carousel.Caption>
            <h3>🎸 ¡Ofertas en Guitarras!</h3>
            <p>Aprovecha descuentos en modelos Fender, Ibanez y más.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/carrusel/carrusel2.jpg"
            alt="Equipos de sonido profesionales"
          />
          <Carousel.Caption>
            <h3>🎧 Audio Profesional</h3>
            <p>Encuentra monitores, micrófonos y auriculares de estudio.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/carrusel/carrusel3.jpg"
            alt="Instrumentos de percusión"
          />
          <Carousel.Caption>
            <h3>🥁 Percusión de alto nivel</h3>
            <p>Baterías, congas y más para dar ritmo a tu música.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Bienvenida */}
      <Container className="my-5 text-center">
        <div className="welcome-box">
          <h1 className="mb-3">¡Bienvenido a BeatStore! 🎵</h1>
          <p className="lead">
            Tu tienda de instrumentos musicales y audio profesional favorita.
            Encuentra desde guitarras hasta equipos de grabación, con envío a todo Chile 🇨🇱.
          </p>
        </div>
      </Container>

      {/* Productos en oferta */}
      <Container className="my-5 text-center">
        <h2 className="section-title">Productos en oferta</h2>
        <Row>
          {productosOferta.map((p) => (
            <Col md={4} className="mb-4" key={p.id}>
              <Card className="h-100 text-center shadow-sm oferta">
                <Link to={`/producto/${p.id}`}>
                  <Card.Img variant="top" src={p.image} alt={p.name} />
                </Link>
                <Card.Body>
                  <Card.Title className="text-light">{p.name}</Card.Title>
                  <Card.Text className="precio-oferta">
                    <span className="precio-anterior">
                      ${p.precioAnterior.toLocaleString("es-CL")}
                    </span>
                    <span className="precio-descuento">
                      ${p.precioNuevo.toLocaleString("es-CL")} CLP
                    </span>
                  </Card.Text>

                  <Link to={`/producto/${p.id}`}>
                    <Button variant="dark">Ver producto</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Marcas */}
      <Container className="text-center my-5">
        <h2 className="section-title">Marcas con las que trabajamos</h2>
        <Row className="justify-content-center marcas">
          {["gibson", "fender", "yamaha", "roland", "ibanez", "LP"].map((marca) => (
            <Col xs={6} md={2} className="mb-3 marca-tarjeta" key={marca}>
              <img src={`/img/marcas/${marca}.png`} alt={marca} className="img-fluid" />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
