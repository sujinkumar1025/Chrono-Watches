import { useNavigate } from "react-router-dom";

function CollectionCard({ collection }) {
    const navigate = useNavigate();

    return (
        <div
            className="collection-card"
            onClick={() =>
                navigate(`/collections/${encodeURIComponent(collection.name)}`)
            }
        >
            <div className="collection-overlay" />

            <div className="collection-content">
                <div className="collection-name">{collection.name}</div>
                <div className="collection-desc">{collection.desc}</div>

                <div className="collection-cta">
                    Explore →
                </div>
            </div>
        </div>
    );
}

export default CollectionCard;