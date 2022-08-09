/* Global Variables */
//API request example => https://api.openweathermap.org/data/2.5/weather?zip=94040&appid=ac5815b64e47eca93a9671631b3f0150
const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "ac5815b64e47eca93a9671631b3f0150";
let btn = document.getElementById('generate');
// zipCode = 94040; //only becouse there is no event listener yet

// Event listener to add function to existing HTML DOM element
btn.addEventListener('click', requestData);

/* Function called by event listener */
function requestData(){
    let zipCode = document.getElementById('zip').value;

    if(zipCode!== ''){
        getWeatherData(API_URL,zipCode,API_KEY);
    }else{
        alert('insert a valid zip code.')
    }
}

/* Function to GET Web API Data*/
async function getWeatherData(baseUrl='',userZipCode='',appid=''){
    let response = await fetch(`${baseUrl}zip=${userZipCode}&appid=${appid}`);
    try{
        let data = await response.json();
        console.log(data);
    }catch(error){
        console.log(error);
    }
}


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();