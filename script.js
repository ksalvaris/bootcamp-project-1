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
            


      


    


