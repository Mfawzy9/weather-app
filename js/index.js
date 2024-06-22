
"use strict"

// cancel form default action (reload)
document.querySelector('form').addEventListener('submit' , function(e){
    e.preventDefault();
});

const header = document.querySelector('header');
const container = document.querySelector('.container');

const mainLocationName = document.getElementById('mainLocationName');
const mainTitleContainer = document.getElementById('mainTitleContainer');
const weatherInformationsContainer = document.getElementById('weatherInformationsContainer');
const searchInput = document.getElementById('searchInput');
const searchSubmit = document.getElementById('searchSubmit');


//hours 1by1 
const timesContainer = document.querySelectorAll('.time');
// day1by1
const daysContainer = document.querySelectorAll('.dayy');

const ApiKey = '945f494778874c67bd6184859242106';

let date = new Date();

const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];


// cards startup animation
const hoursCards = document.querySelectorAll('.time');
const daysCards = document.querySelectorAll('.dayy');
setTimeout(function(){
    for(let h = 0 ; h <hoursCards.length ; h++ ){
        hoursCards[h].classList.remove('to-top')
    };
    for(let k = 0 ; k <daysCards.length ; k++ ){
        daysCards[k].classList.remove('to-left')
    };

    container.classList.remove('scale')
    mainTitleContainer.classList.remove('show');
    weatherInformationsContainer.classList.remove('show');
    document.getElementById('hoursContainer').classList.add('border-top' , 'border-secondary' , 'border-2')
    document.querySelector('.search-days-col').classList.add('border-start' , 'border-secondary' , 'border-2')
} ,3100)

// to get user current location
document.getElementById('currentLocation').addEventListener('click' , function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async function(position){
        const currentLocation = await fetch(`https://api.weatherapi.com/v1/search.json?key=${ApiKey}&&q=${position.coords.latitude},${position.coords.longitude}`);
        const currentLocationData = await currentLocation.json()
        const currentLocationName = `${currentLocationData[0].name} ${currentLocationData[0].country}`;
            mainLocationName.innerHTML = currentLocationName;
            search(currentLocationName);
            backgroundAni();
        },function(denied){
            search();
            setTimeout(function(){
                searchInput.focus();
            },2500)
            
        })
}
})

search();
// to update weather data every 3 min
setInterval(async function(){
    search(mainLocationName.innerHTML)
},180000)

async function search(location = 'alex'){
    mainLocationName.innerHTML = location;
try {

    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${location}&days=6&hour`);

    const data = await response.json()

    if(response.status == "400"){
        document.querySelector('.invalid-location').classList.remove('d-none');
        document.querySelector('.invalid-location').classList.remove('undone');
        document.querySelector('.invalid-location').classList.add('done');
    }else{
        document.querySelector('.invalid-location').classList.add('undone');
        document.querySelector('.invalid-location').classList.remove('done');
        setTimeout(function(){
            document.querySelector('.invalid-location').classList.add('d-none');
        } ,400)

        mainChanges(data);

        // today hours part
        hoursForecast(data);
    
        // next 5 days part
        daysForecast(data);
        
        // background change
        mainBackgroundChanger(data);
        backgroundAni();
    }


} catch (error) {
    header.classList.add('d-none')
    alert('Error Occured');
}

};

searchSubmit.addEventListener('click' , async function(){
    await search(searchInput.value);
    mainLocationName.innerHTML = searchInput.value
});

searchSubmit.disabled = true;
searchInput.addEventListener('input' , function(){
    if(searchInput.value == ''){
        document.querySelector('.invalid-location').classList.add('undone');
        document.querySelector('.invalid-location').classList.remove('done');
        setTimeout(function(){
            document.querySelector('.invalid-location').classList.add('d-none');
        } ,400)
    }

    if(searchInput.value.length > 0){
        searchSubmit.disabled = false;
    }else{
        searchSubmit.disabled = true;
    }
})

function backgroundAni(){
    header.classList.add('hopa-top')
    container.classList.add('hopa-top')
    setTimeout(function(){
        header.classList.remove('hopa-top')
        container.classList.remove('hopa-top')
    },500)
}

function mainBackgroundChanger(data){

    if(data.current.condition.text == "Clear" && data.current.condition.icon.includes('night') ){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear.jpg);`;
    }
    else if(data.current.condition.text == "Overcast" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy.jpg);`;
    }
    else if(data.current.condition.text == "Partly cloudy" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy2.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy2.jpg);`;
    }
    else if(data.current.condition.text == "Partly Cloudy" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy2.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy2.jpg);`;
    }
    else if(data.current.condition.text == "Patchy rain nearby" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.current.condition.text == "Moderate rain" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.current.condition.text == "Cloudy" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy.jpg);`;
    }
    else if(data.current.condition.text == "Light rain" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.current.condition.text == "Light rain shower" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.current.condition.text == "Mist" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-mist.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-mist.jpg);`;
    }
    else if(data.current.condition.text == "Sunny" && data.current.condition.icon.includes('day') ){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/sunny-clear.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/sunny-clear.jpg);`;
    }
    else if(data.current.condition.text == "Overcast" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.current.condition.text == "Partly cloudy" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.current.condition.text == "Partly Cloudy" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.current.condition.text == "Patchy rain nearby" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-raining.jpeg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-raining.jpeg);`;
    }
    else if(data.current.condition.text == "Moderate rain" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/Moderate-rain.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/Moderate-rain.jpg);`;
    }
    else if(data.current.condition.text == "Cloudy" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.current.condition.text == "Light rain" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/Moderate-rain.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/Moderate-rain.jpg);`;
    }
    else if(data.current.condition.text == "Light rain shower" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/Moderate-rain.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/Moderate-rain.jpg);`;
    }
    else if(data.current.condition.text == "Mist" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/mist-day.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/mist-day.jpg);`;
    }
    else if(data.current.condition.text == "Heavy rain" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-raining.jpeg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-raining.jpeg);`;
    }
    else if(data.current.condition.text == "Heavy rain" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.current.condition.text == "Light drizzle" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/Drizzle-night.png);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/Drizzle-night.png);`;
    }
    else if(data.current.condition.text == "Light drizzle" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-drizzle.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-drizzle.jpg);`;
    }
    else if(data.current.condition.text == "Patchy light drizzle" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-drizzle.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-drizzle.jpg);`;
    }
    else if(data.current.condition.text == "Patchy light drizzle" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/Drizzle-night.png);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/Drizzle-night.png);`;
    }
    else if(data.current.condition.text == "Fog" && data.current.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/mist-night.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/mist-night.jpg);`;
    }
    else if(data.current.condition.text == "Fog" && data.current.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/mist-day.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/mist-day.jpg);`;
    }
}

// main part
function mainChanges(data){

    mainTitleContainer.innerHTML = `
    <h1 id="mainLocationName" class="location op">${data.location.name + `, ` + data.location.country}</h1>
    <p class="today op"><span class="day">${days[new Date(data.location.localtime.replace('-','/').replace('-','/')).getDay()]}, </span><span class="date">${months[date.getMonth(data.location.localtime.split(' ')[0])]} ${date.getDate(data.location.localtime.split(' ')[0])} ${date.getFullYear()} , </span><span class="time">${data.location.localtime.split(' ')[1]}</span></p>`;

    weatherInformationsContainer.innerHTML = `
            <h3 id="mainLocationDeg" class="deg display-3 fw-bold op">${Math.round(data.current.temp_c)}<sup>o</sup>C</h3>
            <div class="weather-condition text-center op">
                <img class="weather-condition-icon op" src=${data.current.condition.icon}  alt="">
                <p class="weather-condition-text fw-bolder op">${data.current.condition.text}</p>
            </div>
            <ul class="weather-datils m-0 d-flex flex-column justify-content-between h-100 p-0 op">
                <li class="pressure op"><i class="fa-solid fa-temperature-three-quarters me-1"></i>pressure ${data.current.pressure_mb}mb</li>
                <li class="humidity op"><i class="fa-solid fa-droplet me-1"></i>humidity ${data.current.humidity}%</li>
                <li class="wind op"><i class="fa-solid fa-wind me-1"></i>wind ${data.current.wind_kph} kph</li>
            </ul>`

};

// hours part
function hoursForecast(data){
    for(let i = 0 ; i < timesContainer.length ; i++){
        timesContainer[i].innerHTML = `
        <p class="m-0 border-bottom pb-1 hour">${i+12}:00</p>
        <img class="status" src=${data.forecast.forecastday[0].hour[i+12].condition.icon} width="40px" height="40px" alt="">
        <p class="m-0 deg fw-bold">${Math.round(data.forecast.forecastday[0].hour[i+12].temp_c)}<sup>o</sup>C</p>`
    }
}

// hours click
for(let i = 0 ; i < timesContainer.length ; i++){
    timesContainer[i].addEventListener('click' ,async function(){
        displayHoursCardsDatiles(i+12);
    })
}

async function displayHoursCardsDatiles(intendedHour ){

    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${mainLocationName.innerHTML}&days=6&hour`);

    let data = await response.json();

    mainTitleContainer.innerHTML = `
    <h1 id="mainLocationName" class="location">${data.location.name + `, ` + data.location.country}</h1>
    <p class="today s"><span class="day">${days[new Date(data.location.localtime.replace('-','/').replace('-','/')).getDay()]}, </span><span class="date">${months[date.getMonth(data.location.localtime.split(' ')[0])]} ${date.getDate(data.location.localtime.split(' ')[0])} ${date.getFullYear()} , </span><span class="time-now">${data.forecast.forecastday[0].hour[intendedHour].time.split(' ')[1]}</span></p>`;
    
    weatherInformationsContainer.innerHTML = `
            <h3 id="mainLocationDeg" class="deg display-3 fw-bold s">${Math.round(data.forecast.forecastday[0].hour[intendedHour].temp_c)}<sup>o</sup>C</h3>
            <div class="weather-condition text-center s">
                <img class="weather-condition-icon s" src=${data.forecast.forecastday[0].hour[intendedHour].condition.icon}  alt="">
                <p class="weather-condition-text fw-bolder s">${data.forecast.forecastday[0].hour[intendedHour].condition.text}</p>
            </div>
            <ul class="weather-datils m-0 d-flex flex-column justify-content-between h-100 p-0 s">
                <li class="pressure s"><i class="fa-solid fa-temperature-three-quarters me-1"></i>pressure ${data.forecast.forecastday[0].hour[intendedHour].pressure_mb}mb</li>
                <li class="humidity s"><i class="fa-solid fa-droplet me-1"></i>humidity ${data.forecast.forecastday[0].hour[intendedHour].humidity}%</li>
                <li class="wind s"><i class="fa-solid fa-wind me-1"></i>wind ${data.forecast.forecastday[0].hour[intendedHour].wind_kph} kph</li>
            </ul>`;

            hoursBackgroundChanger(data , intendedHour);
};

function hoursBackgroundChanger(data , intendedHour){

    if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Clear")  && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night') ){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Overcast") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Partly cloudy") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy2.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy2.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Partly Cloudy") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy2.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy2.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Patchy rain nearby") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Moderate rain") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Cloudy") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Light rain") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Light rain shower") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Mist") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-mist.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-mist.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Sunny") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day') ){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/sunny-clear.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/sunny-clear.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Overcast") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Partly cloudy") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Partly Cloudy") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Patchy rain nearby") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-raining.jpeg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-raining.jpeg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Moderate rain") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/Moderate-rain.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/Moderate-rain.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Cloudy") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Light rain") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/Moderate-rain.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/Moderate-rain.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Light rain shower") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/Moderate-rain.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/Moderate-rain.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Mist") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/mist-day.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/mist-day.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Heavy rain") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-raining.jpeg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-raining.jpeg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Heavy rain") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Light drizzle") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/Drizzle-night.png);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/Drizzle-night.png);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Light drizzle") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-drizzle.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-drizzle.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Patchy light drizzle") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-drizzle.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-drizzle.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Patchy light drizzle") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/Drizzle-night.png);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/Drizzle-night.png);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Fog") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/mist-night.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/mist-night.jpg);`;
    }
    else if(data.forecast.forecastday[0].hour[intendedHour].condition.text.includes("Fog") && data.forecast.forecastday[0].hour[intendedHour].condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/mist-day.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/mist-day.jpg);`;
    }

}

// days part
function daysForecast(data){
    for(let i = 0 ; i < daysContainer.length ; i++){
        daysContainer[i].innerHTML =`
        <img class="status-icon bg-black bg-opacity-25 rounded p-1" src=${data.forecast.forecastday[i+1].day.condition.icon} width="40px" height="40px" alt="">
                <div class="date-day d-flex flex-column">
                    <p class="date m-0"><span class="day-name">${days[new Date(data.forecast.forecastday[i+1].date.replace('-','/').replace('-','/')).getDay()]} , </span><span class="date-name">${months[new Date(data.forecast.forecastday[i+1].date.replace('-','/').replace('-','/')).getMonth()]} ${ data.forecast.forecastday[i+1].date.substr(8)}</span></p>
                    <p class="status-text m-0">${data.forecast.forecastday[i+1].day.condition.text}</p>
                </div>
                <div class="deg d-flex flex-column border-start border-2 ps-3">
                    <p class="min-deg m-0">${Math.round(data.forecast.forecastday[i+1].day.mintemp_c)}<sup>o</sup></p>
                    <p class="max-deg m-0">${Math.round(data.forecast.forecastday[i+1].day.maxtemp_c)}<sup>o</sup></p>
                </div>`
    }
}

// days click
for(let i = 0 ; i < daysContainer.length ; i++){
    daysContainer[i].addEventListener('click' , async function(){
        displayDaysDatiles(i+1)
    })
}

async function displayDaysDatiles(intendedDay){

    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${mainLocationName.innerHTML}&days=6&hour`);

    let data = await response.json();

    mainTitleContainer.innerHTML = `
    <h1 id="mainLocationName" class="location">${data.location.name + `, ` + data.location.country}</h1>
    <p class="today s"><span class="day">${days[new Date(data.forecast.forecastday[intendedDay].date.replace('-','/').replace('-','/')).getDay()]}, </span><span class="date">${months[new Date(data.forecast.forecastday[intendedDay].date.replace('-','/').replace('-','/')).getMonth()]} ${ data.forecast.forecastday[intendedDay].date.substr(8)} , </span><span class="time-now">12:00</span></p>`;

    weatherInformationsContainer.innerHTML = `
            <h3 id="mainLocationDeg" class="deg display-3 fw-bold s">${Math.round(data.forecast.forecastday[intendedDay].day.maxtemp_c)}<sup>o</sup>C</h3>
            <div class="weather-condition text-center s">
                <img class="weather-condition-icon s" src=${data.forecast.forecastday[intendedDay].day.condition.icon}  alt="">
                <p class="weather-condition-text fw-bolder s">${data.forecast.forecastday[intendedDay].day.condition.text}</p>
            </div>
            <ul class="weather-datils m-0 d-flex flex-column justify-content-between h-100 p-0 s">
                <li class="pressure"><i class="fa-solid fa-temperature-three-quarters me-1"></i>pressure ${data.forecast.forecastday[intendedDay].hour[intendedDay].pressure_mb}mb</li>
                <li class="humidity"><i class="fa-solid fa-droplet me-1"></i>humidity ${data.forecast.forecastday[intendedDay].day.avghumidity}%</li>
                <li class="wind"><i class="fa-solid fa-wind me-1"></i>wind ${data.forecast.forecastday[intendedDay].day.maxwind_kph} kph</li>
            </ul>`;
    
            daysBackgroundChanger(data , intendedDay);
};

function daysBackgroundChanger(data , intendedDay){

    if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Clear") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night') ){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Clear") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day') ){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/sunny-clear.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/sunny-clear.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Overcast") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Partly cloudy") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy2.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy2.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Partly Cloudy") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy2.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy2.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Patchy rain nearby") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Moderate rain") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Cloudy") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-cloudy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-cloudy.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Light rain") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Light rain shower") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Mist") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/clear-mist.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/clear-mist.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Sunny") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day') ){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/sunny-clear.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/sunny-clear.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Overcast") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Partly cloudy") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Partly Cloudy") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Patchy rain nearby") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-raining.jpeg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-raining.jpeg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Moderate rain") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/Moderate-rain.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/Moderate-rain.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Cloudy") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-cloudyy.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-cloudyy.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Light rain") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/Moderate-rain.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/Moderate-rain.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Light rain shower") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/Moderate-rain.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/Moderate-rain.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Mist") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/mist-day.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/mist-day.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Heavy rain") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-raining.jpeg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-raining.jpeg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Heavy rain") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/night-raining.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/night-raining.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Light drizzle") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/Drizzle-night.png);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/Drizzle-night.png);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Light drizzle") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-drizzle.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-drizzle.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Patchy light drizzle") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/day-drizzle.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/day-drizzle.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Patchy light drizzle") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/Drizzle-night.png);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/Drizzle-night.png);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Fog") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('night')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/night/mist-night.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/night/mist-night.jpg);`;
    }
    else if(data.forecast.forecastday[intendedDay].day.condition.text.includes("Fog") && data.forecast.forecastday[intendedDay].day.condition.icon.includes('day')){
        header.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.750), rgba(0, 0, 0, 0.750)), url(./media/imgs/day/mist-day.jpg);`;
        container.style.cssText = `
            background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.305), rgba(0, 0, 0, 0.305)), url(./media/imgs/day/mist-day.jpg);`;
    }

}




































































































