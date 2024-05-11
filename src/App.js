import './App.css';
import React, { useEffect } from 'react';
import Card from "./components/Card";
import Input from "./components/Input";
import Button from "./components/Button";
import { WeatherContext } from './context/Weather';
// import { Api } from './api';

function App() {
  const [data, setData]  = React.useState("");
  const [searchCity, setSearchCity] = React.useState("");
  const fetchWeatherData = async () => {
    try {
      if (searchCity.trim() !== '') {
        const baseUrl = "https://api.weatherapi.com/v1/current.json?key=06f4e1bf307345b390e65518242904"
        const response = await fetch(`${baseUrl}&q=${searchCity}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const datainfo = await response.json();
        setData(datainfo); 
        console.log(data)
      }
    } 
    catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [searchCity]);
  const handleFetchWeather = () => {
    fetchWeatherData(); // Call the function to fetch weather data when the button is clicked
  };
  // async function Api(){
  //       const baseUrl = "https://api.weatherapi.com/v1/current.json?key=06f4e1bf307345b390e65518242904"
  //       console.log("api on");
  //       console.log("City is", searchCity)
  //       const response = await fetch(`${baseUrl}&q=${searchCity}&aqi=no`);
  //       const data= await response.json()
  //       // setData(data)
  //       console.log(data)
  //   }

  return (
    <div className="App">
      <WeatherContext.Provider value={{searchCity, data, setSearchCity, setData}}>
        <Input />
        <Button onClick={handleFetchWeather} value="Search"/>
        <Card/>
        <Button onClick={handleFetchWeather} value="Refresh"/>
      </WeatherContext.Provider>
      <h1>Weather Forecast</h1>
    </div>
  );
}

export default App;
