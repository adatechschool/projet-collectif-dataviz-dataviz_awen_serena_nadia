const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Définir la largeur et la hauteur du canvas
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Définir les variables pour la vague
let xOffset = 0;

// Fonction pour dessiner la vague avec les bulles
function drawWave(xOffset, color) {
    const bubbleSize = 5;
    const bubbleDensity = 0.005; // Densité des bulles
    const gradient = ctx.createLinearGradient(0, 0, 0, height); // Créer un gradient vertical
    gradient.addColorStop(0, '#ddf3ff'); // Bleu clair en haut
    gradient.addColorStop(1, color); // Couleur spécifiée en bas

    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x < width; x += 10) {
        const y = height / 2 + Math.sin(x / 100 + xOffset) * 30;
        const z = Math.cos(x / 100 + xOffset) * 30;
        ctx.lineTo(x, y - z);

        // Dessiner des bulles
        const yWave = height / 2 + Math.sin(x / 100 + xOffset) * 30;
        if (Math.random() < bubbleDensity && y < yWave) {
            ctx.beginPath();
            ctx.arc(x, y, bubbleSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fill();
        }
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
    drawWave(xOffset, "#ffffff"); // Blanc
    drawWave(xOffset + 500, "#87ceeb"); // Bleu clair
    drawWave(xOffset + 100, "#1e90ff"); // Bleu foncé

    xOffset += 0.05;
}

animate();








