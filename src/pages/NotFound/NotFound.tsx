import { useNavigate } from "react-router-dom";
import "./not-found.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h2>Nothing here yet</h2>
      <button className="nav-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
