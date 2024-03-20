// weather.js

function getWeatherData(city) {
    const apiUrl = `https://www.metaweather.com/api/location/search/?query=${city}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau - Impossible de récupérer les données');
            }
            return response.json();
        })
        .then(data => {
            // Vérifiez si des données de localisation ont été trouvées
            if (data.length > 0 && data[0].hasOwnProperty('woeid')) {
                const woeid = data[0].woeid;
                const weatherUrl = `https://www.metaweather.com/api/location/${woeid}/`;
                return fetch(weatherUrl);
            } else {
                throw new Error('Localisation non trouvée');
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau - Impossible de récupérer les données météorologiques');
            }
            return response.json();
        })
        .then(data => {
            // Vérifiez si les données sur le vent sont disponibles
            if (data.hasOwnProperty('consolidated_weather') && data.consolidated_weather.length > 0) {
                const windSpeed = data.consolidated_weather[0].wind_speed;
                // Mettre à jour le contenu de l'élément h2 avec l'ID "weather-info"
                document.getElementById('weather-info').textContent = `La vitesse du vent à ${city} est de ${windSpeed} km/h`;
            } else {
                console.log('Données sur le vent non disponibles pour cette zone.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données météorologiques:', error);
        });
}

// Fonction pour effectuer la requête AJAX
function buttonClickGET() {
    var queryLoc = document.getElementById("queryLoc").value;
    getWeatherData(queryLoc);
}
