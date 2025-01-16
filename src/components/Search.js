import React from 'react'
import { useEffect, useState } from 'react';
import { citiesFilter } from "../utils/citiesFilter";

const Search = (props) => {
    const { setSelectetCity } = props;
    const [countriesSearch, setCountriesSearch] = useState("");
    const [filteredData, setfilteredData] = useState([]);
    const [cities, setCities] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchData() {
        try {
            setLoading(true);
            const response = await fetch("https://countriesnow.space/api/v0.1/countries");
            const result = await response.json();
            const countriesAndCity = citiesFilter(result.data);
            setCities(countriesAndCity);
            setfilteredData(countriesAndCity);
        } catch (error) {
            console.log("error", error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

    function handleChange(event) {
        setCountriesSearch(event.target.value)
        setfilteredData(
            cities
                .filter((city) =>
                    city.toLowerCase().startsWith(event.target.value.toLowerCase())
                ).slice(0, 5)
        );
    };
    const handleCityClick = (city) => {
        setSelectetCity(city.split(",")[0]);
    }
    return (
        <div>
            <div>
                <input disabled={loading} onChange={handleChange} placeholder='Search country' value={countriesSearch} />
            </div>
            <div>
                {countriesSearch.length > 0 &&
                    filteredData.map((city, index) => {
                        return <div onClick={() => handleCityClick(city)} key={index}>{city}</div>;
                    })}
            </div>
        </div>
    )
}

export default Search
