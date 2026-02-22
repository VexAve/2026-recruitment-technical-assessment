import "./styles/SearchBar.css";
import search from "./assets/search.svg";

function SearchBar() {
  return (
    <div id="search-bar">
      <img src={search} alt="search" />
      <input type="text" placeholder="Search for a building..." />
    </div>
  );
}

export default SearchBar;
