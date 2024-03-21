// Fonction pour effectuer la requête AJAX aux API's (pour Asynchronous JavaScript and XML : méthode pour envoyer ou recevoir les données serveur de façons asynchrone sans recharger la page)
function buttonClickGET() {
    let zone = document.getElementById("appelQuerry").value; // Variable pour définir le lieu qu'on va envoyer dans la requete, value sert à recuperer appelQuerry
    let meteoUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + zone + "&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric";
    
    // REQUETE GET (MODELE JQUERRY) POUR AVOIR INFOS SUR VENT ET TEMPERATURE SUR API OPENWEATHERMAP
    $.get(meteoUrl)
    .done(function(data) {
        callBackGetSuccess(data); // Appelle la fonction callBackGetSuccess qui va traiter les données si la requête réussit

        // RECUPERATION DANS LA PREMIERE API POUR FAIRE L'APPEL DANS LA SECONDE
        let latitude = data.coord.lat;
        let longitude = data.coord.lon;

        // REQUETE FETCH (NATIF JS MODERNE) POUR LES MAREES SUR API WORLDTIDES AVEC COORDONNEES RECUPEREES
        let mareeUrl = "https://www.worldtides.info/api?heights&lat=" + latitude + "&lon=" + longitude + "&key=d1827ff8-e6ca-11ee-be1e-0242ac130002-d1828066-e6ca-11ee-be1e-0242ac130002";
        
        fetch(mareeUrl)
        .then(response => response.json())
        .then(tideData => {
            // VERIFIER SI INFORMATIONS DE MAREES EXISTENT, SI LA PROPRIETE TAILLE EST INDIQUEE ET SI IL Y A UNE DONNEE CONTENUS
            if (tideData && tideData.heights && tideData.heights.length > 0) {
                // Vérifier si la marée sera haute ou basse
                let hauteOuNon = tideData.heights[0].height > 0; // Si la hauteur est positive, c'est une marée haute
                let statusMaree = hauteOuNon ? "marée haute" : "marée basse";
                let maree = document.getElementById("maree");
                maree.innerHTML = "La marée est prévue comme " + statusMaree + ".";
            } else {
                let maree = document.getElementById("maree");
                maree.innerHTML = "Les informations sur les marées ne sont pas disponibles pour cette zone.";
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données de marées:", error);
            let maree = document.getElementById("maree");
            maree.innerHTML = "Une erreur s'est produite lors de la récupération des données de marées.";
        });
    })
    .fail(function() {
        console.error("Erreur lors de la requête AJAX."); // Afficher un message d'erreur dans la console du navigateur en cas d'échec de la requête AJAX
    });
}




// REQUETE AJAX SUITE --> récuperer la date, la vitesse du vent et la temperature sur le fichier JSON fourni par open weather
let callBackGetSuccess = function (data) {
	console.log("donnees api", data);


                // VENT ET TEMPERATURE
                let temperatureVent = document.getElementById("meteo");
                let vent = data.wind.speed * 3.6; // Convertir la vitesse du vent de m/s en km/h
                temperatureVent.innerHTML = "La temperature est de " + data.main.temp + " degrés Celsius.<br>La vitesse du vent est de " + vent.toFixed(2) + " km/h."; //toFixed sert à arrondir à deux décimales



                // DATE DE L'ENDROIT SUR PLACE
                let heure = document.getElementById("heure");
                let decalageHoraire = data.timezone; // Obtenir le décalage horaire de la zone en secondes
                let heureActuelle = new Date(); // Heure actuelle
                let heureNouvelleZone = new Date(heureActuelle.getTime() + decalageHoraire * 1000); // Calculer l'heure dans la zone

                let joursSemaine = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
                let moisNoms = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

                let jourSemaine = joursSemaine[heureNouvelleZone.getDay()];
                let jourMois = heureNouvelleZone.getDate();
                let mois = moisNoms[heureNouvelleZone.getMonth()];
                let heures = heureNouvelleZone.getHours();
                let minutes = heureNouvelleZone.getMinutes();
                let secondes = heureNouvelleZone.getSeconds();
                        
                        // AFFICHER HEURE, MINUTE ET SECONDE EN DEUX CHIFFRES? EXEMPLE 10h04 ET PAS 10h4
                        heures = (heures < 10) ? "0" + heures : heures;
                        minutes = (minutes < 10) ? "0" + minutes : minutes;
                        secondes = (secondes < 10) ? "0" + secondes : secondes;

                heure.innerHTML = jourSemaine + " " + jourMois + " " + mois + " " + heures + "h" + minutes + " et " + secondes +" secondes";
};

// Actualisation toutes les 10 secondes
// setInterval(buttonClickGET, 1000);