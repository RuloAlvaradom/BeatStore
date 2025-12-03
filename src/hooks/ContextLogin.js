import { createContext, useContext, useState, useEffect } from 'react';
import { createElement as h } from 'react';

// 1. Contexto
const LoginContext = createContext();

// 2. Hook
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin debe usarse dentro de LoginProvider');
  }
  return context;
};

// 3. Provider
export function LoginProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [cargando, setCargando] = useState(true);

  const cerrarSesion = () => {
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioBeatStore');
    localStorage.removeItem('beatstore_session_time');
    
    // Limpiar estado
    setUsuario(null);
    setAutenticado(false);
    
    // Redirigir a home
    window.location.href = '/';
  };

  // SOLO UN useEffect para verificar sesión
  useEffect(() => {
  const verificarSesion = () => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuarioBeatStore');
    
    if (!token || !usuarioGuardado) {
      setCargando(false);
      return;
    }

    try {
      // Parsear usuario
      const usuarioParsed = JSON.parse(usuarioGuardado);
      
      // Verificar expiración (opcional - el token JWT ya tiene expiración)
      const sessionTime = localStorage.getItem('beatstore_session_time');
      if (sessionTime) {
        const ahora = Date.now();
        const tiempoSesion = ahora - parseInt(sessionTime);
        const maxDuracion = 24 * 60 * 60 * 1000; // 24 horas
        
        if (tiempoSesion > maxDuracion) {
          cerrarSesion();
          return;
        }
      }
      
      // Si el token es JWT, podrías verificar su expiración aquí
      // Pero por ahora confiamos en localStorage
      setUsuario(usuarioParsed);
      setAutenticado(true);
      
    } catch (error) {
      console.error('Error al cargar sesión:', error);
      cerrarSesion();
    } finally {
      setCargando(false);
    }
  };
  
  verificarSesion();
}, []);

  // Función para decodificar token JWT
  const decodificarToken = (token) => {
    try {
      // Los tokens JWT tienen 3 partes separadas por puntos
      const partes = token.split('.');
      if (partes.length !== 3) return null;
      
      // La parte 2 es el payload (datos) en base64
      const payloadBase64 = partes[1];
      const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(payloadJson);
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  };

  const iniciarSesion = async (email, password) => {
    try {
      setCargando(true);
      
      console.log('🔄 Intentando login para:', email);
      
      const res = await fetch('http://100.30.153.63:8080/api/usuarios/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      console.log('📊 Status de respuesta:', res.status);
      
      if (!res.ok) {
        let errorMsg = 'Credenciales incorrectas';
        try {
          const errorData = await res.json();
          errorMsg = errorData.message || errorData.error || errorMsg;
        } catch {
          errorMsg = `Error ${res.status}`;
        }
        throw new Error(errorMsg);
      }
      
      // Tu API devuelve: {token, email, rol}
      const data = await res.json();
      console.log('✅ Respuesta API:', data);
      
      // Validar que vengan los datos mínimos
      if (!data.token || !data.email) {
        throw new Error('El servidor no devolvió token o email');
      }
      
      // Decodificar token JWT para extraer más información
      const tokenPayload = decodificarToken(data.token);
      console.log('🔐 Token decodificado:', tokenPayload);
      
      // Crear objeto usuario COMPLETO
      const usuarioCompleto = {
        id: tokenPayload?.sub || data.email, // Usar email como ID si no hay ID
        email: data.email,
        nombre: tokenPayload?.nombre || email.split('@')[0], // Nombre temporal
        rol: data.rol || 'USER',
        token: data.token
      };
      
      // Guardar en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuarioBeatStore', JSON.stringify(usuarioCompleto));
      localStorage.setItem('beatstore_session_time', Date.now().toString());
      
      // Actualizar estado
      setUsuario(usuarioCompleto);
      setAutenticado(true);
      
      console.log('🎉 Login exitoso, usuario:', usuarioCompleto);
      
      return { 
        exito: true, 
        usuario: usuarioCompleto,
        token: data.token 
      };
      
    } catch (error) {
      console.error('❌ Error en inicio de sesión:', error);
      
      // Mensajes específicos
      let mensajeError = error.message;
      
      if (error.message.includes('Failed to fetch')) {
        mensajeError = 'No se pudo conectar al servidor. Problema de CORS.';
        mensajeError += '\n\nPara desarrollo:';
        mensajeError += '\n1. Instala extensión "Allow CORS" en Chrome';
        mensajeError += '\n2. Actívala para localhost';
        mensajeError += '\n3. Intenta de nuevo';
      }
      
      return { 
        exito: false, 
        error: mensajeError 
      };
    } finally {
      setCargando(false);
    }
  };

  const registrarUsuario = async (datos) => {
    try {
      setCargando(true);
      
      console.log('📝 Registrando usuario...');
      const res = await fetch('http://100.30.153.63:8080/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      
      console.log('📊 Status registro:', res.status);
      
      if (!res.ok) {
        let errorMsg = 'Error en registro';
        try {
          const errorData = await res.json();
          errorMsg = errorData.message || errorData.error || errorMsg;
        } catch {
          errorMsg = `Error ${res.status}`;
        }
        throw new Error(errorMsg);
      }
      
      let usuarioReg;
      try {
        usuarioReg = await res.json();
      } catch {
        usuarioReg = { email: datos.email };
      }
      
      // La API de registro podría devolver token o no
      // Si no devuelve token, el usuario deberá hacer login después
      const token = usuarioReg.token || null;
      
      // Crear usuario completo
      const usuarioCompleto = {
        id: usuarioReg.id || `user-${Date.now()}`,
        email: usuarioReg.email || datos.email,
        nombre: usuarioReg.nombre || usuarioReg.name || datos.nombre || datos.email.split('@')[0],
        rol: usuarioReg.rol || 'USER',
        token: token
      };
      
      // Si hay token, guardar sesión automáticamente
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('usuarioBeatStore', JSON.stringify(usuarioCompleto));
        localStorage.setItem('beatstore_session_time', Date.now().toString());
        
        setUsuario(usuarioCompleto);
        setAutenticado(true);
      }
      
      return { 
        exito: true, 
        usuario: usuarioCompleto,
        token: token,
        mensaje: token ? 'Registro y login exitoso' : 'Registro exitoso. Por favor inicia sesión.'
      };
      
    } catch (error) {
      console.error('❌ Error en registro:', error);
      return { 
        exito: false, 
        error: error.message || 'Error en el registro' 
      };
    } finally {
      setCargando(false);
    }
  };

  const actualizarUsuario = (nuevosDatos) => {
    try {
      const usuarioActualizado = { ...usuario, ...nuevosDatos };
      localStorage.setItem('usuarioBeatStore', JSON.stringify(usuarioActualizado));
      setUsuario(usuarioActualizado);
      return { exito: true, usuario: usuarioActualizado };
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return { exito: false, error: error.message };
    }
  };

  // Verificar expiración de sesión
  const verificarExpiracionSesion = () => {
    const token = localStorage.getItem('token');
    if (!token) return true;
    
    // Verificar expiración JWT primero
    const tokenPayload = decodificarToken(token);
    if (tokenPayload && tokenPayload.exp) {
      const ahora = Math.floor(Date.now() / 1000);
      if (tokenPayload.exp < ahora) {
        cerrarSesion();
        return true;
      }
      return false;
    }
    
    // Si no es JWT, usar timestamp de sesión
    const sessionTime = localStorage.getItem('beatstore_session_time');
    if (!sessionTime) return true;
    
    const ahora = Date.now();
    const tiempoSesion = ahora - parseInt(sessionTime);
    const maxDuracion = 24 * 60 * 60 * 1000; // 24 horas
    
    if (tiempoSesion > maxDuracion) {
      cerrarSesion();
      return true;
    }
    
    return false;
  };

  // Sin JSX - usar createElement
  return h(
    LoginContext.Provider,
    {
      value: {
        usuario,
        autenticado,
        cargando,
        iniciarSesion,
        registrarUsuario,
        cerrarSesion,
        actualizarUsuario,
        verificarExpiracionSesion,
        decodificarToken,
        setUsuario
      }
    },
    children
  );
}