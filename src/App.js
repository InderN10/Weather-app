import './App.css';
import Search from './components/Search';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import Background from './components/Background';
import { useEffect, useState } from "react"
function App() {
  const [selectedCity, setSelectetCity] = useState("Ulaanbaatar");
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weather, setWeather] = useState({})
  const weatherApiKey = "ec1e17438cdd40ef87c22222251501"
  const getWeather = async () => {
    setWeatherLoading(true);
    try {
      const response = await fetch(

        `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${selectedCity}`,
        { method: "get", headers: { "Content-type": "application/json" } }
      );
      const result = await response.json();
      console.log(result);

      const weatherData = {
        max_c: result.forecast.forecastday[0].day.maxtemp_c,
        min_c: result.forecast.forecastday[0].day.mintemp_c,
        condition: result.forecast.forecastday[0].day.condition.text,
        date: result.forecast.forecastday[0].date
      }
      setWeather(weatherData)
    } catch (error) {
      console.log("Error", error);
    } finally {
      setWeatherLoading(false);
    }
  };
  useEffect(() => {
    getWeather()
  }, [selectedCity])
  return (







    <div className="App">
      <div className='w-screen h-screen flex'>
  <Background/>

        <div className='w-1/2 h-screen bg-white flex flex-col justify-center align-center '>
        {weatherLoading && <p>weather loading...</p>}
          <Search setSelectetCity={setSelectetCity} />
          <LeftSide weather={weather} />
        </div>
        <div className='w-1/2 h-screen bg-black'>
          <RightSide weather={weather} />
        </div>

      </div>







    </div>
  );
}

export default App;
