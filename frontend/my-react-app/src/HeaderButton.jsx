import "./styles/HeaderButton.css";

function HeaderButton({ name, icon, selected }) {
  return (
    <button className={selected ? "header-button selected" : "header-button"}>
      <img src={icon} alt={name} />
    </button>
  );
}

export default HeaderButton;
