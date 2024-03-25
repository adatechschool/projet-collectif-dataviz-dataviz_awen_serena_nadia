// ButtonClickGET --> Boutton
addEventListener("click", buttonClickGET);

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

    // Afficher l'image selon le temps
    afficherImage(data);

    // Afficher l'heure
    afficherHeure(data);

    // Sinon l'heure ne s'affiche pas en temps réel !
    setInterval(function() {
        afficherHeure(data);
    }, 1000);
}

// Afficher les informations sur la météo
function afficherMeteo(data) {
    let temperatureVent = document.getElementById("meteo");
    let vent = data.wind.speed * 3.6; // Pour convertir la vitesse du vent de m/s à km/h
    temperatureVent.innerHTML = "La température est de " + data.main.temp + " degrés Celsius.<br>La vitesse du vent est de " + vent.toFixed(2) + " km/h."; //toFixed(2) sert à n'affiche que deux décimales
}


// Afficher l'heure
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
}

// Obtenir le chemin de l'image en fonction de la condition météorologique
function obtenirCheminImage(conditionMeteo) {
    switch (conditionMeteo) {
        case "Clear":
            return "mouette.JPG"; // Afficher une mouette pour un ciel dégagé
        case "Clouds":
            return "mouette.JPG"; // Afficher des nuages pour un ciel nuageux
        case "Rain":
            return "mouette.JPG"; // Afficher de la pluie pour la pluie
        case "Thunderstorm":
            return "mouette.JPG"; // Afficher un orage pour un orage
        case "Snow":
            return "mouette.JPG"; // Afficher de la neige pour la neige
        case "Mist":
            return "mouette.JPG"; // Afficher du brouillard pour le brouillard
        default:
            return "caca"; // Image par défaut en cas de condition météorologique inconnue
    }
}

// Afficher l'image correspondant à la météo
function afficherImage(data) {
    let cheminImage = obtenirCheminImage(data.weather[0].main);
    let iconeMeteo = document.getElementById("iconeMeteo");
    iconeMeteo.innerHTML = "<img src='" + cheminImage + "' alt='Icone météo'>";
}


// Exécuter la requête AJAX toutes les secondes
setInterval(buttonClickGET, 50000);






