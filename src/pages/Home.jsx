import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { watches } from "../data/Watches";
import ProductCard from "../components/ProductCard";
import Watch3D from "../components/Watch3D";

const collections = [
    "All Watches",
    "Luxury",
    "Sport",
    "Minimalist",
    "Dive Watches",
    "Dress Watches",
    "Chronograph",
];

const testimonials = [
    {
        id: 1,
        name: "James Whitfield",
        location: "London, UK",
        initials: "JW",
        rating: 5,
        watch: "Patek Philippe Nautilus",
        text: "Flawless from first click to final delivery. The packaging alone felt like an event. My Nautilus arrived in perfect condition — exactly as described. Nothing short of exceptional.",
    },
    {
        id: 2,
        name: "Aiko Tanaka",
        location: "Tokyo, JP",
        initials: "AT",
        rating: 5,
        watch: "Rolex Daytona",
        text: "I've purchased from several luxury watch platforms. This is the only one that genuinely felt personal. The authentication process gave me total confidence, and the piece is breathtaking.",
    },
    {
        id: 3,
        name: "Marco Bellini",
        location: "Milan, IT",
        initials: "MB",
        rating: 5,
        watch: "Audemars Piguet Royal Oak",
        text: "The Royal Oak I found here had been on my list for years. The team helped me track down the exact reference I wanted. Service was patient, knowledgeable, and completely pressure-free.",
    },
];
//Star Rating Part
function StarRating({ count }) {
    return (
        <div className="star-row">
            {Array.from({ length: count }).map((_, i) => (
                <span key={i} className="star">★</span>
            ))}
        </div>
    );
}
//Drop Count Part
function DropCountdown() {
    const TARGET_HOURS = 8;
    const [timeLeft, setTimeLeft] = useState(TARGET_HOURS * 3600 + 24 * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const h = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
    const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
    const s = String(timeLeft % 60).padStart(2, "0");

    return (
        <div className="drop-countdown">
            {[{ val: h, lbl: "Hours" }, { val: m, lbl: "Mins" }, { val: s, lbl: "Secs" }].map((u, i) => (
                <>
                    <div className="drop-unit" key={u.lbl}>
                        <div className="drop-num">{u.val}</div>
                        <div className="drop-lbl">{u.lbl}</div>
                    </div>
                    {i < 2 && <div className="drop-colon">:</div>}
                </>
            ))}
        </div>
    );
}
//Live Clock Part
function LiveClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const h = String(time.getHours()).padStart(2, "0");
    const m = String(time.getMinutes()).padStart(2, "0");
    const s = String(time.getSeconds()).padStart(2, "0");
    const date = time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className="hero-clock">
            <div className="hero-clock-time">{h}:{m}:{s}</div>
            <div className="hero-clock-date">{date}</div>
            <div className="hero-clock-tz">{tz}</div>
        </div>
    );
}
function Home() {
    const [active, setActive] = useState("All Watches");
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [paused, setPaused] = useState(false);
    useEffect(() => {
        if (paused) return;

        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [paused, testimonials.length]);
    const navigate = useNavigate();

    const filtered =
        active === "All Watches"
            ? watches
            : watches.filter((w) => w.collection === active);

    return (
        <div>
            {/* HERO */}
            <div className="hero">
                <div className="hero-bg"></div>
                <div className="hero-pattern"></div>

                <div className="hero-content">
                    <div className="hero-eyebrow">New Collection 2025</div>
                    <h1 className="hero-title">
                        Time is your <br />
                        <em>finest</em> luxury
                    </h1>
                    <p className="hero-sub">
                        Discover timepieces crafted for those who understand that elegance
                        is not about being noticed, but about being remembered.
                    </p>
                    <button className="hero-cta" onClick={() => navigate("/collections")}>
                        Explore Collection →
                    </button>
                    <div className="hero-stats">
                        <div>
                            <div className="stat-num">240+</div>
                            <div className="stat-label">Timepieces</div>
                        </div>
                        <div>
                            <div className="stat-num">38</div>
                            <div className="stat-label">Brands</div>
                        </div>
                        <div>
                            <div className="stat-num">12k+</div>
                            <div className="stat-label">Happy Owners</div>
                        </div>
                        <div className="hero-stats-divider" />
                        <LiveClock />
                    </div>
                </div>

                <div className="hero-watch">
                    <Watch3D />
                </div>
            </div>

            {/* COLLECTION STRIP */}
            <div className="collections-strip">
                <div className="strip-title">Shop by Collection</div>
                <div className="collections-row">
                    {collections.map((c) => (
                        <div
                            key={c}
                            className={`col-chip ${active === c ? "active" : ""}`}
                            onClick={() => setActive(c)}
                        >
                            {c}
                        </div>
                    ))}
                </div>
            </div>

            {/* PRODUCTS */}
            <div className="products-section">
                <div className="section-header">
                    <div className="section-title">Featured Timepieces</div>
                    <button className="view-all-btn" onClick={() => navigate("/shop")}>
                        View All →
                    </button>
                </div>

                {filtered.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">🕰️</div>
                        <div className="empty-state-text">
                            No timepieces found in <strong>{active}</strong>
                        </div>
                        <button className="empty-state-reset" onClick={() => setActive("All Watches")}>
                            View All Watches
                        </button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {filtered.slice(0, 4).map((w) => (
                            <ProductCard key={w.id} watch={w} />
                        ))}
                    </div>
                )}
            </div>

            {/* TESTIMONIALS */}
            <div className="testimonials-section">
                <div className="testimonials-inner">

                    {/* Left col */}
                    <div className="testimonials-left">
                        <div className="strip-title">Client Stories</div>
                        <h2 className="testimonials-heading">
                            Worn by those<br />who <em>know</em>
                        </h2>
                        <p className="testimonials-sub">
                            Every timepiece finds its owner. Here's what a few of ours had to say.
                        </p>

                        <div className="t-dots">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`t-dot ${activeTestimonial === i ? "active" : ""}`}
                                    onClick={() => setActiveTestimonial(i)}
                                    aria-label={`Testimonial ${i + 1}`}
                                />
                            ))}
                        </div>

                        <div className="trust-bar">
                            <div className="trust-item">
                                <span className="trust-num">4.9</span>
                                <span className="trust-label">Average rating</span>
                            </div>
                            <div className="trust-divider" />
                            <div className="trust-item">
                                <span className="trust-num">2,400+</span>
                                <span className="trust-label">Verified reviews</span>
                            </div>
                        </div>
                    </div>

                    {/* Right col */}
                    <div className="testimonials-right">

                        <div
                            className="t-carousel"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                            onTouchStart={() => setPaused(true)}
                            onTouchEnd={() => setPaused(false)}
                        >
                            <div
                                className="t-track"
                                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                            >
                                {testimonials.map((t) => (
                                    <div className="t-slide" key={t.id}>
                                        <div className="t-card t-card--main">
                                            <StarRating count={t.rating} />

                                            <p className="t-quote">
                                                "{t.text}"
                                            </p>

                                            <div className="t-author">
                                                <div className="t-avatar">{t.initials}</div>
                                                <div>
                                                    <div className="t-name">{t.name}</div>
                                                    <div className="t-meta">
                                                        {t.location} · {t.watch}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* BRAND LOGOS STRIP */}
            <div className="brands-section">
                <div className="brands-divider">
                    <div className="brands-line" />
                    <div className="brands-divider-text">Trusted Brands</div>
                    <div className="brands-line" />
                </div>
                <div className="brands-row">
                    {["Rolex", "Patek Philippe", "Omega", "Tag Heuer", "IWC", "Cartier"].map((brand) => (
                        <div className="brand-item" key={brand}>
                            <div className="brand-item-name">{brand}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* WHY CHOOSE US */}
            <div className="why-section">
                <div className="why-inner">
                    <div className="why-header">
                        <div className="strip-title" style={{ textAlign: 'center' }}>Why Chronos</div>
                        <h2 className="why-heading">Crafted for the <em>discerning</em></h2>
                        <p className="why-sub">Every detail considered. Every standard uncompromised.</p>
                    </div>
                    <div className="why-grid">
                        {[
                            { icon: "🔍", title: "Expert Authentication", desc: "Every timepiece is verified by certified horologists before it reaches you." },
                            { icon: "🛡️", title: "2-Year Warranty", desc: "Full coverage on every watch we sell. Your investment is always protected." },
                            { icon: "📦", title: "White Glove Delivery", desc: "Insured, discreet packaging delivered to your door with full tracking." },
                            { icon: "↩️", title: "14-Day Returns", desc: "Not the right fit? Return it hassle-free within 14 days, no questions asked." },
                        ].map((item) => (
                            <div className="why-card" key={item.title}>
                                <div className="why-icon">{item.icon}</div>
                                <div className="why-line" />
                                <div className="why-title">{item.title}</div>
                                <div className="why-desc">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* LIMITED DROP SECTION */}
            <div className="drop-section">
                <div className="drop-inner">

                    {/* Left */}
                    <div className="drop-left">
                        <div className="drop-live">
                            <span className="drop-pulse" />
                            Live Drop
                        </div>
                        <div className="drop-badge">Limited to 12 Pieces</div>
                        <h2 className="drop-heading">
                            The <em>rarest</em> pieces.<br />One chance only.
                        </h2>
                        <p className="drop-desc">
                            Our most exclusive drop yet — hand-selected references that rarely
                            surface. Once they're gone, they're gone for good.
                        </p>

                        {/* Countdown */}
                        <DropCountdown />

                        <div className="drop-actions">
                            <button className="btn-primary" onClick={() => navigate("/shop")}>
                                Shop the Drop →
                            </button>
                            <button className="drop-ghost">Notify Me</button>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="drop-right">
                        {[
                            { brand: "Patek Philippe", name: "Nautilus 5711", price: "$142,000", left: 2, emoji: "⌚" },
                            { brand: "Audemars Piguet", name: "Royal Oak Offshore", price: "$98,500", left: 1, emoji: "🕰️" },
                        ].map((w) => (
                            <div className="drop-card" key={w.name} onClick={() => navigate("/shop")}>
                                <div className="drop-card-emoji">{w.emoji}</div>
                                <div className="drop-card-info">
                                    <div className="drop-card-brand">{w.brand}</div>
                                    <div className="drop-card-name">{w.name}</div>
                                    <div className="drop-card-price">{w.price}</div>
                                    <div className="drop-card-stock">
                                        Only <span>{w.left} left</span> in stock
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;
