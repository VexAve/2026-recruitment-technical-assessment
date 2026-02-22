import "./styles/Card.css";

function Card({ name, image, numRooms }) {
  return (
    <div className="card" style={{ backgroundImage: `url(${image})` }}>
      <div className="num-rooms">{`${numRooms} rooms available`}</div>
      <div className="name">{name}</div>
    </div>
  );
}

export default Card;
