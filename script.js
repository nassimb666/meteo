// document.getElementById("searchBtn").addEventListener("click", () => {
//     const city = document.getElementById("city").value;
//     const apiKey = "11e43737541a7663b5f72b3c98a44e53"; 

    
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

//     fetch(forecastUrl)
//         .then(response => response.json())
//         .then(data => {
//             const meteoInfoDiv = document.getElementById("meteo-info");
//             meteoInfoDiv.innerHTML = ""; 

            
//             const forecasts = data.list.filter((item, index) => index % 8 === 0); 

//             forecasts.forEach(forecast => {
//                 const timestamp = forecast.dt * 1000; 
//                 const date = new Date(timestamp);
//                 const temperature = forecast.main.temp;
//                 const description = forecast.weather[0].description;

//                 const forecastInfo = document.createElement("div");
//                 forecastInfo.classList.add("forecast-info");
//                 forecastInfo.innerHTML = `<p>${date.toLocaleString()}</p><p>Température : ${temperature}°C</p><p>Météo : ${description}</p>`;

//                 meteoInfoDiv.appendChild(forecastInfo);
//             });
//         })
//         .catch(error => {
//             console.error('Erreur :', error);
//         });
// });
document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("city").value;
    const apiKey = "11e43737541a7663b5f72b3c98a44e53"; 

    // URL pour les prévisions horaires de la journée actuelle
    const currentDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(currentDayUrl)
    .then(response => response.json())
    .then(data => {
        const meteoInfoDiv = document.getElementById("meteo-info");
        meteoInfoDiv.innerHTML = "";

        
        const todayForecasts = data.list.filter(item => {
            const date = new Date(item.dt * 1000);
            return date.getDate() === new Date().getDate();
        });

        // Afficher les prévisions horaires pour la journée actuelle
        const currentDayInfo = document.createElement("div");
        currentDayInfo.classList.add("current-day-info");
        todayForecasts.forEach(forecast => {
            const timestamp = forecast.dt * 1000; // Convertit le timestamp en millisecondes
            const time = new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const temperature = forecast.main.temp;
            const description = forecast.weather[0].description;
            let emoji = "";

            if (description.includes("pluie")) {
                emoji = "☔";
            } else if (description.includes("nuageux")) {
                emoji = "⛅";
            } else if (description.includes("ensoleillé")) {
                emoji = "☀";
            } 

            const forecastInfo = document.createElement("div");
            forecastInfo.classList.add("forecast-info");
            forecastInfo.innerHTML = `<p>${time} ${emoji}</p><p>Température : ${temperature}°C</p><p>Météo : ${description}</p>`;
            currentDayInfo.appendChild(forecastInfo);
        });

        meteoInfoDiv.appendChild(currentDayInfo);
    })
    .catch(error => {
        console.error('Erreur :', error);
    });
});
