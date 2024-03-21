// Fonction pour effectuer la requête AJAX aux API's (pour Asynchronous JavaScript And XML : méthode pour envoyer ou recevoir les données d'un serveur de façons asynchrone sans recharger la page)
function buttonClickGET() {
	let zone = document.getElementById("zone").value; // DEFINIR ZONE DU SPOT
	let meteoUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + zone + "&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric";

	// REQUETE GET (MODELE JQUERRY) POUR AVOIR INFOS SUR VENT ET TEMPERATURE SUR API OPENWEATHERMAP
	$.get(meteoUrl)
		.done(function (data) {
			// CALLBACK SI REQUETE REUSSIE

                                    callBackGetSuccess(data); // SI APPEL CALLBACKGETSUCCES FONCTIONNE

                                    // RECUPERATION DES COORDONNEES GEOGRAPHIQUE DANS LA PREMIERE API POUR FAIRE L'APPEL DANS LA SECONDE
                                    let latitude = data.coord.lat;
                                    let longitude = data.coord.lon;

                                    // OBTENIR DATE ACTUELLE POUR OBTENIR DONNEES DU JOUR DES MAREES SUR STORMGLASS
                                    // VARIABLE EN ANGLAIS POUR NE PAS PORTER CONFUSION AVEC LA PARTIE HEURE EN DESSOUS 
                                    let today = new Date();
                                    let year = today.getFullYear();
                                    let month = String(today.getMonth() + 1).padStart(2, '0'); // +1 CAR LES MOIS SONT INDEXES À PARTIR DE ZERO 
                                    // PADSTART SERT À RAJOUTER UN ZERO SI UN MOIS N'A QU'UN CHIFFRE, EX : MARS = 3 
                                    let day = String(today.getDate()).padStart(2, '0');

                                    // FORMATTER LA DATE AU FORMAT "YYYY-MM-DD"
                                    let dateFormatee = `${year}-${month}-${day}`;

                                    // REQUETE FETCH (NATIF JS MODERNE) POUR LES MAREES SUR API STORMGLASS AVEC COORDONNEES RECUPEREES
                                    fetch("https://api.stormglass.io/v2/tide/extremes/point?lat=" + latitude + "&lng=" + longitude + "&start=" + dateFormatee + "&end=" + dateFormatee, {
                                            headers: {
                                                "Authorization": "d1827ff8-e6ca-11ee-be1e-0242ac130002-d1828066-e6ca-11ee-be1e-0242ac130002"
                                            }
                                        })
                                        .then(response => response.json())
                                        .then(tideData => {

                                            // VERIFIE SI IL Y A UNE CATEGORIE MAREE ET SI IL Y A AU MOINS UNE DONNEE
                                            if (tideData && tideData.data && tideData.data.length > 0) {
                                                // VERIFIE SI LA DERNIERE DONNEE EST HAUTE OU BASSE
                                                let derniereMaree = tideData.data[tideData.data.length - 1];
                                                let statusMaree = derniereMaree.type === 'high' ? "marée haute" : "marée basse";
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
                                            maree.innerHTML = "Une erreur s'est produite lors de la récupération des données de marées."; // REQUETE STORMGLASS À ÉCHOUÉE
                                        });
		})
		.fail(function () {
			console.error("Erreur lors de la requête AJAX."); // REQUETE OPENWEATHER À ÉCHOUÉE
		});
}

// CALLBACK SI APPEL OPENWEATHER REUSSIE
let callBackGetSuccess = function (data) {
	console.log("donnees api", data);

	// VENT ET TEMPERATURE
	let temperatureVent = document.getElementById("meteo");
	let vent = data.wind.speed * 3.6; // m/s -> km/h
	temperatureVent.innerHTML = "La temperature est de " + data.main.temp + " degrés Celsius.<br>La vitesse du vent est de " + vent.toFixed(2) + " km/h."; //toFixed SERT À ARRONDIR À 2 DÉCIMALES

	// DATE DE L'ENDROIT SUR PLACE
	let heure = document.getElementById("heure");
	let decalageHoraire = data.timezone; // OBTENIR DECALAGE HORAIRE
	let heureActuelle = new Date(); 
	let heureNouvelleZone = new Date(heureActuelle.getTime() + decalageHoraire * 1000); // CALCUL L'HEURE DANS LA ZONE

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

	heure.innerHTML = jourSemaine + " " + jourMois + " " + mois + " " + heures + "h" + minutes + " et " + secondes + " secondes";
};

// Actualisation toutes les secondes
// setInterval(buttonClickGET, 1000);

