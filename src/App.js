
import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [countriesSearch, setCountriesSearch] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  function fetchData() {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((response) => response.json())
      .then((result) => {
        setCountriesData(result.data)
        setfilteredData(result.data)
      }).catch((error) => {
        console.log("Error", error);

      });
  };
  function filterData() {
    setfilteredData(
      countriesData.filter((item) => {
        console.log("item country", item.country);
        console.log("countriesSearch", countriesSearch);
        if (item.country
          .toUpperCase()
          .split("")
          .includes(countriesSearch.toUpperCase())
        )
          return item;
      })
    );
  }
  useEffect(() => {
    filterData();

  }, [countriesSearch]);
  useEffect(() => {
    console.log("Effect data worked");
    fetchData();
  }, [])
  function handleChange(event) {
    setCountriesSearch(event.target.value)
  }
  return (
    <div className="App">
      <header>
        <div>
          <input onChange={handleChange} placeholder='Search country' />
        </div>
        <div>
          {filteredData.map((country, index) => {
            return <div key={index}>{country.country}</div>;
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
