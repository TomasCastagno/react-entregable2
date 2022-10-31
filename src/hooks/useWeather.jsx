import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

const useWeather = () => {

  const [weather, setWeather] = useState({});

  useEffect(() => {
    const success = pos => {
      const lat = pos.coords?.latitude;
      const lon = pos.coords?.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=064da6bdebbb3ab327f885b5727033c5&lang=es`)
        .then(res => setWeather(res.data));
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(success, options);


  }, []);

  return { weather }
};

export default useWeather;