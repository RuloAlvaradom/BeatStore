// components/checkout/ResumenPedido.jsx - VERSIÓN COMPACTA
import { Card, ListGroup } from 'react-bootstrap'

export default function ResumenPedido({ cart, total }) {
  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">📦 Resumen del Pedido</h5>
      </Card.Header>
      
      <ListGroup variant="flush">
        {cart.map(item => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-bold">{item.name}</div>
              <small className="text-muted">
                {item.quantity} x ${item.price.toLocaleString('es-CL')}
              </small>
            </div>
            <span className="fw-bold">
              ${(item.price * item.quantity).toLocaleString('es-CL')}
            </span>
          </ListGroup.Item>
        ))}
        
        <ListGroup.Item className="bg-light">
          <div className="d-flex justify-content-between fw-bold fs-5">
            <span>Total:</span>
            <span>${total.toLocaleString('es-CL')} CLP</span>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}