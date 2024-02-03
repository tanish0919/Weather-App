import Search from "./Components/Search";
import Weather from "./Components/Weather";
import Forecast from "./Components/Forecast";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  // let apiKey = "503649b2c3e06c5b02067d0adfb7331e";
  
  const [location, setLocation] = useState("Delhi");

  return (
    <div className="container">
      <Search setLocation={setLocation}  />
      <Weather location={location} />
      <Forecast location={location} />
    </div>
  );
};

export default App;
