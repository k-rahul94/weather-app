import React, { Component } from 'react';
import './App.css';
import CWeath from './components/current-weather';
import FWeath from './components/forecast-weather';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {lat:'', lng:'', current_data: '', forecast_data: ''};
    this.fetchWeather = this.fetchWeather.bind(this);
    this.setDetails = this.setDetails.bind(this);
  }

  componentDidMount() {
    this.setDetails();
  }

  setDetails() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({lat,lng});
        this.fetchWeather(lat,lng)
      });
    } else {
      console.log("Geo Location not supported by browser");
    }
  }
 

  fetchWeather(lat,lng) {

    let currentRequest = "http://api.wunderground.com/api/b5bcbc142e1efa77/conditions/q/" + lat + ","+ lng + ".json";
    let forecastRequest = "http://api.wunderground.com/api/b5bcbc142e1efa77/hourly/q/" + lat + "," + lng + ".json";
    let myCurrentRequest = new Request(currentRequest);
    let myForecastRequest = new Request(forecastRequest);
    fetch(myCurrentRequest, {method:'get'}).then((resp) => resp.json()).then((current_data) => {
      this.setState({current_data});
    });
    fetch(myForecastRequest, {method:'get'}).then(resp => resp.json()).then(forecast_data => {
      this.setState({forecast_data})
    });
  }
  
  render() {
    return (
      <div className="App">
        <CWeath city={this.state.city} data={this.state.current_data} />
        <FWeath data={this.state.forecast_data} />
      </div>
    );
  }
}

export default App;
