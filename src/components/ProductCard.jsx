import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


function ProductCard({ watch }) {
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const inCart = cart.some((item) => item.id === watch.id);

  function handleAdd() {
    addToCart(watch);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleRemove() {
    removeFromCart(watch.id);
  }

  return (
    <div className="product-card" onClick={() => navigate(`/collections/${watch.id}`)}>
      <div className="product-img">
        <div className="product-img-inner">
          <img className="product-image" src={watch.image} alt={watch.name} />
          {inCart && <div className="product-in-cart">In Cart</div>}
        </div>
        {watch.badge && <div className="product-badge">{watch.badge}</div>}
      </div>

      <div className="product-info">
        <div className="product-brand">{watch.brand}</div>
        <div className="product-name">{watch.name}</div>
        <div className="product-ref">Ref. {watch.ref}</div>

        <div className="product-footer">
          <div className="product-price">${watch.price.toLocaleString()}</div>

          {inCart ? (
            <button
              onClick={(e) => { e.stopPropagation(); handleRemove(); }}
              className="add-quick remove-quick">
              ✕ Remove
            </button>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); handleAdd(); }}
              className={`add-quick ${added ? "added" : ""}`}
            >
              {added ? "✓ Added" : "+ Cart"}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default ProductCard;