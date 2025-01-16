import './App.css';
import Search from './components/Search';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { useState } from "react"
function App() {
  const [selectedCity, setSelectetCity] = useState("Ulaanbaatar");
  const [weatherLoading, setWeatherLoading] = useState(false);
  const getWeather = async () => {
    setWeatherLoading(true);
    try {
      const response = await fetch(

        `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${cityName}`,
        { method: "get", headers: {"Content-type": "application/json"} }
      );
      const result = await response.json();
    } catch (error) {
      console.log("Error", error);

    }
  }
  return (
    <div className="App">
      <Search />
      <LeftSide />
      <RightSide />
    </div>
  );
}

export default App;
