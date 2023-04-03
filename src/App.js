import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  // const icon = wInfo.weather[0].icon; // For instance "09d"
  const [city, setCity] = useState("guwahati");
  const [url, setUrl] = useState(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=14474ab7540ebef46f04747704e48a70&units=metric"
  );
  const [wind_speed, setWind_speed] = useState();
  const [name, setName] = useState();
  const [a, setA] = useState("");
  const [temp, setTemp] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [humidity, setHumidity] = useState();
  const [loading, setLoading] = useState();
  const [icon, setIcon] = useState("09n");
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [feels_like, setFeels_like] = useState();
  const [iurl, setIurl] = useState(
    "http://openweathermap.org/img/w/" + icon + ".png"
  );

  const [weather, setweather] = useState();
  useEffect(() => {
    setLoading(true);
    let cancel;

    axios
      .get(url, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setFeels_like(res.data.main.feels_like);
        setMax(res.data.main.temp_max);
        setMin(res.data.main.temp_min);

        setTemp(res.data.main.temp);
        setLat(res.data.coord.lat);
        setLon(res.data.coord.lon);
        setHumidity(res.data.main.humidity);
        setIcon(res.data.weather[0].icon);
        setweather(res.data.weather[0].description);
        setName(res.data.name);
        setWind_speed(res.data.wind.speed);
        setIurl(
          "http://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png"
        );
      });
    return () => cancel();
  }, [city]);
  function clickhandler() {
    setCity(a);
    if (a.length > 0) {
      setUrl(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          a +
          "&appid=14474ab7540ebef46f04747704e48a70&units=metric"
      );
    }
  }
  function onchnagehandler(event) {
    setA(event.target.value);
  }
  let now = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [hdurl, setHdurl] = useState();
  const [date, setDate] = useState();
  const [title, setTitle] = useState();
  const [explanation, setExplanation] = useState();
  const url1 =
    "https://api.nasa.gov/planetary/apod?api_key=7gTHL2BCEoVPnQ5W4BKzX7EaGFKzKRBSKfWRr7gu";
  useEffect(() => {
    setLoading(true);
    let cancel;

    axios
      .get(url1, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setHdurl(res.data.hdurl);
        setDate(res.data.date);
        setTitle(res.data.title);
        setExplanation(res.data.explanation);
      });
    return () => cancel();
  }, []);

  if (loading) return "Loading....";
  return (
    <div className="App">
      <div className="header">
        <h2>{now}</h2>
        <input
          type="search"
          placeholder="Search City"
          onChange={onchnagehandler}
        />
        <i onClick={clickhandler}>🔍</i>
      </div>

      {/* <p> temperature is {temp} celcius</p>
      <p>
        latitute is {lat} and longitude is {lon}{" "}
      </p>
      <p>Humidity is {humidity}</p>
      <p>weather_description: - {weather}</p>

      <img src={iurl} alt="img" /> */}
      <di className="middle">
        <p>{name}</p>
        <li>Temperature is {temp} Degree celcius.</li>
        <li>Feels_Like {feels_like}</li>
        <li>
          Min_temp {min} , Max_temp {max}
        </li>
        <li>
          Latitute is {lat} and Longitude is {lon}
        </li>
        <li>Humidity is {humidity}%.</li>
        <li>Weather_description: - {weather}</li>
        <li>Wind_Speed {wind_speed}m/s</li>
        <img src={iurl} alt="Amit" />
        <h3> APOD</h3>
          <h3> {date}</h3>
        <img src={hdurl} alt="imag"  />
        <figcaption>{title}</figcaption>
        <p>{explanation}</p>
      </di>
    </div>
  );
}

export default App;
