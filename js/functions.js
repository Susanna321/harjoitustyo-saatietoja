document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'YOUR_API_KEY';// Replace with your OpenWeatherMap API key
    const weatherResult = document.getElementById('weatherResult');
    const locationForm = document.getElementById('locationForm');
    const locationInput = document.getElementById('location');

    // Load saved location from localStorage
    const savedLocation = localStorage.getItem('location');
    if (savedLocation) {
        fetchWeather(savedLocation);
        locationInput.value = savedLocation;
    }

    // Form submit event listener
    locationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
            localStorage.setItem('location', location);
        }
    });

    // Fetch weather from OpenWeatherMap API
    function fetchWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    weatherResult.innerHTML = `<p class="text-danger">City not found. Please try again.</p>`;
                }
            })
            .catch(error => {
                weatherResult.innerHTML = `<p class="text-danger">Error fetching weather data. Please try again later.</p>`;
            });
    }

    // Display weather data
    function displayWeather(data) {
        const { name, main, weather } = data;
        weatherResult.innerHTML = `
            <h3>Weather in ${name}</h3>
            <p>Temperature: ${main.temp} °C</p>
            <p>Conditions: ${weather[0].description}</p>
        `;
    }
});
