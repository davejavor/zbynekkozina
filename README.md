# zbynekkozina

Jednostránkový prezentační web finančního poradce.

Live: [zbynekkozina.cz](https://zbynekkozina.cz/)

---

## Technologie

| Technologie | Verze / poznámka |
|---|---|
| HTML5 | sémantické značky |
| CSS3 | Grid, Flexbox, CSS custom properties, `color-mix()` |
| Vanilla JavaScript | ES6+, bez frameworků |
| Google Fonts – Inter | wght 400;500;600;700;900 |
| Font Awesome | 6.4.0 (CDN) |

---

## Struktura souborů

```
├── index.html          # Hlavní stránka (one-page)
├── 404.html            # Chybová stránka 404
├── styles.css          # Veškeré styly
├── script.js           # Veškerý JavaScript
├── robots.txt          # Allow: /, odkaz na sitemap
├── sitemap.xml         # Sitemap s jednou URL
└── img/
    └── Header_Praha.webp   # Fotografie hero sekce
```

---

## Funkce

### HTML / struktura

- Sticky header s kontaktními údaji a navigací
- Hero sekce s fotkou Prahy na pozadí (`img/Header_Praha.webp`) a překryvným gradientem
- 6 karet služeb v CSS gridu (`auto-fit, minmax(300px, 1fr)`)
- 6 detailních sekcí služeb (každá s `info-box` a CTA tlačítkem)
- Sekce „O mně"
- Kontaktní sekce se třemi kartami (telefon, email, lokalita)
- Footer s rokem a odkazovými kontakty
- Tlačítko „Zpět nahoru" (fixní, pravý dolní roh)

### CSS

- CSS custom properties v `:root` (viz Barevné schéma níže)
- Fade-in animace hero prvků (tři úrovně zpoždění: 0 s, 0,3 s, 0,6 s)
- Scroll-animace karet přes `data-aos` atribut (řešeno v JS pomocí IntersectionObserver)
- Hover efekty na service-card: `translateY(-10px)`, zvýraznění `border-left`
- Hover efekt na service-icon: `scale(1.1) rotate(5deg)`
- Hover efekt na `.btn-primary`: `translateY(-3px)`, `color-mix()` box-shadow
- Header shrink při scrollu (třída `.scrolled`, padding 15 px → 8 px)
- `scroll-margin-top: 70px` na všech sekcích s `id` (kompenzace sticky headeru)
- Responzivní velikosti textu přes `clamp()` (hero title, hero subtitle)
- `scroll-behavior: smooth` na `html`

### JavaScript

- **Mobile menu toggle** – hamburger tlačítko zobrazí/skryje `.nav-links`, aktualizuje `aria-expanded`; po kliknutí na odkaz se menu zavře
- **Scroll-to-top tlačítko** – zobrazí se při `scrollY > 300`, kliknutím plynule skroluje na začátek stránky
- **Scroll animace** – `IntersectionObserver` na elementy s `[data-aos]`; při vstupu do viewportu nastaví `opacity: 1` a `translateY(0)`
- **Scroll handler** (throttlovaný přes `requestAnimationFrame`):
  - Přepíná třídu `.visible` na scroll-to-top tlačítku
  - Přepíná třídu `.scrolled` na headeru
  - Zvýrazňuje aktivní odkaz v navigaci (třída `.active`) podle aktuální sekce

---

## SEO

| Prvek | Implementace |
|---|---|
| `<title>` | Ano |
| `<meta name="description">` | Ano |
| Canonical | `<link rel="canonical" href="https://zbynekkozina.cz/">` |
| Open Graph | `og:title`, `og:description`, `og:type`, `og:url`, `og:locale` (og:image je zakomentované) |
| JSON-LD | `@type: FinancialService` – název, popis, URL, areaServed, parentOrganization, knowsAbout, priceRange |
| robots.txt | `Allow: /`, odkaz na sitemap |
| sitemap.xml | 1 URL (`https://zbynekkozina.cz/`), `lastmod` |
| Sémantické HTML | `<header>`, `<nav>`, `<section>`, `<footer>`, `aria-label`, `aria-hidden`, `aria-expanded` |

---

## Barevné schéma

```css
:root {
    --primary-color:   #1e3a5c;
    --primary-light:   #2563eb;
    --secondary-color: #d4af37;
    --secondary-hover: #e0b831;
    --accent-color:    #f8fafc;
    --text-dark:       #1f2937;
    --text-light:      #6b7280;
    --white:           #ffffff;
    --shadow:          0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg:       0 10px 25px rgba(0, 0, 0, 0.15);
}
```

---

## Responzivní breakpointy

| Breakpoint | Změny |
|---|---|
| `max-width: 768px` | Hamburger menu, single-column grid (služby, kontakt header), menší hero (500 px), `padding-left: 0` na nadpisech detailů |
| `max-width: 480px` | Menší padding tlačítka `.btn-primary`, menší padding `.service-card` |


# K dokončení – Inline SVG
Stáhneš 12 SVG souborů z fontawesome.com/icons (filtr: Free / Solid) a každý <i class="fas fa-..."> nahradíš inline <svg>.

## Příklad nahrazení:
    <!-- Dříve -->
    <i class="fas fa-phone" aria-hidden="true"></i>

    <!- - Inline SVG -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    <!-- path z staženého SVG souboru -->
    </svg>

    | Velikost| 0 KB externího zdroje – pouze pár stovek bytů inline |
    | HTTP requesty | 0 (žádný)
    | Stylování | fill: currentColor – barva se dědí z CSS
    | fa-2x | Nahradíš width: 2em; height: 2em přímo na SVG | 
    | Správa | Ruční – při změně ikony editovat HTML | 
    | Vhodné pro | 	Statický web jako tento | 