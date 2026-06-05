// Haetaan canvas elementti ja luodaan 2D piirtokonteksti
const canvas = document.getElementById('hexCanvas');
const ctx = canvas.getContext('2d');

// Pääfunktio joka piirtää heksagonikennoston
function drawHexGrid() {

    // Asettaa canvaksen koon vastaamaan HTML elementin kokoa
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Kennon säde, kennon leveys, kennon korkeus
    const size = 35;
    const w = Math.sqrt(3) * size;
    const h = size * 2;

    // Tyhjennetään canvas ennen uudelleenpiirtoa
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#FF6600';
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1.5;

    // Lasketaan kuinka monta kokonaista kennoa mahtuu
    const cols = Math.floor(canvas.width / w);
    const rows = Math.floor(canvas.height / (h * 0.75));

    // Käydään läpi jokainen rivi ja kolumni
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            // Lasketaan kennon keskipisteen sijainti
            // Joka toinen rivi siirretään puoli kennoa oikealle
            const x = col * w + (row % 2 === 0 ? 0 : w / 2);
            const y = row * (h * 0.75);
        
            // Tarkistetaan että kenno mahtuu kokonaan canvasille ennen piirtämistä
            // Näin reunat eivät leikkaannu
            if (x - size >= 0 && x + size <= canvas.width && y - size >= 0 && y + size <= canvas.height) {
                drawHexagon(x, y, size);
            }
        }
    }
}

// Piirtää yhden kennon annettuun keskipisteeseen annetulla säteellä
function drawHexagon (x, y, size) {
    ctx.beginPath();

    // Käydään läpi heksagonin 6 kulmapistettä
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
}

// Piirretään kennosto heti sivun latautuessa
drawHexGrid();

// Piirretään uudelleen kun ikkunan koko muuttuu
window.addEventListener('resize', drawHexGrid);