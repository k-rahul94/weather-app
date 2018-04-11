import React, { Component } from 'react';
import './App.css';
import CWeath from './components/current-weather';
import FWeath from './components/forecast-weather';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {city:'Dallas', current_data: '', forecast_data: ''};
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  componentDidMount() {
    this.fetchWeather("Dallas");
  }

  fetchWeather(city) {
    let myCurrentRequest = new Request('http://api.wunderground.com/api/b5bcbc142e1efa77/conditions/q/TX/Dallas.json');
    let myForecastRequest = new Request('http://api.wunderground.com/api/b5bcbc142e1efa77/hourly/q/TX/Dallas.json');
    fetch(myCurrentRequest, {method:'get'}).then((resp) => resp.json()).then((current_data) => {
      this.setState({current_data});
    });
    fetch(myForecastRequest, {method:'get'}).then(resp => resp.json()).then(forecast_data => {
      this.setState({forecast_data})
    });
    
    
  }
  
  render() {
    console.log(this.state.current_data);
    console.log(this.state.forecast_data.hourly_forecast);
    return (
      <div className="App">
        <CWeath city={this.state.city} data={this.state.current_data} />
        <FWeath data={this.state.forecast_data} />
      </div>
    );
  }
}

export default App;
