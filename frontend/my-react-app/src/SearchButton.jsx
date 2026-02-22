import "./styles/SearchButton.css";

function SearchButton({ id, name, icon }) {
  return (
    <button id={id} className="search-button">
      <img src={icon} alt={name} />
      <span>{name}</span>
    </button>
  );
}

export default SearchButton;
