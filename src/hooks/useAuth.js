import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from './ContextLogin';

export const useAuth = () => {
  const { autenticado, cargando, verificarExpiracionSesion } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Verificar expiración de sesión
    if (verificarExpiracionSesion()) {
      return;
    }

    // Redirigir si no está autenticado y está en una ruta protegida
    const rutasProtegidas = ['/perfil', '/carrito', '/pago', '/mis-pedidos'];
    const rutaActual = location.pathname;

    if (!cargando && rutasProtegidas.some(ruta => rutaActual.startsWith(ruta))) {
      if (!autenticado) {
        navigate(`/login?redirect=${encodeURIComponent(rutaActual)}`);
      }
    }
  }, [autenticado, cargando, location, navigate, verificarExpiracionSesion]);

  return { autenticado, cargando };
};