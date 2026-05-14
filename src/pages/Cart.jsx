import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQty, total } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-layout">

        {/* CART ITEMS */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-img">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-item-details">
                <div className="cart-item-brand">{item.brand}</div>
                <div className="cart-item-name">{item.name}</div>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
              </div>

              <div className="cart-item-right">
                <div className="cart-item-price">
                  ${(item.price * item.qty).toLocaleString()}
                </div>
                {/* ✅ Individual Buy Now */}
                <button
                  className="cart-item-buynow"
                  onClick={() => navigate("/checkout", { state: { watch: { ...item, price: item.price, qty: item.qty } } })}
                >
                  Buy Now
                </button>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="cart-summary">
          <div className="summary-title">Order Summary</div>
          <div className="summary-row">
            <span>Items ({cart.reduce((s, i) => s + i.qty, 0)})</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Complimentary</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
          {/* ✅ Checkout all items */}
          <button
            className="btn-primary"
            style={{ width: "100%", marginTop: "1.5rem" }}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Cart;
