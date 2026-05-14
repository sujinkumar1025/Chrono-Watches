import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext"; // ✅ ADD THIS

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay lets the page render first then scroll
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider> {/* ✅ WRAP HERE */}
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Footer />
      </CartProvider> {/* ✅ CLOSE HERE */}
    </BrowserRouter>
  );
}

export default App;