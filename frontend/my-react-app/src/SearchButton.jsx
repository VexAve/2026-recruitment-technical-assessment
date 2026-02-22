import "./styles/SearchButton.css";

function SearchButton({ name, icon }) {
  return (
    <button className="search-button">
      <img src={icon} alt={name} />
      <span>{name}</span>
    </button>
  );
}

export default SearchButton;
