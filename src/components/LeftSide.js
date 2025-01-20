import React from 'react'

const LeftSide = (props) => {
  const { weather } = props;

  function handleIconChange() {
    if (weather.condition === "Sunny") {
      return <img
        src={"./image/sun.png"}
        alt="sunny"
      />
    } else if (weather.condition === "Moderate rain" || weather.condition === "Patchy rain nearby" || weather.condition === "Heavy rain") {
      return <img
        src={"./image/Rain.png"}
        alt="moderate rain"
      />
    } else if (weather.condition === "Partly Cloudy " || weather.condition === "Cloudy " || weather.condition === "Overcast ") {
      return <img
        src={"./image/Clouds.png"}
        alt="cloudy"
      />
    } else if(weather.condition === 'Light freezing rain'){
      return <img
      src={"./image/Snow.png"}
      alt="snowy"
    />
    }
    else {
      return <img
        src={"./image/sun.png"}
        alt="sunny"
      />
    }

  }
  return (

    <div className='text-black'>
      <div className='flex'>
        <div>
          <div className='text-gray-400 my-2.5'> {""} {weather.date}</div>
          <div className='text-4xl font-extrabold'>{weather.cityName}</div>
        </div>
        <div className='w-[32px] h-[32px] my-6'>


          <img
            src={"./image/locMark.svg"}
            alt='mark'
          />
        </div>
      </div>
      <div className='h-[262px] w-[262px] my-16 mx-9'>
        {handleIconChange()}
      </div>
      <div className='text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#111827] to-[#6B7280] font-extrabold'>{weather.max_c}{"°"}</div>
      <div className='text-purple-400 text-2xl font-extrabold my-6'>{weather.condition}</div>
    </div>
  )
}

export default LeftSide
