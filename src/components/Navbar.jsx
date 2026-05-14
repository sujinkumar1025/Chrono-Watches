import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav>
        <div className="nav-logo">CHRONOS</div>

        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/collections">Collections</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/about">About</NavLink>
          
        </div>

        <div className="nav-right">
          <NavLink to="/cart" className="cart-btn">
            Cart <span className="cart-count">{cart.length}</span>
          </NavLink>

          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* ✅ OUTSIDE NAV */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink>
        <NavLink to="/collections" onClick={() => setMenuOpen(false)}>Collections</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
      </div>
    </>
  );
}

export default Navbar;