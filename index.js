/*
https://open-meteo.com/en/docs?hourly=temperature_2m,weather_code
*/
/*
https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,weather_code
*/


/*
fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,weather_code')
    .then(urlapiweather => {
        console.log("urlapiweather", urlapiweather);
        return urlapiweather.json();
    })
    .then(data => {
        console.log("data", data);
        data_weather = data;
        console.log("data_weather", data_weather);
    })
    .catch(error => {
        console.log("error", error);
        return error;
    })
*/

// 1. Enter city in the form
// 2. Click the "Temperature" button
// 3. Send request to Open-Meteo Geocoding API to get coordinates (latitude and longitude)
// 4. Receive the response and convert it to JSON
// 5. Extract coordinates from JSON
// 6. Send request to Open-Meteo Weather API using the coordinates
// 7. Receive the response and convert it to JSON
// 8. Extract temperature (or other weather data) from JSON
// 9. Show the result on the screen

let search_class_window = document.querySelector('.window');
let search_temperature_button = document.querySelector('.temperature_button');
let search_weather_conditions_button = document.querySelector('.conditions_button');
let search_input_form = document.getElementById('input_form');

function temperature_button_push() {
    
    const city = search_input_form.value.trim();
    console.log("city", city);
    fetchData(city);
}


async function fetchData(cityName) {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`);
    
    /*if (!response.ok) {
        console.log("Status_checker", response.status);
      throw new Error('Request failed');
    }*/
    
    const transform_data = await response.json();
    console.log("data_async", transform_data);

    const lat = data.results[0];
    console.log("lat", lat);
    const long = data.results[0];
    console.log("long", long);
    /*
    weather = data;
    weather_latitude(weather);
    weather_longitude(weather);*/

  } catch (error) {
    console.error('An error occurred:', error);
  }
}
/*
function weather_latitude(data) {
    console.log("weather_latitude", data.latitude);
}
function weather_longitude(data) {
    console.log("weather_longitude", data.longitude);
}

fetchData();*/

