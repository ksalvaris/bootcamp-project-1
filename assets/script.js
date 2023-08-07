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

  
document.getElementById("searchButton").addEventListener("click", function (event) {
  event.preventDefault();
  //console log to confirm form submitted
  console.log('form submitted!');
  
  //grabs the city name from the form
  const city = document.getElementById("searchForm").querySelector("input[type='text']").value;
  
  //sets the url used for the fetch command
  const apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + weatherAPI;
  
  //runs the fetch command, to grab the lattitude and longitude from the city typed in the search box
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
        //shows the "city not found" modal if a city isnt found.
        showModal();
      }
      // Save weather data to local storage for retrieval later
      localStorage.setItem("weatherData", JSON.stringify(data));
      //empties out the cinema div incase the user searches again while movies are displayed
      cinemaContainerEl.empty();
      // Process 'data' and update 'weatherDataDiv' accordingly
      const weatherDataDiv = document.querySelector(".weather-data");
      var lat = data[0].lat;
      var lon = data[0].lon;

      //prints the weather cards using the lattitude and longitude from the fetch call
      displayCards(lat, lon);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        showModal();
      });
    });
});


// Alex's script 

//intialisation of variables used in this section
var cinemaContainerEl = $('#cinema-container');
var cinemaHeaderEl = $('#cinema-header');
var filmModal = $('#film-modal');
var cardContainer = $("#cards");

//function to display the cinemas using the data from the fetch to the movieglu API, to 
function printCinemaNearby(data) {
  cinemaContainerEl.empty();
  //changes the header.
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

//function to display movies
function printMovies(dataShowtimes) {
  //empties the div so double ups dont occur.
  cinemaContainerEl.empty(); 
  //a for loop to create the cards+styling that show the movie, and the poster if there is one.
  for (i = 0; i < dataShowtimes.films.length; i++){ 
    var movieDiv = $('<div>').addClass("card rounded p-3 border-4 border-gray-500 bg-rose-950 cursor-pointer movielists font-semibold text-gray-600 flex justify-center");
    var movieUL = $('<ul>').addClass("list-none list-outside");
    movieUL.attr("data-movielocation", [i]);
    var MovieLiName = $('<li>').text(dataShowtimes.films[i].film_name);
    movieUL.append(MovieLiName);
    if (dataShowtimes.films[i].images.poster.length !== 0){
      var movieIcon = $('<img>').attr("src", dataShowtimes.films[i].images.poster[1].medium.film_image);
      movieUL.append(movieIcon);
    };
    //appends everything to the HTML doc.
    movieDiv.append(movieUL);
    cinemaContainerEl.append(movieDiv);
  }
};



// this function uses a latitude and longitude ('lat;lon'), and puts it into a fetch to the movieglu API, to grab the data of cinemas near by those coords.
function getCinemas(latlon){
  fetch('https://api-gate2.movieglu.com/cinemasNearby/?n=8', {
    headers: {
      'api-version': 'v200',
      'Authorization': Auth,
      'x-api-key': MovieAPIKey,
      'device-datetime': '2023-07-30T20:20:30.147Z',
      'territory': 'AU',
      'client': 'UNIV_69',
      'geolocation': latlon,
    },
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {  
    let cinemaStorage = data.cinemas;
    //puts the cinema object from the fetch into local storage.
    localStorage.setItem("cinemas", JSON.stringify(cinemaStorage));   
    //runs the function to show the cards displaying the cinemas nearby.  
    printCinemaNearby(data);
  })
  .catch(function (error) {
    console.error('Error fetching MovieGlu films:', error);
  });
};

// function accepts an object for cinema ID + Date + latlon.
function getMovies(cinemaDetails){
  fetch('https://api-gate2.movieglu.com/cinemaShowTimes/?cinema_id=' + cinemaDetails.cinemaID + '&date=' + cinemaDetails.date, {
  headers: {
    'api-version': 'v200',
    'Authorization': Auth,
    'x-api-key': MovieAPIKey,
    'device-datetime': '2023-07-30T10:45:30.147Z',
    'territory': 'AU',
    'client': 'UNIV_69',
    'geolocation': cinemaDetails.latlon,
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let movieStorage = data.films;
    //stores the movies object from the fetch command into local storage.
    localStorage.setItem("movies", JSON.stringify(movieStorage));
    //runs the command to print the results as cards.
    printMovies(data);
  })
  .catch(function (error) {
    console.error('Error fetching MovieGlu films:', error);
  })};

//this event listner is to listen for a click on the cinema cards, then grabs 
document.addEventListener("click", (event) => {
  if (event.target.closest(".cinemalists")){
    //grabs moviedate from localstorage
    let targetDate = JSON.parse(localStorage.getItem("MovieDate"));
    let target = event.target.closest(".cinemalists").children;
    //grabs the data-cinemaid from the clicked movie div.
    let targetID = target[0].dataset.cinemaid;
    //makes an object to pass into the getMovies function.
    var cinemaDetails = {
      "cinemaID": targetID,
      "date": targetDate,
      "latlon": giveLATLON(),
    };
    //runs the function to that uses cinemaDetails object and fetches from the movieglu API.
    getMovies(cinemaDetails);
}
});

//this event listner is for listening to a click on the movie cards and knowing which card was clicked.
document.addEventListener("click", (event) => {
  if (event.target.closest(".movielists")){
    let target = event.target.closest(".movielists").children;
    let targetID = target[0].dataset.movielocation;
    printTimes(targetID);
  }
});

//function to print the movie showtimes into the film modal, using the target id from the click event listner.
function printTimes(targetID){
  //grabs the movie times from local storage
  let movieArray = JSON.parse(localStorage.getItem("movies"));
  //finds the movie clicked on in the object.
  let target = movieArray[targetID];
  let filmtimesEl = $('#filmtimes');
  let film = $('#film');
  //sets the modal to say the films name
  film.text(target.film_name);
  //empties out the modal incase its been called before
  filmtimesEl.empty();
  //for loop to add the show times to the modal.
  for (i = 0; i < target.showings.Standard.times.length; i++){
    var listEl = $('<li>').text((target.showings.Standard.times[i].start_time) + " to " +  (target.showings.Standard.times[i].end_time))
    filmtimesEl.append(listEl);
  };
  //displays the modal.
  filmModal.removeClass("hidden");
}

function createCards(data){
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

  var temperatures = []
  temperatures.push(temp1, temp2, temp3, temp4, temp5)
  console.log(temperatures)
  var weathers = []
  weathers.push(weather1, weather2, weather3, weather4, weather5)
  console.log(weathers)
  cardContainer.empty();
  for (let i = 0; i < 5; i++) {
      if((temperatures[i] >= 15) && (weathers[i] == "Clear")){
        console.log(weathers[i]);
          var sunUrl = "images/sun.png";
          var cardGood = $("<p>").attr("id", "card" + [i], "data-date", [i]).addClass("weathercards cursor-pointer border-yellow-400 border-2 font-medium m-5 h-28 w-52 text-neutral-900").css("background-image", "url(" + sunUrl + ")");
          cardContainer.append(cardGood);
          }  
          else {
              var rainUrl = "images/rain.png"
              var cardBad = $("<p>").attr("id", "card" + [i]).addClass("weathercards cursor-pointer border-blue-600 border-2 font-medium m-5 h-28 w-52").css("background-image", "url(" + rainUrl + ")")
              cardContainer.append(cardBad);
          }  
  };};

  function cardDates(){
    var date1 = dayjs().format('DD/MM') + " (Today)"
    var date2 = dayjs().add(1, 'day').format('DD/MM') + " (" + dayjs().add(1, 'day').format('dddd') + ")"
    var date3 = dayjs().add(2, 'day').format('DD/MM') + " (" + dayjs().add(2, 'day').format('dddd') + ")"
    var date4 = dayjs().add(3, 'day').format('DD/MM') + " (" + dayjs().add(3, 'day').format('dddd') + ")"
    var date5 = dayjs().add(4, 'day').format('DD/MM') + " (" + dayjs().add(4, 'day').format('dddd') + ")"
    var dates = []
    dates.push(date1, date2, date3, date4, date5)
  
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
  }
  

//this function takes a lattitude and longitude, and runs a fetch command to openweathermap API to grab the 5 day forcast data, then runs createCards and cardDates function.
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
    //function to create the cards and place them on the HMTL doc 
    createCards(data);
    //function to place dates onto the created cards.  
    cardDates();
  })
}

//event listener to listen to clicks on the weathercards,
document.addEventListener("click", (event) => {
  if (event.target.closest(".weathercards")){
    var movieDates = event.target.dataset.date;
    localStorage.setItem("MovieDate", JSON.stringify(movieDates));
    getCinemas(giveLATLON());
  }
});
      

// To retrieve the lattitude and longitude from local storage.
function giveLATLON(){
  const savedData = JSON.parse(localStorage.getItem("weatherData"));
    var lat = savedData[0].lat;
    var lon = savedData[0].lon;
    var latlon = lat + ";" + lon;
    return(latlon);
};

//adds an event lisener for the go back button on the modal that pops up showing show times when selecting a movie. that hides the modal.
$("#go-back").click(function(event) {
  filmModal.addClass("hidden");
});
