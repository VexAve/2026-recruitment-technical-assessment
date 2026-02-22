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
import Card from "./Card";

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

function App() {
  return (
    <div id="app">
      <h1>Hello</h1>
      {locations.map(({ name, image, numRooms }) => (
        <Card name={name} image={image} numRooms={numRooms} />
      ))}
    </div>
  );
}

export default App;
