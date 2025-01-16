import React from 'react'

const LeftSide = (props) => {
  const {weather} = props;
  return (
    <div className='text-black'>
      <div>{weather.date}</div>
      <div className='text-8xl'>{weather.max_c}</div>
      {/* <div>{weather.min_c}</div> */}
      <div>{weather.condition}</div>
    </div>
  )
}

export default LeftSide
