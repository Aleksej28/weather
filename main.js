const icons = {
    sun: "./img/icons/sun.svg",
    clouds: "./img/icons/clouds.svg",
    rain: "./img/icons/rain.svg",
    snow: "./img/icons/snow.svg",
};

const icon = document.querySelector("#icon");
const bgImg = document.querySelector("#container");
const inputCity = document.querySelector('.search');

async function getWeatherForecast(city) {
    try {
        const result = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=077e51cd30bc9ceb6331c59fab7a06f1&lang=ru`
        );

        if (result.ok == false) {
            alert("Введите корректное название города!")
        } else {
            const data = await result.json();
            console.log(data);

            document.querySelector("h1").innerHTML = `${data.name} <br> ${
                Math.round(data.main.temp) > 0
                    ? "+" + Math.round(data.main.temp)
                    : Math.round(data.main.temp)
            } °C`;

            if (data.rain) {
                icon.setAttribute("src", icons.rain);
                bgImg.setAttribute('class', 'rain');
            } else if (data.snow) {
                icon.setAttribute("src", icons.snow);
                bgImg.setAttribute('class', 'snow');
            } else {
                if (data.clouds.all > 30) {
                    icon.setAttribute("src", icons.clouds);
                    bgImg.setAttribute('class', 'clouds');
                } else {
                    icon.setAttribute("src", icons.sun);
                    bgImg.setAttribute('class', 'sun');
                }
            }

            document.querySelector(".wind p").innerText = `${data.wind.speed} м/с`;
            document.querySelector(".drop p").innerText = `${data.main.humidity} %`;
            document.querySelector(".pressure p",).innerHTML = `${data.main.pressure} <br> мм.рт.ст`;
        }
    } catch (error) {
        alert(error);
    }

}

getWeatherForecast("Москва");

    // Получаем прогноз для заданного города
document.querySelector('#form').addEventListener('submit', function(e){
    e.preventDefault();
    getWeatherForecast(inputCity.value);
    inputCity.value = '';
});