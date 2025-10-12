import { useNavigate } from "react-router-dom";
import "../styles/CategoryToolsPage.css";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <div style={{textAlign: 'center'}}>
            <button className="back-button" onClick={() => navigate('/')}>
                ← Back to Home
            </button>
        </div>
    );
}
