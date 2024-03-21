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
        const y = height / 2 + Math.sin(x / 100 + xOffset) * 30 + heightOffset; // Réduire le coefficient à 100 et l'amplitude à 30
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



