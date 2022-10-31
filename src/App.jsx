import './App.css'
import { useState } from 'react'
import useWeather from './hooks/useWeather';
import sky from './images/sky.png'
import night from './images/night.png'
import pressure from './images/icon-presión-atmosférica.png'

function App() {

  const { weather } = useWeather();

  const date = new Date();
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString().slice(0, 5);


  const [changeTemp, setChangeTemp] = useState(true);

  const skyVisible = (weather.weather?.[0].icon)?.includes('d');
  const description = (weather.weather?.[0].description)?.charAt(0).toUpperCase() + (weather.weather?.[0].description)?.slice(1);


  return (
    <>
      <img className='background' src={skyVisible ? sky : night} alt="sky" />
      <div className="App">
        <h1>APP del clíma</h1>
        <h2>{weather.name}, {weather.sys?.country}</h2>
        <p><b> Hoy: </b> {day} - {time}</p>
        <h3>"{description}"</h3>
        <div className='box-info'>
          <section className='icon_temperature_button'>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="icon" />
            <h4>
              <span className="material-symbols-outlined"> device_thermostat </span>
              {changeTemp ? Math.round((weather.main?.temp) - 273.15) : Math.round(((weather.main?.temp) - 273.15) * 9 / 5 + 32)} {changeTemp ? '°C' : '°F'}
            </h4>
            <button onClick={() => setChangeTemp(!changeTemp)}>Cambiar a {changeTemp ? '°F' : '°C'}</button>

          </section>

          <section className='info_weather'>
            <p>
              <span className="material-symbols-outlined"> air </span>
              <b>Viento: </b> a {Math.round(weather.wind?.speed * 3.6)} km/h
            </p>
            <p>
              <span className="material-symbols-outlined"> humidity_mid </span>
              <b>Humedad: </b>{weather.main?.humidity} %
            </p>
            <p>
              <span> <img src={pressure}/> </span>
              <b>Presión: </b>{weather.main?.pressure} hPa
            </p>
          </section>
        </div>
      </div>

    </>
  )
}

export default App
