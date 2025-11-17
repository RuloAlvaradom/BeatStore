// Para completar tu CheckoutPage.jsx
import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useCarrito } from '../hooks/useCarrito'
import Checkout from '../components/checkout/Checkout'
import ResumenPedido from '../components/checkout/ResumenPedido'
import Confirmacion from '../components/checkout/Confirmacion'

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCarrito()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderData, setOrderData] = useState(null)

  const handlePayment = (paymentData) => {
    const order = {
      id: Date.now(),
      items: cart,
      total: cartTotal,
      customer: paymentData,
      date: new Date().toLocaleString('es-CL')
    }
    
    setOrderData(order)
    setShowConfirmation(true)
    clearCart()
  }

  if (cart.length === 0 && !showConfirmation) {
    return (
      <Container className="my-5 text-center">
        <h2>Carrito vacío</h2>
        <p>Agrega productos antes de proceder al pago</p>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Finalizar Compra</h2>
      
      <Row>
        <Col md={8}>
          <Checkout onPayment={handlePayment} />
        </Col>
        
        <Col md={4}>
          <ResumenPedido cart={cart} total={cartTotal} />
        </Col>
      </Row>

      <Confirmacion 
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        order={orderData}
      />
    </Container>
  )
}