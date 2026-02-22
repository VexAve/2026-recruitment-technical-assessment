import "./styles/App.css";
import agsm from "./assets/agsm.webp";
import ainsworth from "./assets/ainsworth.webp";
import anitab from "./assets/anitab.webp";
import biologicalScience from "./assets/biologicalScience.webp";
import biologicalScienceWest from "./assets/biologicalScienceWest.webp";
import blockhouse from "./assets/blockhouse.webp";
import businessSchool from "./assets/businessSchool.webp";
import civilBuilding from "./assets/civilBuilding.webp";
import colombo from "./assets/colombo.webp";
import cseBuilding from "./assets/cseBuilding.webp";
import darkMode from "./assets/darkMode.svg";
import filter from "./assets/filter.svg";
import gridView from "./assets/gridView.svg";
import map from "./assets/map.svg";
import search from "./assets/search.svg";
import sort from "./assets/sort.svg";
import Card from "./Card";
import Logo from "./Logo";
import HeaderButton from "./HeaderButton";
import SearchBar from "./SearchBar";
import SearchButton from "./SearchButton";

const locations = [
  {
    name: "AGSM",
    image: agsm,
    numRooms: 9,
  },
  {
    name: "Ainsworth Building",
    image: ainsworth,
    numRooms: 16,
  },
  {
    name: "Anita B Lawrence Centre",
    image: anitab,
    numRooms: 44,
  },
  {
    name: "Biological Sciences",
    image: biologicalScience,
    numRooms: 6,
  },
  {
    name: "Biological Sciences (West)",
    image: biologicalScienceWest,
    numRooms: 8,
  },
  {
    name: "Blockhouse",
    image: blockhouse,
    numRooms: 42,
  },
  {
    name: "Business School",
    image: businessSchool,
    numRooms: 18,
  },
  {
    name: "Civil Engineering Building",
    image: civilBuilding,
    numRooms: 8,
  },
  {
    name: "Colombo Building",
    image: colombo,
    numRooms: 5,
  },
  {
    name: "Computer Science & Eng (K17)",
    image: cseBuilding,
    numRooms: 7,
  },
];

const headerButtons = [
  {
    name: "Search",
    icon: search,
    selected: false,
  },
  {
    name: "Grid View",
    icon: gridView,
    selected: true,
  },
  {
    name: "Map",
    icon: map,
    selected: false,
  },
  {
    name: "Dark Mode",
    icon: darkMode,
    selected: false,
  },
];

function App() {
  return (
    <div id="app">
      <header>
        <Logo />
        <div id="header-buttons">
          {headerButtons.map(({ name, icon, selected }) => (
            <HeaderButton name={name} icon={icon} selected={selected} />
          ))}
        </div>
      </header>
      <search>
        <SearchButton id="filter-button" name="Filter" icon={filter} />
        <SearchBar />
        <SearchButton id="sort-button" name="Sort" icon={sort} />
      </search>
      <main>
        {locations.map(({ name, image, numRooms }) => (
          <Card name={name} image={image} numRooms={numRooms} />
        ))}
      </main>
    </div>
  );
}

export default App;
