

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.inputDisplay');
const submitBtn = document.querySelector('.submitBtn');
const card = document.querySelector('.card');
const apiKey = "secret";


    displayInitialInfo('ligao');


async function displayInitialInfo(city){

        try{
            const weatherData = await getWeatherData(city);

            displayWeatherInfo(weatherData);

        }
        catch (error){
            console.error(error);
        }

}

weatherForm.addEventListener('submit', async (event) => {

    submitBtn.innerText = 'Submitted!';


    setTimeout(() => {
        submitBtn.innerText = 'Submit';
    }, 1000)
    event.preventDefault();

    const cityName = cityInput.value;

    cityInput.value = '';



    if(cityName){
        try{
            const weatherData = await getWeatherData(cityName);

            displayWeatherInfo(weatherData);

        }
        catch (error){
            console.error(error);
        }


    }else{
        displayError('ENTER A CITY PLEASE');
    }
});



async function getWeatherData(cityName) {
        
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    const response  = await fetch(apiUrl);

    if(!response.ok){
        throw new Error('could not fetch data');
    } 
        return await response.json();
    

}


async function displayWeatherInfo(data){
    const {name: cityName, 
            main: {temp, humidity},     
            weather: [{description, id}]
        } = data;

        const emoji = await getWeatherEmoji(id);
        const tempDisplay = `${(temp - 273.15).toFixed(1)}°C`;
        const humidityDisplay = `Humidity: ${humidity}%`;
        console.log(emoji);

        document.querySelector('.cityName').innerText = cityName;
        document.querySelector('.temp').innerText = tempDisplay;
        document.querySelector('.humidity').innerText = humidityDisplay;
        document.querySelector('.description').innerText = description;
        document.querySelector('.weatherEmoji').innerText = emoji;
        


}

async function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 200):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
             return "🌧";
        case (weatherId >= 600 && weatherId < 700):
             return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default: 
        return '🔥';
    }

}

async function displayError(message){

    const errorDisplay = document.createElement('p');

    errorDisplay.innerText = message;

    errorDisplay.classList.add('errorMessage')

    card.innerText = '';
    card.style.display = 'block';
    card.appendChild(errorDisplay);

    

}
