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

// add footer
const today = new Date().getFullYear();
const search_footer = document.querySelector(".footer_container");
const mAPIp = "My Open API Project";
const copyright = "Sergei Patrushev";
const p = document.createElement("p");
p.innerHTML = `${mAPIp} &nbsp;&nbsp;&nbsp; ${copyright} © ${today}`;
search_footer.appendChild(p)


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
   
    console.log("currentcity_array", currentcity); // checker object
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
/*
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
*/

// add button condition
function choose_wheather_code(code_weather) {
  document.body.classList.remove("default", "rain", "overcast"); // only 3 now
  switch(code_weather) {
    case 0: // Clear sky
    case 1: // Mainly clear
    case 2: // Partly cloudy
      document.body.classList.add("sky_clean"); // 1
      break;
    case 3: // Overcast
    case 45:
    case 48:
    case 51:
      document.body.classList.add("overcast"); // 2
      break;
    case 53:
    case 55:
    case 56:
    case 57:
      document.body.classList.add("default");
      break;
    
    case 61:
    case 63:
    case 65:
      document.body.classList.add("rain"); // 3
      break;
    
    case 66:
    case 67:
      document.body.classList.add("default");
      break;
    case 71:
    case 73:
    case 75:
      document.body.classList.add("default");
      break;
    case 77:
    case 80:
    case 81:
      document.body.classList.add("default");
      break;
    case 82:
    case 85:
    case 86:
      document.body.classList.add("default");
      break;
    case 95:
    case 96:
    case 99:
      document.body.classList.add("default");
      break;
    default:
      document.body.classList.add("default");
  }
}
search_weather_conditions_button.addEventListener("click", function() {
  choose_wheather_code(currentcity.codeweather);
})