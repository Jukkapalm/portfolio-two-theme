// Neuroverkon globaalit muuttujat
let node_color = 'rgba(0, 168, 120,';
let line_color = 'rgba(0, 168, 120,';

// Neuroverkko - partikkelianimaatio
function initNeuralNetwork() {
    const canvas = document.getElementById('neuro-canvas');
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let W, H;

    const node_count = 50;
    const max_dist = 150;

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    function createNodes() {
        nodes = [];
        for (let i = 0; i < node_count; i++) {
            nodes.push({
                x: Math.random() * W,
                y: Math.random() * H,

                // Nopeuskerroin
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                r: Math.random() * 2 + 1,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Yhteyslinjat solmujen välillä
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < max_dist) {
                    const alpha = (1 - dist / max_dist) * 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = line_color + alpha + ')';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Solmupisteet
        nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = node_color + '0.7)';
            ctx.shadowBlur = 6;
            ctx.shadowColor = node_color + '0.5)';
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }

    function update() {
        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            // Reunasta kimmoke
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    resize();
    createNodes();
    loop();

    // Estetään mobiilissa kosketusnäytöllä jatkuva uudelleen piirtäminen jos käyttäjä selaa ruutua
    let resizeTimer;
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        if (window.innerWidth !== lastWidth) {
            lastWidth = window.innerWidth;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resize();
                createNodes();
            }, 250);
        }
    });
}

initNeuralNetwork();

const toggleBtn = document.querySelectorAll('.theme-toggle-btn');

toggleBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const isCyber = document.documentElement.getAttribute('data-theme') === 'cyberpunk';

        if (isCyber) {
            document.documentElement.removeAttribute('data-theme');
            node_color = 'rgba(0, 168, 120,';
            line_color = 'rgba(0, 168, 120,';
            toggleBtn.forEach(b => b.textContent = 'Duality');
        } else {
            document.documentElement.setAttribute('data-theme', 'cyberpunk');
            node_color = 'rgba(0, 255, 238';
            line_color = 'rgba(0, 255, 238';
            toggleBtn.forEach(b => b.textContent = 'Duality');
        }
    });
});