/* Global Variables */
//API request example => https://api.openweathermap.org/data/2.5/weather?zip=94040&appid=ac5815b64e47eca93a9671631b3f0150
const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "ac5815b64e47eca93a9671631b3f0150";
let btn = document.getElementById('generate');
let userFeeling = document.getElementById('feelings');
let tempDiv = document.getElementById('temp');
let dateDiv = document.getElementById('date');
let contentDiv = document.getElementById('content');
let zipCode = document.getElementById('zip');
// zipCode = 94040; //only becouse there is no event listener yet

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
btn.addEventListener('click', requestData);

/* Function called by event listener */
function requestData(){
    if(zipCode.value!== ''){
        getWeatherData(API_URL,zipCode.value,API_KEY)
        .then(data=>{
            storeWeatherData('http://127.0.0.1:3000/data',
            {temp: data.main.temp, date: newDate, resp: userFeeling.value });
        })
        .then(()=>getFromServerAndUpdateUI('http://127.0.0.1:3000/data'))
        .catch(error=> alert(error));
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
        return data;
        // storeWeatherData('http://127.0.0.1:3000/data',{temp: data.main.temp, date: newDate, resp: userFeeling.value });
    }catch(error){
        console.log(error);
    }
}

/* Function to POST data */
async function storeWeatherData(url = '',data ={}){

    let response = await fetch(url,{
        method:'POST',
        credentials: 'same-origin',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            resp: data.resp,
        })
    });

    try{
        // let data = await response.json();
        console.log('finished post request');
        // getFromServer();
    }catch(error){
        console.log(error);
    }
}


/* Function to GET Project Data */

// url = 'http://127.0.0.1:3000/data'
async function getFromServerAndUpdateUI(url = ''){
    let response = await fetch(url,{
        method:'GET',
        credentials: 'same-origin',
        headers:{
            'content-type': 'application/json'
        }
    });
    try{
        let data = await response.json();
        console.log(data);
        tempDiv.textContent = 'temp: '+data.temp;
        dateDiv.textContent = 'date: '+data.date;
        contentDiv.textContent = 'content: '+data.response;
    }catch(error){
        console.log(error);
    }
}
