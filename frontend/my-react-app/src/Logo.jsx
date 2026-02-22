import { useState } from "react";
import "./styles/Logo.css";
import freeroomsDoorClosed from "./assets/freeroomsDoorClosed.png";
import freeRoomsLogo from "./assets/freeRoomsLogo.png";

function Logo() {
  const [isOpen, setIsOpen] = useState(true);

  function onClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div id="logo">
      <img
        src={isOpen ? freeRoomsLogo : freeroomsDoorClosed}
        alt="Freerooms logo"
        onClick={onClick}
      />
    </div>
  );
}

export default Logo;
