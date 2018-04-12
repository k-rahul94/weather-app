import React from 'react';

const fweath = (props) => {
    console.log(props.data);
    if(!props.data.hourly_forecast) {
        return <p>Loading...</p>
    }
    
    const hourly_forecast = props.data.hourly_forecast;
    const forecast_display = hourly_forecast.map(row => {
        let details = row.FCTTIME;
        return (
            <tr key={details.epoch}>
                <th scope="row">{details.civil} {details.weekday_name_abbrev}</th>
                <td>{row.wx} <img src={row.icon_url}/></td>
                <td>{row.temp.english}</td>
                <td>{row.feelslike.english}</td>
                <td>{row.humidity}%</td>
                <td>{row.wdir.dir} {row.wspd.english}mph</td>
            </tr>

        );
    });
    
    return (
        <div>
            <h1>Hourly Forecast</h1>
            <div className="table-responsive-sm">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">TIME</th>
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">TEMP</th>
                        <th scope="col">REAL FEEL</th>
                        <th scope="col">HUMIDITY</th>
                        <th scope="col">WIND</th>
                    </tr>
                </thead>
                <tbody>
                    {forecast_display}
                </tbody>
            </table>
            </div>
        </div>
    );
    
}

export default fweath;