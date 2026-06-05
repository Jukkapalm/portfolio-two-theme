const canvas = document.getElementById('hexCanvas');
const ctx = canvas.getContext('2d');

function drawHexGrid() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const size = 35;
    const w = Math.sqrt(3) * size;
    const h = size * 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#FF6600';
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1.5;

    const cols = Math.floor(canvas.width / w);
    const rows = Math.floor(canvas.height / (h * 0.75));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * w + (row % 2 === 0 ? 0 : w / 2);
            const y = row * (h * 0.75);
        
            if (x - size >= 0 && x + size <= canvas.width && y - size >= 0 && y + size <= canvas.height) {
                drawHexagon(x, y, size);
            }
        }
    }
}

function drawHexagon (x, y, size) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
}

drawHexGrid();
window.addEventListener('resize', drawHexGrid);