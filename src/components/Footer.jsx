import { useNavigate } from "react-router-dom";

const footerLinks = {
    Explore: [
        { label: "Shop All", path: "/shop" },
        { label: "New Arrivals", path: "/shop" },
        { label: "Limited Drops", path: "/shop" },
        { label: "Collections", path: "/collections" },
        { label: "Brands", path: "/shop" },
    ],
    Company: [
        { label: "About Us", path: "/about" },
        { label: "Authentication", path: "/about" },
        { label: "Careers", path: "/" },
        { label: "Press", path: "/" },
        { label: "Contact", path: "/" },
    ],
    Support: [
        { label: "FAQ", path: "/" },
        { label: "Shipping & Returns", path: "/" },
        { label: "Warranty", path: "/" },
        { label: "Privacy Policy", path: "/" },
        { label: "Terms of Service", path: "/" },
    ],
};

const socials = [
    { label: "X", href: "#" },
    { label: "in", href: "#" },
    { label: "ig", href: "#" },
    { label: "yt", href: "#" },
];

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="footer">

            {/* TOP */}
            <div className="footer-top">

                {/* Brand col */}
                <div className="footer-brand-col">
                    <div className="footer-logo">CHRONOS</div>
                    <p className="footer-tagline">
                        Curating the world's finest timepieces for those who understand
                        that elegance is timeless.
                    </p>
                    <div className="footer-socials">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                className="footer-social"
                                aria-label={s.label}
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Link cols */}
                {Object.entries(footerLinks).map(([title, links]) => (
                    <div key={title} className="footer-col">
                        <div className="footer-col-title">{title}</div>
                        <div className="footer-links">
                            {links.map((l) => (
                                <span
                                    key={l.label}
                                    className="footer-link"
                                    onClick={() => navigate(l.path)}
                                >
                                    {l.label}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}

            </div>

            {/* BOTTOM */}
            <div className="footer-bottom">
                <div className="footer-copy">
                    © 2026 <span>CHRONOS</span>. All rights reserved.
                </div>
                <div className="footer-certs">
                    {["SSL Secured", "Authenticated", "Insured Delivery"].map((c) => (
                        <div key={c} className="footer-cert-item">{c}</div>
                    ))}
                </div>
            </div>

        </footer>
    );
}

export default Footer;