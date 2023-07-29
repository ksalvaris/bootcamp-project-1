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
          var lat = data.lat;
          var lon = data.lon;

          printWeatherCrds(lat, lon);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          showModal(); // Show the modal when an error occurs
        });
    });
  
    // To retrieve the data from local storage
    getStoredLatLon();
  });
  
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

// const data = {
//   "cinemas": [
//     {
//       "cinema_id": 10636,
//       "cinema_name": "Cinema 6",
//       "address": "Jetty",
//       "address2": "address2",
//       "city": "city",
//       "state": "State",
//       "county": "county",
//       "postcode": "Zip",
//       "lat": -22.680721,
//       "lng": 14.519094,
//       "distance": 57.55892076987,
//       "logo_url": "https://assets.movieglu.com/chain_logos/xx/UK-0-sq.jpg"
//     },
//     {
//       "cinema_id": 42963,
//       "cinema_name": "Cinema 7",
//       "address": "Welwitschia Plains",
//       "address2": "address2",
//       "city": "city",
//       "state": "State",
//       "county": "county",
//       "postcode": "Zip",
//       "lat": -22.669146,
//       "lng": 15.028214,
//       "distance": 80.352112347501,
//       "logo_url": "https://assets.movieglu.com/chain_logos/xx/UK-0-sq.jpg"
//     },
//     {
//       "cinema_id": 45353,
//       "cinema_name": "Cinema 8",
//       "address": "Eduard Bohlen",
//       "address2": "address2",
//       "city": "city",
//       "state": "State",
//       "county": "county",
//       "postcode": "Zip",
//       "lat": -23.996033,
//       "lng": 14.457391,
//       "distance": 140.95552847269,
//       "logo_url": "https://assets.movieglu.com/chain_logos/xx/UK-0-sq.jpg"
//     },
//     {
//       "cinema_id": 8845,
//       "cinema_name": "Cinema 2",
//       "address": "Deadvlei",
//       "address2": "address2",
//       "city": "city",
//       "state": "State",
//       "county": "county",
//       "postcode": "Zip",
//       "lat": -24.759233,
//       "lng": 15.292389,
//       "distance": 207.52516109344,
//       "logo_url": "https://assets.movieglu.com/chain_logos/xx/UK-1-sq.jpg"
//     },
//     {
//       "cinema_id": 9435,
//       "cinema_name": "Cinema 5",
//       "address": "Sesriem Canyon",
//       "address2": "address2",
//       "city": "city",
//       "state": "State",
//       "county": "county",
//       "postcode": "Zip",
//       "lat": -24.519194,
//       "lng": 15.790539,
//       "distance": 207.88720228852,
//       "logo_url": "https://assets.movieglu.com/chain_logos/xx/UK-1-sq.jpg"
//     }
//   ],
//   "status": {
//     "count": 5,
//     "state": "OK",
//     "method": "cinemasNearby",
//     "message": null,
//     "request_method": "GET",
//     "version": "BOOT_7_XXv200",
//     "territory": "XX",
//     "device_datetime_sent": "2023-07-24T10:45:30.147Z",
//     "device_datetime_used": "2023-07-24 10:45:30"
//   }
// }
// const dataShowtimes = {
//   "cinema": {
//       "cinema_id": 8941,
//       "cinema_name": "Vue Cinemas - Reading"
//   },
//   "films": [
//       {
//           "film_id": 227902,
//           "imdb_id": 3829266,
//           "imdb_title_id": "tt3829266",
//           "film_name": "The Predator",
//           "other_titles": {
//               "EN": "The Predator"
//           },
//           "version_type": "Standard",
//           "age_rating": [
//               {
//                   "rating": "15 ",
//                   "age_rating_image": "https://d2z9fe5yu2p0av.cloudfront.net/age_rating_logos/uk/15.png",
//                   "age_advisory": "strong bloody violence, sex references, language"
//               }
//           ],
//           "film_image": "https://d3ltpb4h29tx4j.cloudfront.net/227902/227902h2.jpg",
//           "film_image_height": 199,
//           "film_image_width": 300,
//           "showings": {
//               "Standard": {
//                   "film_id": 227902,
//                   "film_name": "The Predator",
//                   "times": [
//                       {
//                           "start_time": "14:30",
//                           "end_time": "16:36"
//                       },
//                       {
//                           "start_time": "15:45",
//                           "end_time": "17:51"
//                       },
//                       {
//                           "start_time": "17:05",
//                           "end_time": "19:11"
//                       },
//                       {
//                           "start_time": "18:30",
//                           "end_time": "20:36"
//                       },
//                       {
//                           "start_time": "20:00",
//                           "end_time": "22:06"
//                       },
//                       {
//                           "start_time": "21:10",
//                           "end_time": "23:16"
//                       },
//                       {
//                           "start_time": "22:00",
//                           "end_time": "00:06"
//                       },
//                       {
//                           "start_time": "23:05",
//                           "end_time": "01:11"
//                       }
//                   ]
//               }
//           },
//           "show_dates": [
//               {
//                   "date": "2018-09-14"
//               },
//               {
//                   "date": "2018-09-15"
//               },
//               {
//                   "date": "2018-09-16"
//               },
//               {
//                   "date": "2018-09-17"
//               },
//               {
//                   "date": "2018-09-18"
//               },
//               {
//                   "date": "2018-09-19"
//               },
//               {
//                   "date": "2018-09-20"
//               }
//           ]
//       }
// ],
//   "status": {
//       "count": 13,
//       "state": "OK",
//       "method": "cinemaShowTimes",
//       "message": null,
//       "request_method": "GET",
//       "version": "MGv200",
//       "territory": "UK",
//       "device_datetime_sent": "2018-09-14T14:13:40.375Z",
//       "device_datetime_used": "2018-09-14 14:13:40"
// }
// };



function printCinemaNearby(data) {
  cinemaContainerEl.empty();
  cinemaHeaderEl.text("Choose a Cinema near you to view the showtimes :)");
  for (i = 0; i < data.cinemas.length; i++){
      var cinemaDiv = $('<div>').addClass("cursor-pointer cinemalists rounded bg-teal-200 flex justify-center");
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

  // {
  //   "1": {
  //     "image_orientation": "portrait",
  //     "region": "UK",
  //     "medium": {
  //       "film_image": "https://image.movieglu.com/7772/GBR_007772h0.jpg",
  //       "width": 200,
  //       "height": 300
  //     }
  //   }
  // }

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

getCinemas(latlon);
// printCinemaNearby(data);
// $('#submit').click(function(event){
//   getCinemas(latlon);
// })


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


$("#go-back").click(function(event) {
  console.log("hello");
  filmModal.addClass("hidden");
});
