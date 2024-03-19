
function updateTime() {
    let now = new Date();
    const heure = now.getHours();
    let minute = now.getMinutes();
    let seconde = now.getSeconds();

    if (minute < 10) {
        minute = "0" + minute;
    }

    if (seconde < 10) {
        seconde = "0" + seconde;
    }

    let timeElement = document.getElementById("time");
    timeElement.textContent = heure + " : " + minute + " : " + seconde;
}

// Mettre à jour l'heure toutes les secondes
setInterval(updateTime, 1000);