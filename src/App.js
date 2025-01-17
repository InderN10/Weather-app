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
        date: result.forecast.forecastday[0].date,
        cityName: result.location.name,
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
        <Background />
        <div className='w-1/2 h-screen bg-white flex flex-col justify-center items-center '>

          <div className='z-50'>
            <div className='absolute top-[100px] left-[41%]'>
              <div className='mx-24 text-red-800'>
                {weatherLoading && <p>weather loading...</p>}
              </div>
              <Search setSelectetCity={setSelectetCity} />
            </div>
          </div>
          <div className='w-[414px] h-[828px] bg-slate-200/30  backdrop-blur-md flex flex-col items-center justify-center z-50 content-around rounded-[50px] shadow-xl'>
            <LeftSide weather={weather} />
          </div>
        </div>
        <div className='w-1/2 h-screen bg-black flex flex-col justify-center items-center '>
          <div className='w-[414px] h-[828px]  bg-blue-950/30  backdrop-blur-md flex flex-col items-center justify-center z-50 content-around rounded-[50px] shadow-xl' >
            <RightSide weather={weather} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
