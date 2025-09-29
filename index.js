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

// add div for city
const window_div = document.querySelector(".window");
const create_newdiv_city = document.createElement("div");
create_newdiv_city.className = "window_city"; // class for css
window_div.appendChild(create_newdiv_city);
// add div for temperature
const create_newdiv_temperature = document.createElement("div");
create_newdiv_temperature.className = "window_temperature";
window_div.appendChild(create_newdiv_temperature);

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

function temperature_button_push() { // button go
    
    const city = search_input_form.value.trim(); // use data and cut spaces
    console.log("city", city); // checker
    currentcity.name = city; // goes to arrow
    fetchData(city); // run function
}

const currentcity = {}; // transfer data to another function .name .codeweather

async function fetchData(cityName) {
  try {
    const request = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`);
    /*if (!request.ok) {
        console.log("Status_checker", request.status);
      throw new Error('Request failed');
    }*/
    const transform_data = await request.json(); // get coordinates
    console.log("transform_data_async", transform_data); // checker
    /*
    const lat = transform_data.results[0];
    console.log("lat", lat);
    const long = transform_data.results[0];
    console.log("long", long);
    */
    const {latitude, longitude} = transform_data.results[0]; 
    console.log("latitude", latitude, "longitude", longitude); // checker

    const respond = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const transform_data1 = await respond.json(); // get current temperature
    console.log("transform_data_async1", transform_data1); // checker

    const current_temperature = (transform_data1.current_weather.temperature * 9/5) + 32; // from array
    document.querySelector('.window_city').innerHTML = `${currentcity.name}`; // show city
    document.querySelector('.window_temperature').innerHTML = `${Math.floor(current_temperature)}°F`; // show temp
    // current_weather.weathercode
    const current_weather = transform_data1.current_weather.weathercode; // get code weather
    console.log("current_weather", current_weather); // checker
    currentcity.codeweather = current_weather;
   
    /*
    weather = data;
    weather_latitude(weather);
    weather_longitude(weather);*/

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// add bottom condition
search_input_form.addEventListener("input", function() {
  if (search_input_form.value.trim() !== "") {
    search_weather_conditions_button.style.display = "inline-block";
  } else {
      search_weather_conditions_button.style.display = "none";
    }
});

