import { Form } from 'react-bootstrap'

export default function MetodoPago() {
  return (
    <div>
      <h5>Método de Pago</h5>
      
      <Form.Group className="mb-3">
        <Form.Label>Seleccionar Método</Form.Label>
        <Form.Select>
          <option>Tarjeta de Crédito</option>
          <option>Tarjeta de Débito</option>
          <option>Transferencia Bancaria</option>
          <option>Efectivo</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Número de Tarjeta</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="1234 5678 9012 3456" 
          maxLength={16}
        />
      </Form.Group>

      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>Fecha Exp.</Form.Label>
            <Form.Control type="month" />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>CVV</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="123" 
              maxLength={3}
            />
          </Form.Group>
        </div>
      </div>
    </div>
  )
}