// Neuroverkon globaalit muuttujat
// Määritelty funktion ulkopuolella jotta väriä saa vaihdettua
// Duality buttonilla
let node_color = 'rgba(0, 168, 120,';
let line_color = 'rgba(0, 168, 120,';

// Neuroverkko - partikkelianimaatio
function initNeuralNetwork() {
    const canvas = document.getElementById('neuro-canvas');
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let W, H;

    // Partikkelien määrä ja maksimietäisyys yhteyslinjan piirtoa varten
    const node_count = 50;
    const max_dist = 150;

    // Asetetaan canvas vastaamaan elementin kokoa
    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    // Luodaan pisteet satunnaisiin sijainteihin ja liike suuntiin
    function createNodes() {
        nodes = [];
        for (let i = 0; i < node_count; i++) {
            nodes.push({
                x: Math.random() * W,
                y: Math.random() * H,

                // Nopeuskerroin 0.2
                vx: (Math.random() - 0.5) * 0.2, // Vaakasuunnan nopeus
                vy: (Math.random() - 0.5) * 0.2, // Pystysuunnan nopeus
                r: Math.random() * 2 + 1, // Säde
            });
        }
    }

    // Piirtää yhden framen - viivat ja pisteet
    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Yhteyslinjat solmujen välillä jos ne ovat tarpeeksi lähellä
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < max_dist) {

                    // Yhteyslinja läpinäkyvyys kasvaa mitä lähempänä pisteet ovat
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

    // Liikuttaa pisteitä ja vaihdetaan suuntaa reunoista
    function update() {
        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            // Reunasta kimmoke
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });
    }

    // Animaatio silmukka - kutsuu update ja draw joka framella
    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    resize();
    createNodes();
    loop();

    // Estetään mobiilissa kosketusnäytöllä jatkuva uudelleen piirtäminen jos käyttäjä selaa ruutua
    // Reagoi vain jos näyttö koko muuttuu
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

// Teeman vaihto button
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
            node_color = 'rgba(0, 255, 238,';
            line_color = 'rgba(0, 255, 238,';
            toggleBtn.forEach(b => b.textContent = 'Duality');
        }

        // AI apurin nimenvaihto teeman mukaan
        if (isCyber) {
            document.getElementById('bottiNimi').textContent = 'AI-apuri';
            document.getElementById('bottiEmoji').textContent = '🤖';
            document.getElementById('bottiAloitusViesti').textContent = 'Hei! Olen AI-apuri. Voin vastata kysymyksiin Jukan portfoliosta ja projekteista.';
        } else {
            document.getElementById('bottiNimi').textContent = 'Fixer';
            document.getElementById('bottiEmoji').textContent = '⚡';
            document.getElementById('bottiAloitusViesti').textContent = 'Jälleen yksi ihminen jolle pitää alkaa portfoliosta tai projekteista selittämään, minulla olisi muutakin tekemistä. Mitä haluat?';
        }
    });
});

// Navigaatio ja sectionit
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

// Navigaatio linkkien scroll
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        const oikeaSisalto = document.getElementById('oikeaSisalto');
        if (target && oikeaSisalto) {
            oikeaSisalto.scrollTo({
                top: target.offsetTop - 20,
                behavior: 'smooth'
            });
        }

        // Merkitään klikattu linkki aktiiviseksi navigaatiossa
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Suljetaan hamburger menu linkin klikkauksen jälkeen
        const navbar = document.getElementById('collapsibleNavbar');
        if (navbar.classList.contains('show')) {
            const toggler = document.querySelector('.navbar-toggler');
            toggler.click();
        }
    });
});

// Aktiivinen navigaatio linkki scrollauksen mukaan
document.getElementById('oikeaSisalto').addEventListener('scroll', () => {
    const oikeaSisalto = document.getElementById('oikeaSisalto');
    let current = '';

    // Jos scrollattu lähes sivun loppuun, merkitään viimeinen section aktiiviseksi
    const atBottom = oikeaSisalto.scrollTop + oikeaSisalto.clientHeight >= oikeaSisalto.scrollHeight - 50;
    
    if (atBottom) {
        current = sections[sections.length - 1].getAttribute('id');
    } else {

        // Etsitään mikä section näkyvissä
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (oikeaSisalto.scrollTop >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Mobiili välilehdet
document.querySelectorAll('#mobileTabs .nav-link').forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('#mobileTabs .nav-link').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});