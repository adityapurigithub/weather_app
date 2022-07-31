import { useState } from "react";
import "./index.css";

const api = {
  key: "324990aa54cc693d2bcd39bd6534fd00",
  url: "https://api.openweathermap.org/data/2.5",
};
function App() {
  var [text, setText] = useState("");
  var [weather, setWeather] = useState("");

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.url}/weather?q=${text}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setText = "";
          setWeather(data);
          console.log(weather);
        });
    }
  };

  const date = (d) => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var day = days[d.getDay()]; //return a no from 0-6 ....
    var month = months[d.getMonth()];
    var date = d.getDate();
    var year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 18
            ? "app-warm"
            : "app"
          : "app"
      }
    >
      <div className="main">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter City..."
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyPress={search}
          />
        </div>
        {text !== "" ? (
          <div>
            {typeof weather.main !== "undefined" ? (
              <div>
                <div className="location-box">
                  <div className="location">
                    {weather.name},{weather.sys.country}
                  </div>
                  <div className="date">{date(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temprature">
                    {Math.round(weather.main.temp)}*C
                  </div>
                  <div className="weather">
                    {weather.weather[0].main}, ({weather.weather[0].description}
                    )
                  </div>
                  <div className="wind">
                    <b>Wind Speed: </b>
                    {weather.wind.speed} m/s
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", fontSize: "30px" }}>
                >{weather.message}
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: "center", fontSize: "30px" }}>
            Please Enter a City Name and Press Enter...
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
