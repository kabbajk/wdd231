// Weather API Integration
document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'ee635c14229fa34761d9799de6ad4457'; // Replace with your actual API key
  const city = 'Freetown'; // Replace with your city
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  
  // Fetch current weather
  fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
          document.getElementById('current-temp').textContent = Math.round(data.main.temp);
          document.getElementById('weather-desc').textContent = data.weather[0].description;
          document.getElementById('humidity').textContent = data.main.humidity;
          
          // Set weather icon
          const iconCode = data.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
      })
      .catch(error => console.error('Error fetching weather:', error));
  
  // Fetch forecast
  fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
          const forecastContainer = document.getElementById('forecast-container');
          forecastContainer.innerHTML = '';
          
          // Get forecast for next 3 days at noon (or closest available time)
          const forecasts = data.list.filter(item => {
              const date = new Date(item.dt * 1000);
              return date.getHours() >= 11 && date.getHours() <= 13;
          }).slice(0, 3);
          
          forecasts.forEach(item => {
              const date = new Date(item.dt * 1000);
              const day = date.toLocaleDateString('en-US', { weekday: 'short' });
              const temp = Math.round(item.main.temp);
              const iconCode = item.weather[0].icon;
              const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
              
              const forecastItem = document.createElement('div');
              forecastItem.className = 'forecast-item';
              forecastItem.innerHTML = `
                  <p><strong>${day}</strong></p>
                  <img src="${iconUrl}" alt="${item.weather[0].description}">
                  <p>${temp}°F</p>
              `;
              
              forecastContainer.appendChild(forecastItem);
          });
      })
      .catch(error => console.error('Error fetching forecast:', error));
});