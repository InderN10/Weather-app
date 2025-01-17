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
        <div className='w-[346px] flex-col'>
            <div className='flex items-center'>
                <div className='w-[30px] h-[30px] mx-2'>
                    <img
                        src={"./image/images.png"} />
                </div>
                <div>
                    <input className='w-[300px] h-[60px] rounded-[20px] p-1 shadow-2xl' disabled={loading} onChange={handleChange} placeholder='Search country' value={countriesSearch} />
                </div>
            </div>
            <div className='text-1xl w-[300px] bg-red-200 rounded-3xl'>
                {countriesSearch.length > 0 &&
                    filteredData.map((city, index) => {
                        return <div onClick={() => handleCityClick(city)} key={index}>{city}</div>;
                    })}
            </div>
        </div>
    )
}

export default Search
