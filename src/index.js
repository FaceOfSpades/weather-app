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
    console.log(weather);
    const display = document.querySelector(".display-container");
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let count = d.getDay();
    weekday.forEach((e) => {
        const div = document.createElement("div");
        const span = document.createElement("span");
        display.appendChild(div);
        let day = weekday[count];
        span.textContent = day;
        div.appendChild(span);
        if (count == 6) {
            count = 0
        } else {
            count++;
        };
    });    
}