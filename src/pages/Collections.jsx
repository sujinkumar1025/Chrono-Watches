import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { watches } from "../data/Watches";
import { CartContext } from "../context/CartContext";

function Collections() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const prevIdRef = useRef(null);

  const watch = watches.find((w) => w.id === Number(id));

  const allImages = watch
    ? watch.images?.length > 1
      ? watch.images
      : [watch.image, watch.image, watch.image]
    : [];

  useEffect(() => {
    if (prevIdRef.current !== id) {
      setActiveImg(0);
      setQty(1);
      prevIdRef.current = id;
    }
    if (!id) return;
    function handleKey(e) {
      if (e.key === "ArrowLeft") {
        setActiveImg((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveImg((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [allImages.length, id]);

  if (!id) {
    const collections = [...new Set(watches.map((w) => w.collection))];
    return (
      <div>
        <div className="shop-hero">
          <div className="shop-hero-bg" />
          <div className="shop-hero-pattern" />
          <div className="shop-hero-content">
            <div className="hero-eyebrow">Browse</div>
            <h1 className="shop-hero-title">Our <em>Collections</em></h1>
            <p className="shop-hero-sub">
              Explore watches curated by style, purpose, and passion.
            </p>
          </div>
        </div>
        <div className="col-grid-section">
          <div className="col-grid">
            {collections.map((col) => {
              const colWatches = watches.filter((w) => w.collection === col);
              const featured = colWatches[0];
              return (
                <div
                  className="col-grid-card"
                  key={col}
                  onClick={() => navigate(`/collections/${featured.id}`)}
                >
                  <div className="col-grid-img">
                    <img src={featured.image} alt={col} />
                    <div className="col-grid-overlay" />
                  </div>
                  <div className="col-grid-info">
                    <div className="col-grid-name">{col}</div>
                    <div className="col-grid-count">{colWatches.length} Timepieces</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="detail-page">
        <div className="empty-state">
          <div className="empty-state-icon">🕰️</div>
          <div className="empty-state-text">Watch not found</div>
          <button className="empty-state-reset" onClick={() => navigate("/collections")}>
            Back to Collections
          </button>
        </div>
      </div>
    );
  }

  const inCart = cart.some((item) => item.id === watch.id);
  const related = watches
    .filter((w) => w.collection === watch.collection && w.id !== watch.id)
    .slice(0, 3);

  return (
    <div className="detail-page">

      {/* BACK */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* MAIN DETAIL GRID */}
      <div className="detail-grid">

        {/* LEFT — Images */}
        <div>
          <div className="detail-img-wrap">
            <button
              className="detail-arrow detail-arrow--left"
              onClick={() => setActiveImg((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
            >
              ‹
            </button>

            <div className="detail-img-main">
              <img
                src={allImages[activeImg]}
                alt={watch.name}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <div className="detail-img-dots">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    className={`detail-img-dot ${activeImg === i ? "active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  />
                ))}
              </div>
            </div>

            <button
              className="detail-arrow detail-arrow--right"
              onClick={() => setActiveImg((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
            >
              ›
            </button>
          </div>

          <div className="detail-thumbs">
            {allImages.map((img, i) => (
              <div
                key={i}
                className={`thumb ${activeImg === i ? "active" : ""}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Info */}
        <div>
          {watch.badge && (
            <div className="product-badge" style={{ position: "static", display: "inline-block", marginBottom: "1rem" }}>
              {watch.badge}
            </div>
          )}
          <div className="detail-brand">{watch.brand}</div>
          <div className="detail-name">{watch.name}</div>
          <div className="detail-ref">Ref. {watch.ref}</div>
          <div className="detail-price">${watch.price.toLocaleString()}</div>
          <p className="detail-desc">{watch.desc}</p>

          {watch.specs && (
            <div className="specs-grid">
              {Object.entries(watch.specs).map(([key, val]) => (
                <div className="spec-item" key={key}>
                  <div className="spec-label">{key}</div>
                  <div className="spec-val">{val}</div>
                </div>
              ))}
            </div>
          )}

          {/* QTY SELECTOR */}
          <div className="detail-qty">
            <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span className="qty-num">{qty}</span>
            <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          <div className="detail-actions">
            {inCart ? (
              <button className="btn-primary" style={{ background: "#E24B4A" }} onClick={() => removeFromCart(watch.id)}>
                ✕ Remove from Cart
              </button>
            ) : (
              <button className="btn-primary" onClick={() => addToCart({ ...watch, qty })}>
                + Add to Cart
              </button>
            )}
            <button
              className="btn-secondary"
              style={{ padding: "16px 24px", fontSize: "11px", letterSpacing: "2px" }}
              onClick={() => navigate("/checkout", { state: { watch: { ...watch, qty } } })}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* RELATED WATCHES */}
      {related.length > 0 && (
        <div className="related-section">
          <div className="strip-title" style={{ marginBottom: "1.5rem" }}>You May Also Like</div>
          <div className="related-grid">
            {related.map((w) => (
              <div
                className="related-card"
                key={w.id}
                onClick={() => {
                  navigate(`/collections/${w.id}`);
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
              >
                <div className="related-img">
                  <img src={w.image} alt={w.name} />
                </div>
                <div className="related-info">
                  <div className="product-brand">{w.brand}</div>
                  <div className="product-name">{w.name}</div>
                  <div className="product-price">${w.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Collections;
