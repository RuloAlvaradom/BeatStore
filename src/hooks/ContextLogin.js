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
    
    // Opcional: Redirigir a home
    window.location.href = '/';
  };
  useEffect(() => {
    const verificarSesion = async () => {
      const token = localStorage.getItem('token');
      const usuarioGuardado = localStorage.getItem('usuarioBeatStore');
      
      if (!token || !usuarioGuardado) {
        setCargando(false);
        return;
      }

      try {
        // Parsear usuario
        const usuarioParsed = JSON.parse(usuarioGuardado);
        try {
          const res = await fetch('http://100.30.153.63:8080/api/usuarios/login', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (res.ok) {
            // Token válido
            setUsuario(usuarioParsed);
            setAutenticado(true);
            
            // Actualizar timestamp de sesión
            localStorage.setItem('beatstore_session_time', Date.now().toString());
          } else {
            // Token inválido o expirado
            cerrarSesion();
          }
        } catch (error) {
          console.warn('Error verificando token, usando sesión local:', error);
          // Si el endpoint no existe, usar sesión local
          setUsuario(usuarioParsed);
          setAutenticado(true);
        }
      } catch (error) {
        console.error('Error al parsear usuario:', error);
        cerrarSesion();
      } finally {
        setCargando(false);
      }
    };
    verificarSesion();
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuarioBeatStore');
    if (token && usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
        setAutenticado(true);
      } catch {
        cerrarSesion();
      }
    }
    setCargando(false);
  }, []);

   const iniciarSesion = async (email, password) => {
    try {
      setCargando(true);
      
      const res = await fetch('http://100.30.153.63:8080/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Credenciales incorrectas');
      }
      
      const data = await res.json();
      
      // Validar que vengan los datos esperados
      if (!data.token || !data.usuario) {
        throw new Error('Datos de sesión incompletos');
      }
      // Guardar en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuarioBeatStore', JSON.stringify(data.usuario));
      localStorage.setItem('beatstore_session_time', Date.now().toString());
      
      // Actualizar estado
      setUsuario(data.usuario);
      setAutenticado(true);
      
      return { 
        exito: true, 
        usuario: data.usuario,
        token: data.token 
      };
      
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      return { 
        exito: false, 
        error: error.message || 'Error al iniciar sesión' 
      };
    } finally {
      setCargando(false);
    }
  };

  const registrarUsuario = async (datos) => {
    try {
      setCargando(true);
      
      const res = await fetch('http://100.30.153.63:8080/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error en registro');
      }
      
      const usuarioReg = await res.json();
      
      // Si el registro incluye inicio de sesión automático
      if (usuarioReg.token && usuarioReg.usuario) {
        localStorage.setItem('token', usuarioReg.token);
        localStorage.setItem('usuarioBeatStore', JSON.stringify(usuarioReg.usuario));
        localStorage.setItem('beatstore_session_time', Date.now().toString());
        
        setUsuario(usuarioReg.usuario);
        setAutenticado(true);
      }
      
      return { 
        exito: true, 
        usuario: usuarioReg,
        mensaje: 'Registro exitoso' 
      };
      
    } catch (error) {
      console.error('Error en registro:', error);
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
        setUsuario
      }
    },
    children
  );
}