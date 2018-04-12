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
    let locationRequest = "https://ipapi.co/json";
    let myLocationRequest = new Request(locationRequest);
    fetch(myLocationRequest, {method:'get'}).then((resp) => resp.json()).then((location_data) => {
      this.setState({
        lat: location_data.latitude,
        lng: location_data.longitude});
      this.fetchWeather(location_data.latitude, location_data.longitude);
    });
  }


  fetchWeather(lat,lng) {

    let currentRequest = "https://api.wunderground.com/api/b5bcbc142e1efa77/conditions/q/" + lat + ","+ lng + ".json";
    let forecastRequest = "https://api.wunderground.com/api/b5bcbc142e1efa77/hourly/q/" + lat + "," + lng + ".json";
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
