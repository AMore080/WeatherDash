let searchForm = document.querySelector("#form-el");


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

searchForm.addEventListener('submit',handleSearchFormSubmit);

function handleWeatherInformation(cityInput){
    let apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=c6fb8cbc7651b34c42f309d531651a96"

    fetch(apiURL).then(function (response){
        if(response.ok){
            response.json().then(function (data){
                console.log(data)
            })
        }
    })
    displayWeatherBlocks(data)
}