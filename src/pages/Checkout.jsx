import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, total, addToCart } = useContext(CartContext);

    // If came from Buy Now, use single watch. Otherwise use full cart.
    const buyNowWatch = location.state?.watch || null;
    const qty = buyNowWatch?.qty || 1;
    const orderItems = buyNowWatch ? [{ ...buyNowWatch, qty }] : cart;
    const orderTotal = buyNowWatch ? buyNowWatch.price * qty : total;

    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "", phone: "",
        address: "", city: "", postal: "", country: "",
        cardNumber: "", expiry: "", cvv: "", cardName: ""
    });
    const [step, setStep] = useState(1); // 1 = delivery, 2 = payment
    const [placed, setPlaced] = useState(false);
    const [errors, setErrors] = useState({});

    function handle(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    }

    function validateStep1() {
        const e = {};
        if (!form.firstName) e.firstName = "Required";
        if (!form.lastName) e.lastName = "Required";
        if (!form.email || !form.email.includes("@")) e.email = "Valid email required";
        if (!form.address) e.address = "Required";
        if (!form.city) e.city = "Required";
        if (!form.postal) e.postal = "Required";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function validateStep2() {
        const e = {};
        if (!form.cardName) e.cardName = "Required";
        if (!form.cardNumber || form.cardNumber.length < 16) e.cardNumber = "Valid card required";
        if (!form.expiry) e.expiry = "Required";
        if (!form.cvv || form.cvv.length < 3) e.cvv = "Required";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleNext() {
        if (validateStep1()) setStep(2);
    }

    function handlePlace() {
        if (validateStep2()) {
            const order = {
                id: `CHR-${Math.floor(Math.random() * 90000) + 10000}`,
                date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
                items: orderItems,
                total: orderTotal,
                name: `${form.firstName} ${form.lastName}`,
                address: `${form.address}, ${form.city}, ${form.postal}`,
            };
            const existing = JSON.parse(localStorage.getItem("chronos-orders") || "[]");
            localStorage.setItem("chronos-orders", JSON.stringify([order, ...existing]));
            setPlaced(true);
        }
    }

    if (placed) {
        return (
            <div className="checkout-page">
                <div className="checkout-success">
                    <div className="checkout-success-icon">✓</div>
                    <h2 className="checkout-success-title">Order Confirmed</h2>
                    <p className="checkout-success-sub">
                        Thank you, <strong>{form.firstName}</strong>. Your timepiece is being prepared
                        with the care it deserves. A confirmation has been sent to <strong>{form.email}</strong>.
                    </p>
                    <div className="checkout-success-ref">
                        Order Ref: <span>CHR-{Math.floor(Math.random() * 90000) + 10000}</span>
                    </div>
                    <div className="checkout-success-actions">
                        <button className="btn-primary" onClick={() => navigate("/shop")}>
                            Continue Shopping
                        </button>
                        <button className="view-all-btn" onClick={() => navigate("/")}>
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            {/* HEADER */}
            <div className="checkout-header">
                <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
                <div className="checkout-title-wrap">
                    <h1 className="checkout-title">Secure <em>Checkout</em></h1>
                    <p className="checkout-sub">🔒 SSL Encrypted · Insured Delivery · Authenticated</p>
                </div>
            </div>

            {/* STEP INDICATOR */}
            <div className="checkout-steps">
                <div className={`checkout-step ${step >= 1 ? "active" : ""}`}>
                    <div className="checkout-step-num">1</div>
                    <div className="checkout-step-label">Delivery</div>
                </div>
                <div className="checkout-step-line" />
                <div className={`checkout-step ${step >= 2 ? "active" : ""}`}>
                    <div className="checkout-step-num">2</div>
                    <div className="checkout-step-label">Payment</div>
                </div>
            </div>

            <div className="checkout-grid">

                {/* LEFT — FORM */}
                <div className="checkout-form">

                    {step === 1 && (
                        <>
                            <div className="checkout-section-title">Delivery Information</div>

                            <div className="checkout-row">
                                <div className="checkout-field">
                                    <label>First Name</label>
                                    <input name="firstName" value={form.firstName} onChange={handle} placeholder="James" />
                                    {errors.firstName && <span className="checkout-error">{errors.firstName}</span>}
                                </div>
                                <div className="checkout-field">
                                    <label>Last Name</label>
                                    <input name="lastName" value={form.lastName} onChange={handle} placeholder="Whitfield" />
                                    {errors.lastName && <span className="checkout-error">{errors.lastName}</span>}
                                </div>
                            </div>

                            <div className="checkout-row">
                                <div className="checkout-field">
                                    <label>Email Address</label>
                                    <input name="email" type="email" value={form.email} onChange={handle} placeholder="james@example.com" />
                                    {errors.email && <span className="checkout-error">{errors.email}</span>}
                                </div>
                                <div className="checkout-field">
                                    <label>Phone</label>
                                    <input name="phone" value={form.phone} onChange={handle} placeholder="+1 000 000 0000" />
                                </div>
                            </div>

                            <div className="checkout-field">
                                <label>Street Address</label>
                                <input name="address" value={form.address} onChange={handle} placeholder="123 Luxury Lane" />
                                {errors.address && <span className="checkout-error">{errors.address}</span>}
                            </div>

                            <div className="checkout-row">
                                <div className="checkout-field">
                                    <label>City</label>
                                    <input name="city" value={form.city} onChange={handle} placeholder="London" />
                                    {errors.city && <span className="checkout-error">{errors.city}</span>}
                                </div>
                                <div className="checkout-field">
                                    <label>Postal Code</label>
                                    <input name="postal" value={form.postal} onChange={handle} placeholder="SW1A 1AA" />
                                    {errors.postal && <span className="checkout-error">{errors.postal}</span>}
                                </div>
                            </div>

                            <div className="checkout-field">
                                <label>Country</label>
                                <select name="country" value={form.country} onChange={handle}>
                                    <option value="">Select country</option>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                    <option>India</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                    <option>Japan</option>
                                    <option>Australia</option>
                                    <option>UAE</option>
                                    <option>Singapore</option>
                                    <option>Canada</option>
                                </select>
                            </div>

                            <button className="btn-primary checkout-next-btn" onClick={handleNext}>
                                Continue to Payment →
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="checkout-section-title">Payment Details</div>

                            <div className="checkout-field">
                                <label>Name on Card</label>
                                <input name="cardName" value={form.cardName} onChange={handle} placeholder="James Whitfield" />
                                {errors.cardName && <span className="checkout-error">{errors.cardName}</span>}
                            </div>

                            <div className="checkout-field">
                                <label>Card Number</label>
                                <input
                                    name="cardNumber"
                                    value={form.cardNumber}
                                    onChange={handle}
                                    placeholder="•••• •••• •••• ••••"
                                    maxLength={16}
                                />
                                {errors.cardNumber && <span className="checkout-error">{errors.cardNumber}</span>}
                            </div>

                            <div className="checkout-row">
                                <div className="checkout-field">
                                    <label>Expiry Date</label>
                                    <input name="expiry" value={form.expiry} onChange={handle} placeholder="MM / YY" maxLength={5} />
                                    {errors.expiry && <span className="checkout-error">{errors.expiry}</span>}
                                </div>
                                <div className="checkout-field">
                                    <label>CVV</label>
                                    <input name="cvv" value={form.cvv} onChange={handle} placeholder="•••" maxLength={4} type="password" />
                                    {errors.cvv && <span className="checkout-error">{errors.cvv}</span>}
                                </div>
                            </div>

                            <div className="checkout-card-types">
                                {["VISA", "MC", "AMEX", "UPI"].map((c) => (
                                    <div className="checkout-card-badge" key={c}>{c}</div>
                                ))}
                            </div>

                            <div className="checkout-btn-row">
                                <button className="view-all-btn" onClick={() => setStep(1)}>← Back</button>
                                <button className="btn-primary checkout-next-btn" onClick={handlePlace}>
                                    Place Order →
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* RIGHT — ORDER SUMMARY */}
                <div className="checkout-summary">
                    <div className="checkout-section-title">Order Summary</div>

                    <div className="checkout-items">
                        {orderItems.map((item) => (
                            <div className="checkout-item" key={item.id}>
                                <div className="checkout-item-img">
                                    {item.image
                                        ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        : <span style={{ fontSize: "24px" }}>{item.emoji || "⌚"}</span>
                                    }
                                </div>
                                <div className="checkout-item-info">
                                    <div className="checkout-item-brand">{item.brand}</div>
                                    <div className="checkout-item-name">{item.name}</div>
                                    {item.qty >= 1 && <div className="checkout-item-qty">Qty: {item.qty}</div>}
                                </div>
                                <div className="checkout-item-price">
                                    ${(item.price * (item.qty || 1)).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="checkout-summary-rows">
                        <div className="summary-row">
                            <span>Subtotal ({orderItems.reduce((s, i) => s + (i.qty || 1), 0)} items)</span>
                            <span>${orderTotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Complimentary</span>
                        </div>
                        <div className="summary-row">
                            <span>Insurance</span>
                            <span>Included</span>
                        </div>
                        <div className="summary-row">
                            <span>Authentication</span>
                            <span>Certified</span>
                        </div>
                    </div>

                    <div className="summary-total">
                        <span>Total</span>
                        <span>${orderTotal.toLocaleString()}</span>
                    </div>

                    <div className="checkout-trust">
                        <div className="checkout-trust-item">🔒 Secure Payment</div>
                        <div className="checkout-trust-item">📦 Insured Delivery</div>
                        <div className="checkout-trust-item">✓ Authenticated</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Checkout;
