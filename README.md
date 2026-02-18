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
| Inline SVG ikony | Font Awesome 6 Free/Solid – cesty vloženy přímo do HTML, žádný CDN request |

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
    ├── Header_Praha.webp   # Fotografie hero sekce
    └── og-image.jpg        # ❌ CHYBÍ – viz K dokončení níže
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
| `<title>` | ✅ Ano |
| `<meta name="description">` | ✅ Ano |
| Canonical | ✅ `<link rel="canonical" href="https://zbynekkozina.cz/">` |
| Open Graph | ✅ `og:title`, `og:description`, `og:type`, `og:url`, `og:locale` |
| `og:image` | ❌ Zakomentované – soubor `img/og-image.jpg` neexistuje |
| Favicon | ⚠️ Dočasný inline SVG (kufřík, `#1e3a5c`) jako data URI – chybí `.ico` a `apple-touch-icon` |
| JSON-LD | ✅ `@type: FinancialService` – název, popis, URL, areaServed, parentOrganization, knowsAbout, priceRange |
| robots.txt | ✅ `Allow: /`, odkaz na sitemap |
| sitemap.xml | ✅ 1 URL (`https://zbynekkozina.cz/`), `lastmod` |
| Sémantické HTML | ✅ `<header>`, `<nav>`, `<section>`, `<footer>`, `aria-label`, `aria-hidden`, `aria-expanded` |
| Inline SVG ikony | ✅ Žádný CDN request pro Font Awesome |

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

---

## K dokončení

### 1. Favicon

**Aktuální stav:** V `<head>` je jako dočasný favicon použit inline SVG kufříku (Font Awesome, barva `#1e3a5c`) ve formátu data URI. Moderní prohlížeče jej zobrazí, ale chybí `.ico` pro starší prohlížeče a `apple-touch-icon.png` pro iOS (přidat na plochu).

**Co je potřeba vytvořit:**
Vytvořit sadu favicon souborů odpovídající značce webu a vložit je do `<head>` namísto současného data URI.

**Požadavky:**
| Soubor | Rozměr | Použití |
|---|---|---|
| `favicon.ico` | 16×16, 32×32 (multi-size) | Starší prohlížeče, záložky |
| `favicon.svg` | Vektorový | Moderní prohlížeče – ostrý na všech DPI |
| `apple-touch-icon.png` | 180×180 px | iOS – přidat na plochu |

**Návrh zadání:**
- Styl: jednoduché, profesionální – odpovídá finančnímu sektoru
- Barvy: primární `#1e3a5c` (tmavě modrá) nebo `#d4af37` (zlatá) na světlém či průhledném pozadí
- Motiv: iniciály **ZK** v čistém sans-serif písmu, nebo stylizovaný symbol (domeček + graf, štít, mince)
- Žádné emoji

**Kód pro `<head>` po dokončení:**
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

---

### 2. og:image (Open Graph obrázek)

> Kdykoli někdo sdílí odkaz na web (na Facebooku, LinkedIn, WhatsApp nebo e-mailem), sociální síť automaticky stáhne tento obrázek a zobrazí ho jako náhled vedle nadpisu a popisu. Bez něj se buď neukáže nic, nebo si platforma náhodně vybere nějaký obrázek ze stránky.

**Aktuální stav:** Meta tag `og:image` je v `<head>` zakomentovaný, soubor neexistuje. Při sdílení odkazu na sociálních sítích se nezobrazí žádný náhledový obrázek.

**Co je potřeba vytvořit:**

Grafický soubor `img/og-image.jpg` a odkomentovat příslušný meta tag v `index.html`.

**Technické požadavky:**

| Parametr | Hodnota |
|---|---|
| Formát | JPG (nebo WebP s JPG fallbackem) |
| Rozměry | 1200 × 630 px |
| Velikost souboru | max. 300 KB |
| URL v meta tagu | `https://zbynekkozina.cz/img/og-image.jpg` |

**Návrh zadání:**
- Styl: profesionální, odpovídá finanční branži, ladí s barevným schématem webu
- Pozadí: tmavě modrá `#1e3a5c` nebo fotografie Prahy s tmavým překryvem
- Obsah:
  - Jméno: **Ing. Zbyněk Kožina**
  - Popis: **Finanční a hypoteční poradce Praha**
  - Volitelně: logo Swiss Life Select, nebo webová adresa `zbynekkozina.cz`
- Zlatý akcent `#d4af37` pro zvýraznění (linka, podtržení nadpisu apod.)

**Kód pro `index.html` po dokončení** (odkomentovat a doplnit URL):
```html
<meta property="og:image" content="https://zbynekkozina.cz/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Ing. Zbyněk Kožina – Finanční a hypoteční poradce Praha">
```
