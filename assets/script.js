let searchForm = document.querySelector("#form-el");
let weatherContainer = document.getElementById("#forecast");

fetch 

//Handle the input from the User
function handleSearchFormSubmit(event){
    event.preventDefault();

    let searchInput = document.querySelector("#search").value.trim();
    let cityInput = document.querySelector("#city").value.trim();

    if(!searchInput){
        console.error("Please enter a city.")
        return;
    }

    console.log(searchInput)
    console.log(cityInput)
    handleWeatherInformation(cityInput);
}

//Listens for a submit when the form is completed and then runs handleSearch Function
searchForm.addEventListener('submit',handleSearchFormSubmit);


//Displays the weather Info based on the city input from the form submit
function handleWeatherInformation(cityInput){
    let apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=c6fb8cbc7651b34c42f309d531651a96"

    fetch(apiURL).then(function (response){
        if(response.ok){
            response.json().then(function (data){
                return data
            })
            .then(function (data){
                console.log(data.list);
                displayWeatherBlocks(data.list)
            })
        }
    })
    
}

function displayWeatherBlocks(data){
    for(let i = 0; i < 35; i += 7){
        let weatherBlock = document.getElementById('forecast')
        weatherBlock.classList.add("d-flex", "container", "row", "justify-content-between");

        let dayBlock = document.createElement('ul');
        dayBlock.classList.add("container" ,"col" , "p-3");
        weatherBlock.appendChild(dayBlock);

        let date = document.createElement('li');
        date.textContent = data[i].dt_txt;
        dayBlock.appendChild(date);

        // let icon = document.createElement('li');
        // icon.textContent = "Temperature: " + data[i].main.temp;
        // dayBlock.appendChild(temperature);

        let temperature = document.createElement('li');
        temperature.textContent = "Temperature: " + data[i].main.temp + " F°";
        dayBlock.appendChild(temperature);

        let wind = document.createElement('li');
        wind.textContent = "Wind: " + data[i].wind.speed + " MPH";
        dayBlock.appendChild(wind);

        let humidity = document.createElement('li');
        humidity.textContent = "Temperature: " + data[i].main.temp;
        dayBlock.appendChild(temperature);


    }
}
