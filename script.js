//Kat's Script
document.addEventListener("DOMContentLoaded", function () {
    // Modal JavaScript 
    const closeModalBtn = document.querySelector(".modalclose");
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
closeModalBtn.addEventListener("click", function () {
  hideModal();
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
        console.log(data);
        if (data.length == 0) {
          showModal();
        }
          // Save weather data to local storage for retrieval later
          localStorage.setItem("weatherData", JSON.stringify(data));
  
          // Process 'data' and update 'weatherDataDiv' accordingly
          console.log(data);
          const weatherDataDiv = document.querySelector(".weather-data");
          weatherDataDiv.innerHTML = " ";
          var lat = data[0].lat;
          var lon = data[0].lon;


          displayCards(lat, lon);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          showModal();
        });
    });
  
    // To retrieve the data from local storage
    const savedData = localStorage.getItem("weatherData");
    if (savedData !== null) {
      const data = JSON.parse(savedData);
    }
    });
  
 // End Search Section   

// Alex's script 
  
function getStoredLatLon(){
  const savedData = localStorage.getItem("weatherData");
  if (savedData !== null) {
    const data = JSON.parse(savedData);
  }
};


var lat = '-22.0';
var lon = '14.0';
var latlon = lat + ';' + lon;
var cinemaContainerEl = $('#cinema-container');
var cinemaHeaderEl = $('#cinema-header');
var filmModal = $('#film-modal')



function printCinemaNearby(data) {
  cinemaContainerEl.empty();
  cinemaHeaderEl.text("Click on a Cinema near you to view the showtimes :)").addClass("text-stone-400");
  for (i = 0; i < data.cinemas.length; i++){
      var cinemaDiv = $('<div>').addClass("card rounded p-3 border-4 border-gray-500 bg-rose-950 cursor-pointer cinemalists font-semibold text-gray-600 flex justify-center");
      var cinemaUL = $('<ul>').addClass("list-none list-outside");
      cinemaUL.attr("data-cinemaid", data.cinemas[i].cinema_id);
      var cinemaLiName = $('<li>').text(data.cinemas[i].cinema_name);
      var cinemaIcon = $('<img>').attr("src", data.cinemas[i].logo_url);
      var Distance = (data.cinemas[i].distance) * 1.609344;
      var cinemaDistance = $('<li>').text("Distance from you: " + Distance.toFixed(2) + "km");
      cinemaUL.append(cinemaLiName, cinemaIcon, cinemaDistance);
      cinemaDiv.append(cinemaUL);
      cinemaContainerEl.append(cinemaDiv);
  }};

//function to display movies + back button.
function printMovies(dataShowtimes) {
  cinemaContainerEl.empty(); 
  console.log(dataShowtimes.films.length);
  for (i = 0; i < dataShowtimes.films.length; i++){
    var movieDiv = $('<div>').addClass("min-h-100 cursor-pointer movielists rounded bg-teal-200 flex justify-center");
    var movieUL = $('<ul>').addClass("list-none list-outside");
    movieUL.attr("data-movielocation", [i]);
    var MovieLiName = $('<li>').text(dataShowtimes.films[i].film_name);
    movieUL.append(MovieLiName);
    if (dataShowtimes.films[i].images.poster.length !== 0){
    var movieIcon = $('<img>').attr("src", dataShowtimes.films[i].images.poster[1].medium.film_image);
    movieUL.append(movieIcon);
    };
    movieDiv.append(movieUL);
    cinemaContainerEl.append(movieDiv);
  }
};


// this fetch is for getting nearby cimaessssaaassss
// this needs to be in the event listener and the listens needs to turn the local storage into latlon variable
function getCinemas(latlon){

fetch('https://api-gate2.movieglu.com/cinemasNearby/?n=8', {
  headers: {
    'api-version': 'v200',
    'Authorization': Auth,
    'x-api-key': MovieAPIKey,
    'device-datetime': '2023-07-27T20:20:30.147Z',
    'territory': 'XX',
    'client': 'BOOT_7',
    'geolocation': latlon,
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {  
      let cinemaStorage = data.cinemas;
      localStorage.setItem("cinemas", JSON.stringify(cinemaStorage));     
      printCinemaNearby(data);
  })
  .catch(function (error) {
    console.error('Error fetching MovieGlu films:', error);
  });
};


//write function to grab movie+showtime data from fetch request.
//this fetch is for showtimes, needs cinema ID + Date + latlon
// passes in an onject for cinema ID + Date + latlon
function getMovies(cinemaDetails){
  fetch('https://api-gate2.movieglu.com/cinemaShowTimes/?cinema_id=' + cinemaDetails.cinemaID + '&date=' + cinemaDetails.date, {
  headers: {
    'api-version': 'v200',
    'Authorization': Auth,
    'x-api-key': MovieAPIKey,
    'device-datetime': '2023-07-24T10:45:30.147Z',
    'territory': 'XX',
    'client': 'BOOT_7',
    'geolocation': cinemaDetails.latlon,
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    let movieStorage = data.films;
    localStorage.setItem("movies", JSON.stringify(movieStorage));
    printMovies(data);
  })
  .catch(function (error) {
    console.error('Error fetching MovieGlu films:', error);
  })};


//things to do:

//write function for displaying showtimes, maybe a modal.


//write event listener to go back to cinemas list.

//write a function to store cinema Data.


document.addEventListener("click", (event) => {
  if (event.target.closest(".cinemalists")){
    let target = event.target.closest(".cinemalists").children;
    let targetID = target[0].dataset.cinemaid;
    var targetDate = "2023-07-29";
    var cinemaDetails = {
      "cinemaID": targetID,
      "date": targetDate,
      "latlon": latlon,
    };
    console.log(targetID);
    getMovies(cinemaDetails);
}
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".movielists")){
    let target = event.target.closest(".movielists").children;
    let targetID = target[0].dataset.movielocation;
    printTimes(targetID);
  }

})

function printTimes(targetID){
  let movieArray = JSON.parse(localStorage.getItem("movies"));
  let target = movieArray[targetID];
  let filmtimesEl = $('#filmtimes');
  let film = $('#film');
  film.text(target.film_name);
  filmtimesEl.empty();
  for (i = 0; i < target.showings.Standard.times.length; i++){
    var listEl = $('<li>').text((target.showings.Standard.times[i].start_time) + " to " +  (target.showings.Standard.times[i].end_time))
    filmtimesEl.append(listEl);
  };
  filmModal.removeClass("hidden");
}


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

            
            
        
            


      


    



$("#go-back").click(function(event) {
  console.log("hello");
  filmModal.addClass("hidden");
});
