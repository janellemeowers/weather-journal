/* Global Variables */
const apiKey= 'f53e7e99189ec52d69a8485028cfe930';
//need to update baseURL with zipcode
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//GET request for API data


//Event listener for new entry
  document.getElementById('generate').addEventListener('click', newEntry);

function newEntry(e){
const myZip =  document.getElementById('zip').value;
const myFeelings = document.getElementById('feelings').value;

console.log (newDate);

getWeather(baseURL,myZip, apiKey)
.then(function (data) {

//add data to POST request

postData('http://localhost:3000/weatherData', {temperature: data.main.temp, date: newDate, userResponse: myFeelings })

  //Update UI function
  .then (function() {
    updateUI();
  });



  });

}

const getWeather = async (baseURL, myZip, apiKey) => {
    const response  = await fetch(baseURL + myZip + '&appid=' + apiKey);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
};


//POST request adds weather and user entry to app
const postData = async (url = '', data = {}) => {
    const newResponse = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await newResponse.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
};

//Update UI with user entry

const updateUI = async(url='') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.userResponse;
    } catch(error) {
        console.log('error', error);
    }
};
