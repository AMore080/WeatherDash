let searchForm = document.querySelector("#form-el");
let weatherHeader = document.querySelector("#weather");
let weatherContainer = document.getElementById("#forecast");
let cityInput = document.querySelector("#city").value.trim();
let citiesHistory = []



function clearHTML(event){
    weatherContainer.remove(event)
}
//Handle the input from the User
function handleSearchFormSubmit(event){
    event.preventDefault();

    let searchInput = document.querySelector("#search").value.trim();
    let cityInput = document.querySelector("#city").value.trim();

    citiesHistory.push(cityInput)

    localStorage.setItem("citiesHistory", citiesHistory)
    console.log(searchInput)
    console.log(cityInput)
    handleSearchHistory(citiesHistory)
    handleWeatherInformation(cityInput);
}

//Listens for a submit when the form is completed and then runs handleSearch Function
searchForm.addEventListener('submit',handleSearchFormSubmit,clearHTML);


//Displays the weather Info based on the city input from the form submit
function handleWeatherInformation(cityInput){
    let apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=c6fb8cbc7651b34c42f309d531651a96"

    fetch(apiURL).then(function (response){
        if(response.ok){
            response.json().then(function (data){
                return data;
            })
            .then(function (data){
                console.log(data.list);
                displayWeatherBlocks(data.list)
            })
        }
    })
    
}

//Will build every part of the 5-day forecast container 
function displayWeatherBlocks(data){



    let city = document.querySelector('[data-city="city"]')
    for(let i = 0; i < citiesHistory.length; i++){
        city.textContent = citiesHistory[i]
    }
    city.append

    // let icon = document.querySelector('[data-icon="icon"]')
    // icon.innerHTML = "<img src=http://openweathermap.org/img/wn/" + data[0].weather[0].icon + "@2x.png />";
    // icon.append

    let temp = document.querySelector('[data-temp="temp"]')
    temp.textContent = "Temperature: " + (data[0].main.temp) + "F°"
    temp.append

    let wind = document.querySelector('[data-wind="wind"]')
    wind.textContent = "Wind: " + (data[0].wind.speed) + "MPH"
    wind.append

    let humidity = document.querySelector('[data-humidity="humidity"]')
    humidity.textContent = "Humidity: " + (data[0].main.humidity) + "%"
    humidity.append

    for(let i = 0; i < 35; i += 7){
        let weatherBlock = document.getElementById('forecast')
        weatherBlock.classList.add("d-flex", "row", "justify-content-around", "position-absolute" , "mt-5" , "ml-3");

        let dayBlock = document.createElement('ul');
        dayBlock.classList.add("container" ,"col" , "p-1", "h-auto", "w-auto", "justify-content-between");
        weatherBlock.append(dayBlock);

        let date = document.createElement('li');
        date.textContent = data[i].dt_txt;
        dayBlock.append(date);

        let icon = document.createElement('p')
        icon.innerHTML = "<img src=http://openweathermap.org/img/wn/" + data[i].weather[0].icon + "@2x.png />";
        dayBlock.append(icon)

        let temperature = document.createElement('li');
        temperature.textContent = "Temperature: " + data[i].main.temp + " F°";
        dayBlock.append(temperature);

        let wind = document.createElement('li');
        wind.textContent = "Wind: " + data[i].wind.speed + " MPH";
        dayBlock.append(wind);

        let humidity = document.createElement('li');
        humidity.textContent = "Humidity: " + data[i].main.humidity + " %";
        dayBlock.append(humidity);

    }
}

function handleSearchHistory(citiesHistory){

        let historyButton = document.getElementById('cityButtons');
        historyButton.classList.add("btn-block", "col");


        let listHistory = document.createElement("button");
        listHistory.classList.add("btn" ,"btn-secondary", "btn-block", "mt-2");
            for(let i = 0; i < citiesHistory.length; i++){
            listHistory.textContent = citiesHistory[i];
            console.log(citiesHistory[i])
            }
        historyButton.appendChild(listHistory)
}
