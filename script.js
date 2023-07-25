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
  