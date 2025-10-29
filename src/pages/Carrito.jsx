import { useCarrito } from "../hooks/UseCarrito";
import { Table, Button, Container } from "react-bootstrap";


export default function Carrito() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useCarrito();

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">🛒 Tu Carrito</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="lead">Tu carrito está vacío 😢</p>
          <a href="/" className="btn btn-dark mt-3">
            Volver a la tienda
          </a>
        </div>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className="text-center align-middle"
          >
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name || "Producto sin nombre"}</strong>
                  </td>

                  {/* Protegemos el precio */}
                  <td>
                    {item.price
                      ? `$${item.price.toLocaleString("es-CL")} CLP`
                      : "Precio no disponible"}
                  </td>

                  {/* Cantidad con valor por defecto */}
                  <td>{item.quantity ?? 1}</td>

                  {/* otal protegido */}
                  <td>
                    {item.price
                      ? `$${(item.price * (item.quantity ?? 1)).toLocaleString(
                          "es-CL"
                        )} CLP`
                      : "—"}
                  </td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <Button variant="secondary" onClick={clearCart}>
              Vaciar carrito
            </Button>
            <h4 className="fw-bold">
              Total: ${cartTotal.toLocaleString("es-CL")} CLP
            </h4>
          </div>

          <div className="text-end mt-3">
            <Button variant="primary" onClick={() => window.location.href = "/checkout"}>
              Proceder al pago 💳
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
