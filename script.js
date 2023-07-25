//Kat's Script
document.addEventListener("DOMContentLoaded", function () {
    // Modal JavaScript 
    const closeModalBtn = document.querySelector(".modal-close");
    const errorModal = document.querySelector(".modal");
  
    // Function to show the modal
    function showModal() {
      errorModal.classList.remove("hidden");
    }
  
    // Function to hide the modal
    function hideModal() {
      errorModal.classList.add("hidden");
    }
  
    // Close the modal when the close button is clicked
    closeModalBtn.addEventListener("click", hideModal);
  
    // Close the modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
      if (event.target === errorModal) {
        hideModal();
      }
    });
  
    document.getElementById("searchForm").addEventListener("submit", function (event) {
      event.preventDefault();
  
      console.log('form submitted!');
  
      const city = document.getElementById("searchForm").querySelector("input[type='text']").value;
  
      const apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + weatherAPI;
  
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("City not found");
          }
          return response.json();
        })
        .then((data) => {
          // Save weather data to local storage for retrieval later
          localStorage.setItem("weatherData", JSON.stringify(data));
  
          // Process 'data' and update 'weatherDataDiv' accordingly
          console.log(data);
          const weatherDataDiv = document.querySelector(".weather-data");
          weatherDataDiv.innerHTML = " ";
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          showModal(); // Show the modal when an error occurs
        });
    });
  
    // To retrieve the data from local storage
    const savedData = localStorage.getItem("weatherData");
    if (savedData !== null) {
      const data = JSON.parse(savedData);
    }
  });
  


// Alex's script   
  
var URL = "https://api-gate2.movieglu.com/filmsNowShowing/?n=2";
var lat = '-22.0';
var lon = '14.0';
var latlon = lat + ';' + lon;

var data = {
  "cinemas": [
    {
      "cinema_id": 10636,
      "cinema_name": "Cinema 6",
      "address": "Jetty",
      "address2": "address2",
      "city": "city",
      "state": "State",
      "county": "county",
      "postcode": "Zip",
      "lat": -22.680721,
      "lng": 14.519094,
      "distance": 57.55892076987,
      "logo_url": "https://assets.movieglu.com/chain_logos/xx/UK-0-sq.jpg"
    },
    {
      "cinema_id": 42963,
      "cinema_name": "Cinema 7",
      "address": "Welwitschia Plains",
      "address2": "address2",
      "city": "city",
      "state": "State",
      "county": "county",
      "postcode": "Zip",
      "lat": -22.669146,
      "lng": 15.028214,
      "distance": 80.352112347501,
      "logo_url": "https://assets.movieglu.com/chain_logos/xx/UK-0-sq.jpg"
    },
    {
      "cinema_id": 45353,
      "cinema_name": "Cinema 8",
      "address": "Eduard Bohlen",
      "address2": "address2",
      "city": "city",
      "state": "State",
      "county": "county",
      "postcode": "Zip",
      "lat": -23.996033,
      "lng": 14.457391,
      "distance": 140.95552847269,
      "logo_url": "https://assets.movieglu.com/chain_logos/xx/UK-0-sq.jpg"
    },
    {
      "cinema_id": 8845,
      "cinema_name": "Cinema 2",
      "address": "Deadvlei",
      "address2": "address2",
      "city": "city",
      "state": "State",
      "county": "county",
      "postcode": "Zip",
      "lat": -24.759233,
      "lng": 15.292389,
      "distance": 207.52516109344,
      "logo_url": "https://assets.movieglu.com/chain_logos/xx/UK-1-sq.jpg"
    },
    {
      "cinema_id": 9435,
      "cinema_name": "Cinema 5",
      "address": "Sesriem Canyon",
      "address2": "address2",
      "city": "city",
      "state": "State",
      "county": "county",
      "postcode": "Zip",
      "lat": -24.519194,
      "lng": 15.790539,
      "distance": 207.88720228852,
      "logo_url": "https://assets.movieglu.com/chain_logos/xx/UK-1-sq.jpg"
    }
  ],
  "status": {
    "count": 5,
    "state": "OK",
    "method": "cinemasNearby",
    "message": null,
    "request_method": "GET",
    "version": "BOOT_7_XXv200",
    "territory": "XX",
    "device_datetime_sent": "2023-07-24T10:45:30.147Z",
    "device_datetime_used": "2023-07-24 10:45:30"
  }
}

console.log(data.cinemas);



// fetch('https://api-gate2.movieglu.com/cinemasNearby/?n=5', {
//   headers: {
//     'api-version': 'v200',
//     'Authorization': 'Basic Qk9PVF83X1hYOkdGUm9ZV1dETUhrSw==',
//     'x-api-key': '',
//     'device-datetime': '2023-07-24T10:45:30.147Z',
//     'territory': 'XX',
//     'client': 'BOOT_7',
//     'geolocation': latlon,
//   },
// })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     console.log(data.cinemas);
//   })
//   .catch(function (error) {
//     console.error('Error fetching MovieGlu films:', error);
//   });

//   -22.0;14.0
