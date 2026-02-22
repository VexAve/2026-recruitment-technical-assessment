import { useEffect, useState } from "react";
import "./styles/Card.css";

function Card({ name, image, numRooms }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  function updateState() {
    setIsSmallScreen(window.innerWidth <= 600);
  }

  useEffect(() => {
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, []);

  return (
    <div className="card" style={{ backgroundImage: `url(${image})` }}>
      {isSmallScreen && <span className="name">{name}</span>}
      <div className="num-rooms">
        <div className="green-circle"></div>
        {isSmallScreen ? `${numRooms} / ${numRooms}` : `${numRooms} rooms available`}
      </div>
      {!isSmallScreen && <div className="name">{name}</div>}
    </div>
  );
}

export default Card;
