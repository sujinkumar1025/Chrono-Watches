import { useState, useMemo } from "react";
import { watches } from "../data/Watches";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const collections = [
  "All",
  "Luxury",
  "Sport",
  "Minimalist",
  "Dive Watches",
  "Dress Watches",
  "Chronograph",
];

const MIN_PRICE = 0;
const MAX_PRICE = 20000;

function Shop() {
  const [active, setActive] = useState("All");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let result = active === "All"
      ? [...watches]
      : watches.filter((w) => w.collection === active);

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.brand.toLowerCase().includes(q) ||
          w.collection.toLowerCase().includes(q)
      );
    }

    // Price filter
    result = result.filter(
      (w) => w.price >= priceRange[0] && w.price <= priceRange[1]
    );

    // Sort
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    else if (sort === "high") result.sort((a, b) => b.price - a.price);
    else if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [active, sort, search, priceRange]);

  const hasActiveFilters =
    active !== "All" ||
    search.trim() !== "" ||
    priceRange[0] !== MIN_PRICE ||
    priceRange[1] !== MAX_PRICE;

  function clearFilters() {
    setActive("All");
    setSearch("");
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setSort("default");
  }

  return (
    <div>
      {/* HERO BANNER */}
      <div className="shop-hero">
        <div className="shop-hero-bg" />
        <div className="shop-hero-pattern" />
        <div className="shop-hero-content">
          <div className="hero-eyebrow">Our Collection</div>
          <h1 className="shop-hero-title">
            Every <em>timepiece</em> tells a story
          </h1>
          <p className="shop-hero-sub">
            Browse {watches.length}+ curated watches from the world's most
            prestigious maisons.
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="shop-search-bar">
        <div className="shop-search-wrap">
          <span className="shop-search-icon">⌕</span>
          <input
            className="shop-search-input"
            type="text"
            placeholder="Search by name, brand or collection..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="shop-search-clear" onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* FILTER STRIP */}
      <div className="collections-strip">
        <div className="strip-title">Filter by Collection</div>
        <div className="collections-row">
          {collections.map((col) => (
            <div
              key={col}
              className={`col-chip ${active === col ? "active" : ""}`}
              onClick={() => setActive(col)}
            >
              {col}
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="products-section">

        {/* TOOLBAR */}
        <div className="shop-toolbar">
          <div className="shop-toolbar-left">
            <div className="section-title">All Timepieces</div>
            <div className="shop-count">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} found
              {hasActiveFilters && (
                <button className="shop-clear-btn" onClick={clearFilters}>
                  Clear filters ✕
                </button>
              )}
            </div>
          </div>

          <div className="shop-toolbar-right">
            {/* Price Range */}
            <div className="shop-price-range">
              <span className="shop-price-label">
                ${priceRange[0].toLocaleString()} — ${priceRange[1].toLocaleString()}
              </span>
              <input
                type="range"
                className="shop-range-slider"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={1000}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
              />
            </div>

            {/* Sort */}
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Sort: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A–Z</option>
            </select>

            {/* View Toggle */}
            <div className="shop-view-toggle">
              <button
                className={`shop-view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid view"
              >
                ⊞
              </button>
              <button
                className={`shop-view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                title="List view"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* ACTIVE FILTER TAGS */}
        {hasActiveFilters && (
          <div className="shop-filter-tags">
            {active !== "All" && (
              <div className="shop-tag">
                {active}
                <button onClick={() => setActive("All")}>✕</button>
              </div>
            )}
            {search.trim() && (
              <div className="shop-tag">
                "{search}"
                <button onClick={() => setSearch("")}>✕</button>
              </div>
            )}
            {priceRange[1] !== MAX_PRICE && (
              <div className="shop-tag">
                Up to ${priceRange[1].toLocaleString()}
                <button onClick={() => setPriceRange([MIN_PRICE, MAX_PRICE])}>✕</button>
              </div>
            )}
          </div>
        )}

        {/* GRID OR LIST */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🕰️</div>
            <div className="empty-state-text">
              No timepieces match your filters
            </div>
            <button className="empty-state-reset" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="products-grid">
            {filtered.map((w) => (
              <ProductCard key={w.id} watch={w} />
            ))}
          </div>
        ) : (
          <div className="shop-list">
            {filtered.map((w) => (
              <div className="shop-list-item" key={w.id} onClick={() => navigate(`/collections/${w.id}`)}>
                <div className="shop-list-img">
                  {w.image
                    ? <img src={w.image} alt={w.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: "28px" }}>{w.emoji || "⌚"}</span>
                  }
                </div>
                <div className="shop-list-info">
                  <div className="product-brand">{w.brand}</div>
                  <div className="product-name">{w.name}</div>
                  <div className="product-ref">{w.ref}</div>
                </div>
                <div className="shop-list-right">
                  <div className="product-price">
                    ${w.price?.toLocaleString()}
                  </div>
                  <div className="shop-list-collection">{w.collection}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
