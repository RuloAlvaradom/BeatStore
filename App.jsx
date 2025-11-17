import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavbarBeatStore from "./components/NavbarBeatStore";
import FooterBeatStore from "./components/FooterBeatStore";
import ToastNotificacion from "./components/ToastNotificacion"; 

// Páginas principales
import Home from "./pages/Home";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";

// Guitarras
import Cuerdas from "./pages/guitarras/Cuerdas";
import GuitarrasAcusticas from "./pages/guitarras/GuitarrasAcusticas";
import GuitarrasElectricas from "./pages/guitarras/GuitarrasElectricas";
import GuitarrasElectroacusticas from "./pages/guitarras/GuitarrasElectroacusticas";

// Bajos
import BajosElectricos from "./pages/bajos/BajosElectricos";
import BajosElectroacusticos from "./pages/bajos/BajosElectroacusticos";
import Mastil from "./pages/bajos/Mastil";

// Percusión
import Baquetas from "./pages/percusion/Baquetas";
import Baterias from "./pages/percusion/Baterias";
import Congas from "./pages/percusion/Congas";
import PercusionMenor from "./pages/percusion/PercusionMenor";

// Teclados y Pianos
import TecladosDigitales from "./pages/teclados/TecladosDigitales";
import PianosElectricos from "./pages/teclados/PianosElectricos";
import PianosAcusticos from "./pages/teclados/PianosAcusticos";

// Audio
import Microfonos from "./pages/sonido/Microfonos";
import Auriculares from "./pages/sonido/Auriculares";
import Monitores from "./pages/sonido/Monitores";

// Coleccionables
import Vinilos from "./pages/coleccionables/Vinilos";
import Posters from "./pages/coleccionables/Posters";
import Merch from "./pages/coleccionables/Merch";

// Productos
import ProductoDetalle from "./pages/productos/ProductoDetalle";

// CheckOut
import CheckoutPage from './pages/CheckoutPage';


export default function App() {
  return (
    <div className="app-container">
      {/* Barra de navegación */}
      <NavbarBeatStore />

      {/* Contenido principal */}
      <main className="flex-grow-1">
        <Routes>
          {/* Páginas principales */}
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* Guitarras */}
          <Route path="/cuerdas" element={<Cuerdas />} />
          <Route path="/guitarras-acusticas" element={<GuitarrasAcusticas />} />
          <Route path="/guitarras-electricas" element={<GuitarrasElectricas />} />
          <Route path="/guitarras-electroacusticas" element={<GuitarrasElectroacusticas />} />

          {/* Bajos */}
          <Route path="/bajos-electricos" element={<BajosElectricos />} />
          <Route path="/bajos-electroacusticos" element={<BajosElectroacusticos />} />
          <Route path="/mastil" element={<Mastil />} />

          {/* Percusión */}
          <Route path="/baquetas" element={<Baquetas />} />
          <Route path="/baterias" element={<Baterias />} />
          <Route path="/congas" element={<Congas />} />
          <Route path="/percusion-menor" element={<PercusionMenor />} />

          {/* Teclados y Pianos */}
          <Route path="/teclados-digitales" element={<TecladosDigitales />} />
          <Route path="/pianos-electricos" element={<PianosElectricos />} />
          <Route path="/pianos-acusticos" element={<PianosAcusticos />} />

          {/* Audio */}
          <Route path="/microfonos" element={<Microfonos />} />
          <Route path="/auriculares" element={<Auriculares />} />
          <Route path="/monitores" element={<Monitores />} />

          {/* Coleccionables */}
          <Route path="/vinilos" element={<Vinilos />} />
          <Route path="/posters" element={<Posters />} />
          <Route path="/merch" element={<Merch />} />

          {/* Página de detalle */}
          <Route path="/producto/:id" element={<ProductoDetalle />} />

          {/* Enrutamiento a pagos */}
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>

      {/* Footer y notificaciones */}
      <ToastNotificacion />
      <FooterBeatStore />
    </div>
  );
}
