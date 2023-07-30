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
  



var lat = '-22.0';
var lon = '14.0';
var latlon = lat + ';' + lon;
var cinemaContainerEl = $('#cinema-container');
var cinemaHeaderEl = $('#cinema-header');


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

var dataShowtimes = 
console.log(data.cinemas);

function cinemaNearby() {
  cinemaContainerEl.empty();
  cinemaHeaderEl.text("Choose a Cinema near you to view the showtimes :)");
  for (i = 0; i < data.cinemas.length; i++){
      var cinemaDiv = $('<div>').addClass("rounded bg-teal-200 flex justify-center");
      var cinemaUL = $('<ul>').addClass("list-none list-outside");
      cinemaUL.attr("data-cinema-id", data.cinemas[i].cinema_id);
      var cinemaLiName = $('<li>').text(data.cinemas[i].cinema_name);
      var cinemaIcon = $('<img>').attr("src", data.cinemas[i].logo_url);
      var Distance = data.cinemas[i].distance;
      var cinemaDistance = $('<li>').text("Distance from you: " + Distance.toFixed(2) + "km");
      cinemaUL.append(cinemaLiName, cinemaIcon, cinemaDistance);
      cinemaDiv.append(cinemaUL);
      cinemaContainerEl.append(cinemaDiv);
  }};

cinemaNearby();

//this fetch is for getting nearby cimaessssaaassss
// fetch('https://api-gate2.movieglu.com/cinemasNearby/?n=8', {
//   headers: {
//     'api-version': 'v200',
//     'Authorization': Auth,
//     'x-api-key': MovieAPIKey,
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



//this fetch is for showtimes
//   fetch('https://api-gate2.movieglu.com/cinemaShowTimes/?cinema_id=10636&date=2023-07-26', {
//   headers: {
//     'api-version': 'v200',
//     'Authorization': Auth,
//     'x-api-key': MovieAPIKey,
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
//   })
//   .catch(function (error) {
//     console.error('Error fetching MovieGlu films:', error);
//   });

var weatherAPI = "03e23eb4d6e32c18d7d49a0a00b07536"
var lat =  -31.950527 //"userinput from kat" //
var lon =  115.860458 //"userinput from kat" //

function displayCards(lat, lon){
 var queryurl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + weatherAPI;
fetch(queryurl)
    .then(function(response){
        if(response.ok){
            return response.json();
        }else{
            throw response.json();
        }
    }).then(function(data){
        console.log(data)

            var cardContainer = $("#cards");

            var temp1 = data.list[0].main.temp
            var temp2 = data.list[8].main.temp
            var temp3 = data.list[16].main.temp
            var temp4 = data.list[24].main.temp
            var temp5 = data.list[32].main.temp

            var weather1 = data.list[0].weather[0].main
            var weather2 = data.list[8].weather[0].main
            var weather3 = data.list[16].weather[0].main
            var weather4 = data.list[24].weather[0].main
            var weather5 = data.list[32].weather[0].main

            var date1 = dayjs().format('DD/MM') + " (Today)"
            var date2 = dayjs().add(1, 'day').format('DD/MM') + " (" + dayjs().add(1, 'day').format('dddd') + ")"
            var date3 = dayjs().add(2, 'day').format('DD/MM') + " (" + dayjs().add(2, 'day').format('dddd') + ")"
            var date4 = dayjs().add(3, 'day').format('DD/MM') + " (" + dayjs().add(3, 'day').format('dddd') + ")"
            var date5 = dayjs().add(4, 'day').format('DD/MM') + " (" + dayjs().add(4, 'day').format('dddd') + ")"

            var temperatures = []
            temperatures.push(temp1, temp2, temp3, temp4, temp5)
            console.log(temperatures)
            var weathers = []
            weathers.push(weather1, weather2, weather3, weather4, weather5)
            console.log(weathers)
            var dates = []
            dates.push(date1, date2, date3, date4, date5)
            console.log(dates)

             for (let i = 0; i < 5; i++) {
                if((temperatures[i] >= 15) && (weathers[i] == "clear sky" || "few clouds" || "scattered clouds" || "broken clouds")){
                    var sunUrl = "images/sun.png";
                    var cardGood = $("<p>").attr("id", "card" + [i], "data-date", [i]).addClass("border-yellow-400 border-2 font-medium m-5 h-28 w-52 text-neutral-900").css("background-image", "url(" + sunUrl + ")");
                    
                    cardContainer.append(cardGood);
                    }  
                    else {
                        var rainUrl = "images/rain.png"
                        var cardBad = $("<p>").attr("id", "card" + [i]).addClass("border-blue-600 border-2 font-medium m-5 h-28 w-52").css("background-image", "url(" + rainUrl + ")")
                        cardContainer.append(cardBad);

                    }
                    
            }
                    var card0 = document.querySelector("#card0");
                    var date0 = dayjs().format('YYYY-MM-DD')
                    card0.textContent = dates[0];
                    $("#card0").attr("data-date", date0)
                    var card1 = document.querySelector("#card1")
                    var date1 = dayjs().add(1, 'day').format('YYYY-MM-DD')
                    card1.textContent = dates[1]
                    $("#card1").attr("data-date", date1)
                    var card2 = document.querySelector("#card2")
                    var date2 = dayjs().add(2, 'day').format('YYYY-MM-DD')
                    card2.textContent = dates[2]
                    $("#card2").attr("data-date", date2)
                    var card3 = document.querySelector("#card3")
                    var date3 = dayjs().add(3, 'day').format('YYYY-MM-DD')
                    card3.textContent = dates[3]
                    $("#card3").attr("data-date", date3)
                    var card4 = document.querySelector("#card4")
                    var date4 = dayjs().add(4, 'day').format('YYYY-MM-DD')
                    card4.textContent = dates[4]
                    $("#card4").attr("data-date", date4)
                    
                    for (let i = 0; i < 5; i++) {
                        localStorage.setitem("day[i]", dates[i])
                    }
          
                    
        })
    }
    displayCards(lat, lon);

            
            
        // weathers[i] == "clear sky" || "few clouds" || "scattered clouds" || "broken clouds"
            


      


    


