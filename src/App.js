import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [weatherResults, setWeatherResults] = useState([])
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setWeatherResults(prevResults => [...prevResults, response.data])
        console.log(response.data)
      }).catch(error => {
        console.error("Error fetching weather data:", error)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        {weatherResults.map((data, index) => (
          <div key={index} className="weather-card">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main && <h1>{data.main.temp.toFixed()}°F</h1>}
              </div>
              <div className="description">
                {data.weather && <p>{data.weather[0].main}</p>}
              </div>
            </div>

            <div className="bottom">
              <div className="feels">
                {data.main && <p className='bold'>{data.main.feels_like.toFixed()}°F</p>}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main && <p className='bold'>{data.main.humidity}%</p>}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind && <p className='bold'>{data.wind.speed.toFixed()} MPH</p>}
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;