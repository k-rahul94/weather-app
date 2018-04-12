import React from 'react';
import './current-weather.css';

const cweath = (props) => {
    if(!props.data.current_observation) {
        return <p>Loading...</p>
    }
    const details = props.data.current_observation;
    const imageUrl = details.icon_url;

    return(
        <div className="jumbotron">
            <img src={imageUrl} />
            <h5>Current Weather</h5>
            <h1>{details.display_location.full}</h1>
            <h1 className="display-4">{details.temperature_string}</h1>
            <h5>Real Feel: {details.feelslike_string}</h5>
            <p className="lead">{details.weather}</p>
            <hr className="my-4"/>
            <p>Relative Humidity: {details.relative_humidity} Wind: {details.wind_gust_mph}mph Visibility: {details.visibility_mi}mi</p>
        </div>
    );
}

export default cweath;