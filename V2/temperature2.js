// Fonction de succès pour la requête AJAX
var callBackGetSuccess = function(data) {
    console.log("donnees api", data);
    var element = document.getElementById("zone_meteo");
    element.innerHTML = "La temperature est de " + data.main.temp + " degrés Celsius";

    // Mettre à jour la hauteur de la vague bleue en fonction de la température
    if (data.main.temp >= 20) {
        drawWave(xOffset + 500, "#add8e6", -300); // Augmenter la hauteur de la vague bleue de 300px
    } else {
        drawWave(xOffset + 500, "#add8e6", 0); // Ne pas modifier la hauteur de la vague bleue
    }
};

// Fonction pour effectuer la requête AJAX
function buttonClickGET() {
    var queryLoc = document.getElementById("queryLoc").value;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + queryLoc + "&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric";
    $.get(url, callBackGetSuccess)
        .done(function() {

        })
        .fail(function() {
            alert("error");
        })
        .always(function() {

        });
}

// setInterval(buttonClickGET, 10000);