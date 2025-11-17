import { Modal, Button } from 'react-bootstrap'

export default function Confirmacion({ show, onHide, order }) {
  if (!order) return null

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>¡Pago Exitoso! 🎉</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className="text-center mb-4">
          <h4>Gracias por tu compra</h4>
          <p className="lead">Tu pedido <strong>#{order.id}</strong> ha sido procesado exitosamente.</p>
        </div>
        
        <div className="mb-3">
          <h6>Resumen del Pedido:</h6>
          <ul>
            {order.items.map(item => (
              <li key={item.id}><strong>{item.quantity}x</strong> {item.name}</li>
            ))}
          </ul>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <p><strong>Total:</strong> ${order.total.toLocaleString('es-CL')} CLP</p>
            <p><strong>Fecha:</strong> {order.date}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Enviado a:</strong></p>
            <p>{order.customer.nombre}<br />
            {order.customer.direccion}<br />
            {order.customer.telefono}</p>
          </div>
        </div>
        
        <div className="alert alert-success mt-3">
          <strong>Confirmación enviada a:</strong> {order.customer.email}
        </div>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Continuar Comprando
        </Button>
      </Modal.Footer>
    </Modal>
  )
}