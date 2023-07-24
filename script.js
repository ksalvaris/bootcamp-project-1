// import {weatherAPI} from './api_key.js';

// console.log(weatherAPI); // Output: "Hello from file1.js!"

// document.getElementById("searchForm").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const city = document.getElementById("cityInput").value;

//     const apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city + '&appid=75f727c580049b6c9fecb8d9f5740286';

//     fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//         const weatherDataDiv = document.querySelector(".weather-data");
//         weatherDataDiv.innerHTML = " ";
//     })
//     .catch((error) => {
//         console.error("Error fetching data:", error);
//     });
// });

var city = 'perth';
const apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city + '&appid=75f727c580049b6c9fecb8d9f5740286';

fetch(apiUrl)
.then((response) => response.json())
.then((data) => {
    console.log(data);
    // const weatherDataDiv = document.querySelector(".weather-data");
    // weatherDataDiv.innerHTML = " ";
})
.catch((error) => {
    console.error("Error fetching data:", error);
});


