import { useNavigate } from "react-router-dom";

function Orders() {
    const navigate = useNavigate();
    const orders = JSON.parse(localStorage.getItem("chronos-orders") || "[]");

    return (
        <div className="orders-page">
            <div className="orders-header">
                <h1 className="checkout-title">My <em>Orders</em></h1>
                <p className="checkout-sub">Your complete order history</p>
            </div>

            {orders.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <div className="empty-state-text">No orders yet</div>
                    <button className="empty-state-reset" onClick={() => navigate("/shop")}>
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div className="order-card" key={order.id}>
                            <div className="order-card-header">
                                <div>
                                    <div className="order-ref">{order.id}</div>
                                    <div className="order-date">{order.date}</div>
                                </div>
                                <div className="order-total">${order.total.toLocaleString()}</div>
                            </div>
                            <div className="order-items">
                                {order.items.map((item) => (
                                    <div className="order-item" key={item.id}>
                                        <div className="order-item-img">
                                            {item.image
                                                ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                : <span>⌚</span>
                                            }
                                        </div>
                                        <div className="order-item-info">
                                            <div className="order-item-brand">{item.brand}</div>
                                            <div className="order-item-name">{item.name}</div>
                                            {item.qty > 1 && <div className="order-item-qty">Qty: {item.qty}</div>}
                                        </div>
                                        <div className="order-item-price">
                                            ${(item.price * (item.qty || 1)).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="order-card-footer">
                                <div className="order-address">📍 {order.address}</div>
                                <div className="order-footer-right">
                                    <div className={`order-status ${order.status === "Cancelled" ? "cancelled" : ""}`}>
                                        {order.status === "Cancelled" ? "✕ Cancelled" : "✓ Confirmed"}
                                    </div>
                                    {order.status !== "Cancelled" && (
                                        <button className="order-cancel-btn" onClick={() => cancelOrder(order.id)}>
                                            Cancel Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
    function cancelOrder(orderId) {
        const existing = JSON.parse(localStorage.getItem("chronos-orders") || "[]");
        const updated = existing.map((o) =>
            o.id === orderId ? { ...o, status: "Cancelled" } : o
        );
        localStorage.setItem("chronos-orders", JSON.stringify(updated));
        window.location.reload();
    }
}

export default Orders;