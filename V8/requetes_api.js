
// Fonction pour effectuer la requête AJAX à OpenWeather
function buttonClickGET() {
    let zone = document.getElementById("zone").value; // Récupérer la zone du spot
    let meteoUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + zone + "&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric"; //Envoyer la requète HTTP

    // Requête Fetch pour obtenir les données sur la météo depuis l'API OpenWeatherMap
    fetch(meteoUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la requête AJAX.');
        }
        return response.json();
    })
    .then(data => {
        // Si la requête est réussie, appeler la fonction de callback pour traiter les données
        callBackGetSuccess(data);
    })
    .catch(error => {
        console.error('Erreur lors de la requête AJAX.'); // Afficher une erreur en cas d'échec de la requête
    });
}

// Callback en cas de réussite de la requête
function callBackGetSuccess(data) {
    console.log("Données de l'API:", data);

    // Températures et vent
    afficherMeteo(data);

    // Afficher SVG selon le temps
    afficherImage(data);

    // Afficher l'heure
    afficherHeure(data);
}



// Afficher l'heure locale en fonction du décalage horaire de la zone
function afficherHeure(data) {
    let heure = document.getElementById("heure");
    let decalageHoraire = data.timezone; // OBTENIR DECALAGE HORAIRE
    let heureActuelle = new Date(); 
    let heureNouvelleZone = new Date(heureActuelle.getTime() + decalageHoraire * 1000); // CALCUL L'HEURE DANS LA ZONE

    let joursSemaine = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    let moisNoms = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

    let jourSemaine = joursSemaine[heureNouvelleZone.getDay()];
    let jourMois = heureNouvelleZone.getDate();
    let mois = moisNoms[heureNouvelleZone.getMonth()];
    let heures = (heureNouvelleZone.getHours()-1);
    let minutes = heureNouvelleZone.getMinutes();
    let secondes = heureNouvelleZone.getSeconds();

    // AFFICHER HEURE, MINUTE ET SECONDE EN DEUX CHIFFRES? EXEMPLE 10h04 ET PAS 10h4
    heures = (heures < 10) ? "0" + heures : heures;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    secondes = (secondes < 10) ? "0" + secondes : secondes;

    heure.innerHTML = jourSemaine + " " + jourMois + " " + mois + " " + heures + "h" + minutes + " et " + secondes + " secondes";

    
    // Appeler la fonction pour changer la couleur de fond uniquement lorsque l'heure est mise à jour
    animateBackgroundColor(heureNouvelleZone.getHours());
}

// Modifier la couleur de l'arrière-plan en fonction de l'heure
function animateBackgroundColor(heureNouvelleZone) {
    // Définir la couleur de fond en fonction de l'heure
    if (heureNouvelleZone < 6 || heureNouvelleZone >= 20) {
        // Nuit
        document.body.style.background = "linear-gradient(blue, pink)";

    } else if (heureNouvelleZone >= 6 && heureNouvelleZone < 20) {
        // Journée
        document.body.style.background = "linear-gradient(to bottom, #87CEEB, #FFC0CB)";
    }
}


// Afficher les informations sur la météo
function afficherMeteo(data) {
    let temperatureVent = document.getElementById("meteo");
    let vent = data.wind.speed * 3.6; // Pour convertir la vitesse du vent de m/s à km/h
    temperatureVent.innerHTML = "La température est de " + data.main.temp + " degrés Celsius.<br>La vitesse du vent est de " + vent.toFixed(2) + " km/h."; //toFixed(2) sert à n'affiche que deux décimales
}

// Obtenir le chemin de l'image en fonction de la condition météorologique
function obtenirCheminImage(conditionMeteo) {
    switch (conditionMeteo) {
        case "Clear":
            return "img/sun.svg"; 
        case "Clouds":
            return "img/clouds.svg"; 
        case "Rain":
            return "img/rain.svg";
        case "Thunderstorm":
            return "img/storm.svg"; 
        case "Snow":
            return "img/snow.svg"; 
        case "Mist":
            return "img/storm.svg"; 
        default:
            return "img/clouds.svg"; 
    }
}

// Afficher l'image correspondant à la météo
function afficherImage(data) {
    let cheminImage = obtenirCheminImage(data.weather[0].main);
    let iconeMeteo = document.getElementById("iconeMeteo");
    iconeMeteo.innerHTML = "<img src='" + cheminImage + "' alt='Icone météo'>";
}

// ButtonClickGET --> Boutton
setInterval(buttonClickGET, 1000);


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Définir la largeur et la hauteur du canvas
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Définir les variables pour la vague
let xOffset = 0;

// Fonction pour dessiner la vague
function drawWave(xOffset, color) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height); // Créer un gradient vertical
    gradient.addColorStop(0, '#ddf3ff'); // Bleu clair en haut
    gradient.addColorStop(1, color); // Couleur spécifiée en bas

    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x < width; x += 1) { //Trou à droite
        const y = height / 2 + Math.sin(x / 200 + xOffset) * 30; //Hauteur
        const z = Math.cos(x /100 + xOffset) * 30; // Ondulations
        ctx.lineTo(x, y - z);

    
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
}

// Fonction pour animer la vague
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    // Dessiner les trois parties de la vague avec des couleurs différentes
    drawWave(xOffset+500, "#ffffff"); // Blanc
    drawWave(xOffset+100 , "#87ceeb"); // Bleu clair
    drawWave(xOffset-100 , "#1e90ff"); // Bleu foncé

    xOffset += 0.05; // Vitesse
}

animate();




