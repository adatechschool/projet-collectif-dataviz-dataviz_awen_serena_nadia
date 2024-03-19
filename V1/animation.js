const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Définir la largeur et la hauteur du canvas
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Définir les variables pour la vague
let xOffset = 0;

// Fonction pour dessiner la vague
function drawWave(xOffset, color, heightOffset) {
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x < width; x += 10) {
        const y = height / 2 + Math.sin(x / 50 + xOffset) * 50 + heightOffset;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

// Fonction pour animer la vague
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    // Dessiner les trois parties de la vague avec des couleurs différentes
    drawWave(xOffset, "#ffffff", 0); // Blanc
    drawWave(xOffset + 500, "#add8e6", 0); // Bleu clair
    drawWave(xOffset + 100, "#00008b", 0); // Bleu foncé


    xOffset += 0.05;
}


animate();



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

// Mettre à jour la température toutes les 10 secondes
setInterval(buttonClickGET, 10000);
