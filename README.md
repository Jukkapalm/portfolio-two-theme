# Jukka Palm — Portfolio

Henkilökohtainen portfolio-sivusto joka esittelee osaamistani, projektejani
ja koulutustani.

🌐 **[jukkapekka.com](https://jukkapekka.com)**

---

## Ominaisuudet

- **Dual-teema** — Vaalea teema ja tummempi-teema (Duality-nappi)
- **AI-avustaja** — RAG-pohjainen tekoälybotti joka vastaa kysymyksiin minusta, projekteistani ja koulutuksestani. Botti vaihtaa "persoonallisuutta" valitun teeman mukaan.
- **Blogi** — PHP/MySQL-pohjainen blogi ohjelmoinnin mietteitä varten
- **Responsiivinen** — toimii mobiilissa ja desktopissa

---

## Teknologiat

### Frontend
- HTML, CSS, JavaScript
- Bootstrap (grid, responsiivisuus)
- Google Fonts: Syne, DM Sans, Chakra Petch, Orbitron, Share Tech Mono
- Devicons (teknologiaikonit)

### Backend
- PHP (REST API, blogi)
- MySQL / PDO (tietokanta)
- Python / Flask (AI API, Render-pilvipalvelimella)

### AI-botti (RAG-arkkitehtuuri)
- **ChromaDB** — vektoritietokanta semanttiseen hakuun
- **all-MiniLM-L6-v2** — embedding-malli (ajetaan lokaaliasti)
- **Groq API** — LLM-palvelu (Llama 3.3 70B)
- **Render.com** — Flask API:n hosting

---

## Rakenne

```
portfolio/
├── index.html          # Pääsivu
├── css/
│   ├── tyylit.css      # Oma CSS, dual-teema
│   └── bootstrap.min.css
├── js/
│   └── main.js         # Logiikka, teeman vaihto, AI-botti, blogi
└── api/
    ├── db_yhteys.php   # Tietokantayhteys (PDO)
    └── api.php         # REST API blogia varten
```

---

## AI-botin arkkitehtuuri
 
AI-botti on toteutettu RAG-arkkitehtuurilla (Retrieval-Augmented Generation):
 
1. Tekstitiedostot kirjoitetaan lokaaliasti `data/` kansioon
2. `ingest.py` lukee tiedostot, pilkkoo ne paloihin ja tallentaa vektorit ChromaDB-kantaan
3. Vektorikanta pushataan GitHubiin → päivittyy automaattisesti Renderiin
4. Käyttäjä kirjoittaa kysymyksen portfoliossa
5. JavaScript lähettää kysymyksen Flask API:lle
6. ChromaDB hakee semanttisesti lähimmät tekstipalat
7. Groq (Llama 3.3 70B) muodostaa vastauksen kontekstin perusteella
8. Vastaus palautuu käyttäjälle


AI-botti vaihtaa persoonaa teeman mukaan:
- **AI-avustaja** — ammattimainen, selkeä (vaalea teema)
- **Fixer** — ylimielinen, slangia käyttävä (tumma-teema)

RAG-ingest repo: [portfolio-rag-ingest](https://github.com/Jukkapalm/portfolio-rag-ingest)

---

## Blogi

Blogi käyttää PHP REST API:a ja MySQL-tietokantaa:
- `GET /api/api.php` — hakee merkinnät
- `POST /api/api.php` — tallentaa uuden merkinnän (PIN-suojattu)

---

## Tekijä

**Jukka Palm**
- GitHub: [github.com/Jukkapalm](https://github.com/Jukkapalm)
- LinkedIn: [linkedin.com/in/jukkapalm](https://linkedin.com/in/jukkapalm)