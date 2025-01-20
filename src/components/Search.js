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
        setCountriesSearch("")
    }
    return (
        <div className='w-[346px] flex-col'>
            <div className='flex items-center w-[350px] h-[60px] rounded-[20px] p-1 shadow-2xl'>
                <div className='w-[30px] h-[30px] mx-2'>
                    <img
                        src={"./image/images.png"} alt="searchICON" />

                </div>
                <div id='input'>
                    <input id='input' className='w-[300px] h-[60px] rounded-[20px] p-1' disabled={loading} onChange={handleChange} placeholder='Search country' value={countriesSearch} />
                </div>
            </div>
            <div className='text-2xl w-[345px] bg-slate-200/30  backdrop-blur-md bg-black rounded-3xl '>
                <div>
                    {countriesSearch.length > 0 &&
                        filteredData.map((city, index) => {
                            return <div onClick={() => handleCityClick(city)} key={index}>
                                <div className='flex'>
                                    <div className='h-[15px] w-[15px] backdrop-blur-0'>
                                        {<image src={"./image/locMark2.webp"} alt="moderate rain" />}
                                    </div>
                                    {city}
                                </div>
                            </div>;
                        })}
                </div>
            </div>
        </div>
    )
}

export default Search
