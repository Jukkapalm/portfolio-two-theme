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
        // Palautetaan desktop näkymä jos ikkuna levenee yli mobiilikokojen
        if (window.innerWidth >= 768) {
            document.getElementById('mainContent').style.display = 'block';
            document.getElementById('mobiiliBlogi').style.display = 'none';
            document.getElementById('mobiiliFixer').style.display = 'none';
        }
    });
}

initNeuralNetwork();

// Teeman vaihto button
const toggleBtn = document.querySelectorAll('.theme-toggle-btn');

toggleBtn.forEach(btn => {
    btn.addEventListener('click', () => {

        // Pysäytetään typewriter heti napin painalluksesta
        if (typeWriterTimer) {
            clearInterval(typeWriterTimer);
            typeWriterTimer = null;
        }
        document.getElementById('bottiAloitusViesti').textContent = '';

        const isCyber = document.documentElement.getAttribute('data-theme') === 'cyberpunk';
        const palkki = document.getElementById('teemaPalkki');

        // Asetetaan palkin väri teeman mukaan
        palkki.className = 'teema-palkki';
        palkki.classList.add(isCyber ? 'default-in' : 'cyber-in');

        // Käynnistetään teeman vaihto palkki
        requestAnimationFrame(() => {
            palkki.classList.add('aktiivinen');
        });

        // Vaihdetaan teema palkin ollessa ruudulla
        setTimeout(() => {

            const aiTab = document.querySelector('#mobileTabs .nav-link[data-tab="ai"]');

            if (isCyber) {
                // Vaihdetaan default teema
                document.documentElement.removeAttribute('data-theme');
                node_color = 'rgba(0, 168, 120,';
                line_color = 'rgba(0, 168, 120,';
                toggleBtn.forEach(b => b.textContent = 'Duality');
                document.getElementById('bottiAloitusViesti').textContent = 'Hei! Olen AI-avustaja, kuinka voin auttaa? Voin vastata Jukan portfolioon ja projekteihin liittyviin kysymyksiin.';
                document.getElementById('bottiAloitusViestiMobiili').textContent = 'Hei! Olen AI-avustaja, kuinka voin auttaa? Voin vastata Jukan portfolioon ja projekteihin liittyviin kysymyksiin.';
                document.getElementById('bottiNimi').textContent = 'AI-avustaja';
                document.getElementById('bottiEmoji').textContent = '🤖';
                document.getElementById('bottiNimiMobiili').textContent = 'AI-avustaja';
                document.getElementById('bottiEmojiMobiili').textContent = '🤖';
                if (aiTab) aiTab.textContent = 'AI';
            } else {
                // Vaihdetaan cyberpunk teema
                document.documentElement.setAttribute('data-theme', 'cyberpunk');
                node_color = 'rgba(0, 255, 238,';
                line_color = 'rgba(0, 255, 238,';
                toggleBtn.forEach(b => b.textContent = 'Duality');
                document.getElementById('bottiAloitusViestiMobiili').textContent = 'Jälleen yksi ihminen jolle pitää alkaa portfoliosta tai projekteista selittämään, minulla olisi muutakin tekemistä. Mitä haluat?';
                document.getElementById('bottiNimi').textContent = 'Fixer';
                document.getElementById('bottiNimiMobiili').textContent = 'Fixer';
                document.getElementById('bottiEmoji').textContent = '⚡';
                document.getElementById('bottiEmojiMobiili').textContent = '⚡';
                document.getElementById('bottiAloitusViesti').textContent = '';
                if (aiTab) aiTab.textContent = 'Fixer';
            }
        }, 400);

        // Palkki liukuu ulos ja käynnistetään typewriter
        setTimeout(() => {
            palkki.classList.add('poistu');
            setTimeout(() => {
                palkki.className = 'teema-palkki';
        
                // Typewriter vasta kun palkki on poistunut
                if (isCyber) {
                    typeWriter('bottiAloitusViesti', 'Hei! Olen AI-avustaja, kuinka voin auttaa? Voin vastata Jukan portfolioon ja projekteihin liittyviin kysymyksiin.');
                } else {
                    typeWriter('bottiAloitusViesti', 'Jälleen yksi ihminen jolle pitää alkaa portfoliosta tai projekteista selittämään, minulla olisi muutakin tekemistä. Mitä haluat?', 40);
                }
            }, 400);
        }, 500);
    });
});

// Navigaatio ja sectionit
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

// Navigaatio linkkien scroll kun navigaatio linkkiä klikataan
// Paitsi jos Admin linkkiä painetaan
document.querySelectorAll('.nav-link[href^="#"]:not(#adminLink)').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        const oikeaSisalto = document.getElementById('oikeaSisalto');
        if (target && oikeaSisalto) {
            const offset = window.innerWidth < 768 ? 100 : 20;
            oikeaSisalto.scrollTo({
                top: target.offsetTop - offset,
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
// Profiili / Blogi / AI/Fixer
document.querySelectorAll('#mobileTabs .nav-link').forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('#mobileTabs .nav-link').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const valittu = tab.getAttribute('data-tab');

        // Piilotetaan kaikki ensin
        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('mobiiliBlogi').style.display = 'none';
        document.getElementById('mobiiliFixer').style.display = 'none';

        // Näytetään valittu välilehti
        if (valittu === 'profiili') document.getElementById('mainContent').style.display = 'block';
        if (valittu === 'blogi') document.getElementById('mobiiliBlogi').style.display = 'block';
        if (valittu === 'ai') document.getElementById('mobiiliFixer').style.display = 'block';
    });
});

// Admin linkki avaa modalin
document.getElementById('adminLink').addEventListener('click', (e) => {
    e.preventDefault();
    adminModal.style.display = 'flex';
});

// Peruuta sulkee modalin
document.getElementById('adminSulje').addEventListener('click', () => {
    adminModal.style.display = 'none';
    document.getElementById('adminTeksti').value = '';
    document.getElementById('adminPin').value = '';
});

// Klikkaus myös modalin ulkopuolella sulkee sen
adminModal.addEventListener('click', (e) => {
    if (e.target === adminModal) {
        adminModal.style.display = 'none';
        document.getElementById('adminTeksti').value = '';
        document.getElementById('adminPin').value = '';
    }
});

// Haetaan merkinnät tietokannasta sivun latautuessa
function haeBlogiMerkinnat() {
    fetch('api/api.php')
        .then(res => res.json())
        .then(merkinnat => {
            const feed = document.getElementById('blogi-feed');
            const mobiiliFeed = document.getElementById('mobiili-blogi-feed');

            // Tyhjennetään feed ennen päivitystä
            feed.innerHTML = '';
            if (mobiiliFeed) mobiiliFeed.innerHTML = '';

            if (merkinnat.length === 0) {
                feed.innerHTML = '<p class="blogi-text">Ei merkintöjä vielä.</p>';
                if (mobiiliFeed) mobiiliFeed.innerHTML = '<p class="blogi-text">Ei merkintöjä vielä.</p>';
                return;
            }

            merkinnat.forEach(merkinta => {
                const kortti = luoBlogiKortti(merkinta);
                feed.appendChild(kortti.cloneNode(true));
                if (mobiiliFeed) mobiiliFeed.appendChild(kortti);
            });
        })
        .catch(err => {
            console.error('Virhe haettaessa merkintöjä:', err);
        });
}

// Luo yhden blogikortin HTML elementtinä
function luoBlogiKortti(merkinta) {
    const kortti = document.createElement('div');
    kortti.className = 'blogi-kortti';

    // Näytetään vain päivämäärä kellonajasta
    const pvm = new Date(merkinta.created_at);
    const pvmTeksti = pvm.toLocaleDateString('fi-FI');

    kortti.innerHTML = `
        <p class="blogi-pvm">${pvmTeksti}</p>
        <p class="blogi-text">${merkinta.merkinta}</p>
    `;

    return kortti;
}

// Tallennetaan merkintä kun admin modal tallenna nappia painetaan
document.getElementById('adminTallenna').addEventListener('click', () => {
    const teksti = document.getElementById('adminTeksti').value.trim();
    const pin = document.getElementById('adminPin').value.trim();

    if (!teksti) {
        alert('Kirjoita merkintä ensin.');
        return;
    }

    if (!pin) {
        alert('Anna PIN-koodi.');
        return;
    }

    fetch('api/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merkinta: teksti, pin: pin })
    })
    .then(res => res.json())
    .then(data => {
        if (data.ok) {

            // Suljetaan modal ja tyhjennetään kentät
            document.getElementById('adminModal').style.display = 'none';
            document.getElementById('adminTeksti').value = '';
            document.getElementById('adminPin').value = '';

            // Päivitetään blogi feed
            haeBlogiMerkinnat();
        } else {
            alert('Virhe: ' + data.virhe);
        }
    })
    .catch(err => {
        console.error('Virhe tallennuksessa:', err);
        alert('Tallennus epäonnistui.');
    });
});

// Haetaan merkinnät sivun latautuessa
haeBlogiMerkinnat();

// Typewriter kirjoitus
let typeWriterTimer = null;

function typeWriter(elementId, teksti, nopeus = 30) {
    if (typeWriterTimer) clearInterval(typeWriterTimer);
    const el = document.getElementById(elementId);
    el.textContent = '';
    let i = 0;
    typeWriterTimer = setInterval(() => {
        el.textContent += teksti[i];
        i++;
        if (i >= teksti.length) {
            clearInterval(typeWriterTimer);
            typeWriterTimer = null;
        }
    }, nopeus);
}

// Käynnistetään typewriter sivun latautuessa
typeWriter('bottiAloitusViesti', 'Hei! Olen AI-avustaja, kuinka voin auttaa? Voin vastata Jukan portfolioon ja projekteihin liittyviin kysymyksiin.');

// RAG-tekoäly botti
// Lähettää kysymyksen Flask backendille ja
// näyttää vastauksen botti-alueella
const RENDER_URL = 'https://portfolio-rag-9qi2.onrender.com';

function lahetaKysymys(inputId, vastausId) {
    const input = document.getElementById(inputId);
    const kysymys = input.value.trim();

    if (!kysymys) return;

    const teema = document.documentElement.getAttribute('data-theme') === 'cyberpunk' ? 'cyberpunk' : 'default';
    const vastausEl = document.getElementById(vastausId);

    // Näytetään latausviesti
    vastausEl.textContent = '...';
    input.value = '';
    input.disabled = true;

    fetch(`${RENDER_URL}/kysy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kysymys, teema })
    })
    .then(res => res.json())
    .then(data => {
        if (data.vastaus) {
            vastausEl.textContent = data.vastaus;
        } else {
            vastausEl.textContent = 'Virhe: ' + (data.virhe || 'Tuntematon virhe');
        }
        input.disabled = false;
    })
    .catch(() => {
        vastausEl.textContent = 'Yhteysvirhe - yritä uudelleen.';
        input.disabled = false;
    });
}

// Desktop botti
document.getElementById('bottiLaheta').addEventListener('click', () => {
    lahetaKysymys('bottiInput', 'bottiAloitusViesti');
});

document.getElementById('bottiInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') lahetaKysymys('bottiInput', 'bottiAloitusViesti');
});

// Mobiili botti
document.getElementById('bottiLahetaMobiili').addEventListener('click', () => {
    lahetaKysymys('bottiInputMobiili', 'bottiAloitusViestiMobiili');
});

document.getElementById('bottiInputMobiili').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') lahetaKysymys('bottiInputMobiili', 'bottiAloitusViestiMobiili');
});