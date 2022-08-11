let searchForm = document.querySelector("#form-el");
let temperature = document.getAttribute("temp")


//Handle the input from the User
function handleSearchFormSubmit(event){
    event.preventDefault();

    let searchInput = document.querySelector("#search").value;
    let cityInput = document.querySelector("#city").value;

    if(!searchInput){
        console.error("Please enter a city.")
        return;
    }

    console.log(searchInput)
    console.log(cityInput)
}

searchForm.addEventListener('submit',handleSearchFormSubmit);

