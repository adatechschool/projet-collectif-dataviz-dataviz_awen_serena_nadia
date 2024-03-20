function updateTime() {
    let now = new Date();
    const heure = now.getHours();
    let minute = now.getMinutes();
    let seconde = now.getSeconds();
    let jour = now.getDay(); // Jour de la semaine (0 = Dimanche, 1 = Lundi, ..., 6 = Samedi)
    let mois = now.getMonth(); // Mois (0 = Janvier, 1 = Février, ..., 11 = Décembre)
    let jourDuMois = now.getDate(); // Jour du mois (1-31)
    let annee = now.getFullYear(); // Année (YYYY)

    // Tableau contenant les noms des jours de la semaine
    var daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    // Tableau contenant les noms des mois
    var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    if (minute < 10) {
        minute = "0" + minute;
    }

    if (seconde < 10) {
        seconde = "0" + seconde;
    }

    // Affichage du jour, de la date, du mois et de l'heure
    let timeElement = document.getElementById("time");
    timeElement.textContent = "Aujourd'hui, " + daysOfWeek[jour] + " " + jourDuMois + " " + months[mois] + " " + annee + ", " + heure + " : " + minute + " : " + seconde;
}

// Mettre à jour l'heure toutes les secondes
setInterval(updateTime, 1000);