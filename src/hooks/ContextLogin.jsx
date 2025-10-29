import { createContext, useContext, useState, useEffect } from "react";

export const ContextLogin = createContext();

export function ContextLoginProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Cargar sesión guardada
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioBeatStore");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Iniciar sesión
  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem("usuarioBeatStore", JSON.stringify(datosUsuario));
  };

  // Cerrar sesión
  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuarioBeatStore");
  };

  // Registrar usuario (simulado)
  const registrarUsuario = (datosUsuario) => {
    iniciarSesion(datosUsuario);
  };

  return (
    <ContextLogin.Provider
      value={{ usuario, iniciarSesion, cerrarSesion, registrarUsuario }}
    >
      {children}
    </ContextLogin.Provider>
  );
}

export function useLogin() {
  return useContext(ContextLogin);
}
