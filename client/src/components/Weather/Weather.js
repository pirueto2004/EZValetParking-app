import React from "react";
import moment from "moment";
import "./Weather.css";
require('dotenv').config();

let moonmoji = require("moonmoji")();

class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    sunrise: undefined,
    sunset: undefined,
    moonImage: undefined
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then(position => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch(err => {
          this.setState({ errorMessage: err.message });
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );

    switch (moonmoji.name) {
      case "New Moon":
        this.setState({
          moonImage:
            "https://upload.wikimedia.org/wikipedia/commons/e/e0/Twemoji_1f311.svg"
        });
        break;
      case "Waxing Crescent":
        this.setState({
          moonImage:
            "https://upload.wikimedia.org/wikipedia/commons/c/c5/Twemoji_1f312.svg"
        });
        break;
      case "First Quarter":
        this.setState({
          moonImage:
            "https://upload.wikimedia.org/wikipedia/commons/4/40/Twemoji_1f313.svg"
        });
        break;
      case "Waxing Gibbous":
        this.setState({
          moonImage:
            "https://upload.wikimedia.org/wikipedia/commons/1/1c/Twemoji_1f314.svg"
        });
        break;
      case "Full Moon":
        this.setState({
          moonImage:
            "https://upload.wikimedia.org/wikipedia/commons/7/78/Twemoji_1f315.svg"
        });
        break;
      case "Waning Gibbous":
        this.setState({
          moonImage:
            "https://upload.wikimedia.org/wikipedia/commons/d/de/Twemoji_1f316.svg"
        });
        break;
      case "Last Quarter":
        this.setState({
          moonImage:
            "https://upload.wikimedia.org/wikipedia/commons/6/67/Twemoji_1f317.svg"
        });
        break;
      case "Waning Crescent":
        this.setState({
          moonImage:
            "https://upload.wikimedia.org/wikipedia/commons/9/96/Twemoji_1f318.svg"
        });
        break;
      default:
        this.setState({ moonImage: undefined });
        break;
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = options => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        "0773cf96a3f9b154957742f3a929e73a"
      }&units=metric`
    );
    const data = await api_call.json();
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      // sunrise: this.getTimeFromUnixTimeStamp(data.sys.sunrise),
      sunrise: moment.unix(data.sys.sunrise).format("hh:mm a"),
      sunset: moment.unix(data.sys.sunset).format("hh:mm a")
      // sunset: this.getTimeFromUnixTimeStamp(data.sys.sunset),
    });
  };

  render() {
    if (this.state.city) {
      return (
        <div className="weather" width={10} height={10}>
          <div>
            {/*<span className="weather-item">{this.state.city}</span>*/}
            <span className="weather-item">
              {this.state.temperatureC} &deg;C
              <span className="slash">/</span>
              <span>{this.state.temperatureF} &deg;F</span>
            </span>
            <span className="weather-item">
              humidity {this.state.humidity}%
            </span>
            <span className="weather-item">{this.state.description}</span>
          </div>
          {/*<br />
          <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} />*/}
          <div>
            <svg className="sun-item" viewBox="0 0 24 24">
              <path
                fill="#BDDDFF"
                d="M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z"
              />
            </svg>
            <span className="weather-item">{this.state.sunrise}</span>
            <svg className="sun-item" viewBox="0 0 24 24">
              <path
                fill="#BDDDFF"
                d="M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,20.71L15.82,17.6C16.21,17.21 16.21,16.57 15.82,16.18C15.43,15.79 14.8,15.79 14.41,16.18L12,18.59L9.59,16.18C9.2,15.79 8.57,15.79 8.18,16.18C7.79,16.57 7.79,17.21 8.18,17.6L11.29,20.71C11.5,20.9 11.74,21 12,21C12.26,21 12.5,20.9 12.71,20.71Z"
              />
            </svg>
            <span className="weather-item">{this.state.sunset}</span>
            {this.state.moonImage ? (
              <img
                style={{
                  height: "1.5rem",
                  marginLeft: "1.5rem",
                  marginRight: "1rem"
                }}
                src={this.state.moonImage}
                alt="moon phase"
              />
            ) : null}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Weather;

// &#8451;
