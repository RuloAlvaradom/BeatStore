import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useLogin } from "../hooks/ContextLogin";

export default function Login() {
  const { iniciarSesion, autenticado } = useLogin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);

   useEffect(() => {
    if (autenticado) {
      navigate("/");
    }
  }, [autenticado, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpiar errores
    if (error) setError("");
  };


  const manejarLogin = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    setCargando(true);

    const { email, password } = formData;
    if (!email.trim()) {
      setError("Por favor, ingresa tu correo electrónico.");
      setCargando(false);
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setError("Por favor, ingresa un correo electrónico válido.");
      setCargando(false);
      return;
    }
    
    if (!password) {
      setError("Por favor, ingresa tu contraseña.");
      setCargando(false);
      return;
    }

    try {
      const resultado = await iniciarSesion(email, password);
      
      if (resultado.exito) {
        setExito("¡Inicio de sesión exitoso! Redirigiendo...");
        
        // Obtener página de redirección desde query params (si existe)
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('redirect') || "/";
        
        // Redirigir después de un breve delay para mostrar mensaje
        setTimeout(() => navigate(redirectTo), 1500);
      } else {
        // Errores más específicos según la respuesta
        let mensajeError = resultado.error || "Error en el inicio de sesión";
        
        // Personalizar mensajes comunes
        if (mensajeError.includes('Credenciales incorrectas') || 
            mensajeError.includes('invalid') ||
            mensajeError.toLowerCase().includes('incorrect')) {
          mensajeError = "Correo o contraseña incorrectos. Por favor, verifica tus datos.";
        } else if (mensajeError.includes('network') || mensajeError.includes('conectar')) {
          mensajeError = "Error de conexión. Por favor, verifica tu internet e intenta de nuevo.";
        }
        
        setError(mensajeError);
        
      }
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor. Intenta de nuevo más tarde.");
      
      // Auto-limpiar error después de 5 segundos
      setTimeout(() => setError(""), 5000);
    } finally {
      setCargando(false);
    }
  };
  

  return (
    <Container className="auth-container">
      <div className="auth-form">
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {exito && <Alert variant="success">{exito}</Alert>}

        <Form onSubmit={manejarLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              disabled={cargando}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Tu contraseña"
              value={formData.password}
              onChange={handleChange}
              disabled={cargando}
              required
            />
          </Form.Group>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-100 mt-2"
            disabled={cargando}
          >
            {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </Form>

        <p className="text-center mt-3">
          ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>.
        </p>
      </div>
    </Container>
  );
}