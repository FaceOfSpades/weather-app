import './styles.css';

async function getWeather(search) {
    let response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + search + '?key=3BPVYJWW262ML7JFNSAVTF92L', {mode: 'cors'})
    let weatherData = await response.json();
    return weatherData;
}

async function getTemp(search) {
    try {
    let weather = await getWeather(search);
    Display(weather);
    generateBackground(weather);
    } catch(error) {
        console.log(error);
        throw new Error("stop");
    }
};

const getSearch = function () {
    const search = document.querySelector("#search");
    const submit = document.querySelector("#submit");
    submit.addEventListener("click", (event) => {
        let newSearch = search.value;
        getTemp(newSearch);
        event.preventDefault();
    })
}();

function Display(weather) {
    clearDisplay();
    const display = document.querySelector(".display-container");
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let count = d.getDay();
    let dayCount = 0;
    weekday.forEach((e) => {
        const div = document.createElement("div");
        const span = document.createElement("span");
        const tempHigh = document.createElement("div");
        const tempLow = document.createElement("div");
        div.classList.add("tiles");
        tempHigh.classList.add("high");
        tempLow.classList.add("low");
        tempHigh.textContent = Math.round(weather.days[dayCount].tempmax);
        tempLow.textContent = Math.round(weather.days[dayCount].tempmin);
        display.appendChild(div);
        let day = weekday[count];
        span.textContent = day;
        div.appendChild(span);
        div.appendChild(tempHigh);
        div.appendChild(tempLow);
        if (count == 6) {
            count = 0
        } else {
            count++;
        };
        dayCount++;
    });
    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent = weather.description;
    display.appendChild(description);
}

function clearDisplay() {
    const display = document.querySelector(".display-container");
    while (display.firstChild) {
        display.removeChild(display.lastChild);
    };
}

async function generateBackground(weather) {
    let search = weather.currentConditions.conditions;
    let gif = await getGif(search);
    const img = document.querySelector("img");
    img.src = gif.data.images.original.url;
    img.style.display = "block";
}

async function getGif(search) {
    let response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=ZVP1eoUUDXmIeO2EqrQW3qk2BhigaK92&s=weather ' + search, {mode: 'cors'})
    let result = await response.json();
    return result;
}