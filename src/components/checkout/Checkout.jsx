import { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import MetodoPago from './MetodoPago'

export default function Checkout({ onPayment }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    telefono: ''
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.nombre.trim()) newErrors.nombre = 'Nombre es requerido'
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido'
    if (!formData.direccion.trim()) newErrors.direccion = 'Dirección es requerida'
    if (!formData.telefono.trim()) newErrors.telefono = 'Teléfono es requerido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsProcessing(true)
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false)
      onPayment(formData)
    }, 2000)
  }

  return (
    <Card>
      <Card.Body>
        <h4>Información de Envío</h4>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              isInvalid={!!errors.nombre}
              placeholder="Juan Pérez"
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="juan@ejemplo.com"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              isInvalid={!!errors.telefono}
              placeholder="+56 9 1234 5678"
            />
            <Form.Control.Feedback type="invalid">
              {errors.telefono}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección de Envío</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              isInvalid={!!errors.direccion}
              placeholder="Calle Principal 123, Santiago, Chile"
            />
            <Form.Control.Feedback type="invalid">
              {errors.direccion}
            </Form.Control.Feedback>
          </Form.Group>

          <hr />
          
          <MetodoPago />

          <Alert variant="info" className="small">
            💡 Esta es una simulación. No se procesarán pagos reales.
          </Alert>

          <Button 
            variant="success" 
            type="submit" 
            className="w-100 py-2"
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando pago...' : `Pagar Ahora`}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}