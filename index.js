/*
https://open-meteo.com/en/docs?hourly=temperature_2m,weather_code
*/
/*
https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,weather_code
*/


fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,weather_code')
    .then(urlapiweather => {
        console.log("urlapiweather", urlapiweather);
        return urlapiweather.json();
    })
    .catch(error => {
        console.log("error", error);
        return error;
    })

    