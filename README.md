# 🔧 Rendszerfejlesztés karbantartó app 🔧

## **🗿 Backend 🗿**

<sup>szentedaniel</sup>
[![szentedaniel](https://wakatime.com/badge/github/szentedaniel/rendszerfejlesztes-karbantarto-app.svg)](https://wakatime.com/badge/github/szentedaniel/rendszerfejlesztes-karbantarto-app)

---

### 💾 Telepítés 💾

```bash
gh repo clone szentedaniel/rendszerfejlesztes-karbantarto-app

cd server

npm install

npm run setup

npm run start
```

`npm install` - Telepíti a szükséges csomagokat.

`npm run setup` - Létrehozza az adatbázist és feltölti a szükséges adatokkal.

`npm run start` - Elindítja a szervert.

Ezt követően a `http://localhost:3000` címen érjük el a szervert.

API dokumentációt pedig a `http://localhost:3000/api-docs` oldalon láthatjuk.

### 📚 Tartalomjegyzék 📚

- [🔧 Rendszerfejlesztés karbantartó app 🔧](#-rendszerfejlesztés-karbantartó-app-)
  - [**🗿 Backend 🗿**](#-backend-)
    - [💾 Telepítés 💾](#-telepítés-)
    - [📚 Tartalomjegyzék 📚](#-tartalomjegyzék-)
    - [🗂 Architektúra 🗂](#-architektúra-)
    - [💿 Használt technológiák 💿](#-használt-technológiák-)
    - [🏆 Mérföldkövek 🏆](#-mérföldkövek-)

### 🗂 Architektúra 🗂

<p align="center">
  <img src="https://c.tenor.com/mUXqG0h_G70AAAAC/spongebob-patrick-star.gif" width="700">
</p>

### 💿 Használt technológiák 💿

|   Mire    |                                                                                Mit                                                                                 |                 Link                 |
| :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------: |
| Language  |  <a href="https://www.typescriptlang.org/"><img width=50px src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.jeremylikness.com%2Fblog%2F2019-03-05_typescript-for-javascript-developers-by-refactoring-part-1-of-2%2Fimages%2F1.jpeg&f=1&nofb=1"></a>   |  [TypeScript](https://www.typescriptlang.org/)   |
| Database  |  <a href="https://sqlite.org/index.html"><img width=50px src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.file-extensions.org%2Fimgs%2Fapp-icon%2F128%2F5236%2Fsqlite-icon.png&f=1&nofb=1"></a>   |  [SQLite](https://sqlite.org/index.html)   |
| ORM  |  <a href="https://www.prisma.io/"><img width=50px src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzenprospect-production.s3.amazonaws.com%2Fuploads%2Fpictures%2F5ede203691c4ab00012b1f1f%2Fpicture&f=1&nofb=1"></a>   |  [Prisma](https://www.prisma.io/)   |
| Engine  |  <a href="https://nodejs.org/en/"><img width=50px src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-sqAjIvOtpXI%2FXYoCmqOyMwI%2FAAAAAAAAJig%2FCowR8wgEauEs-RXN2IPmLYkC7NHoHuA3gCLcBGAsYHQ%2Fs1600%2Fnode-js-logo.png&f=1&nofb=1"></a>   |  [Node.js](https://nodejs.org/en/)   |
|  Routing  |   <a href="https://expressjs.com/"><img width=50 src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhackersandslackers-cdn.storage.googleapis.com%2F2020%2F05%2Fexpress.png&f=1&nofb=1"></a>    | [Express.js](https://expressjs.com/) |
| API Testing |    <a href="https://www.postman.com/"><img width=50px src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.scottlogic.com%2Fmmcalroy%2Fassets%2FpostmanLogo.png&f=1&nofb=1"></a>     |   [Postman](https://www.postman.com/)   |
| API Documentation |    <a href="https://swagger.io/"><img width=50px src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fseeklogo.com%2Fimages%2FS%2Fswagger-logo-A49F73BAF4-seeklogo.com.png&f=1&nofb=1"></a>     |   [Swagger](https://swagger.io/)   |

### 🏆 Mérföldkövek 🏆

&nbsp;

**1. Mérföldkő:**

- [x] *a,(Szente, Flórián)* A rendszer adatmodelljének megtervezése és előállítása
- [x] *b,(Szente)* A rendszer architektúrájának megtervezése
- [x] *c,(Szente)* Felhasználók beléptetése (regisztráció nincs, adminisztrátor adja hozzá az
embereket)
- [x] *d,(Szente)* Eszköz kategóriák felvétele, hierarchiába rendezése
- [x] *e,(Szente)* Eszközök rögzítése (azonosító, név, helyszín, kategóriába sorolás)
- [x] *f,(Flórián)* Végzettségek felvétele és eszköz kategóriákhoz rendelése

&nbsp;

**2. Mérföldkő:**

- [x] *a,(Szente)* Eszköz kategóriához normaidők és karbantartási periódus rögzítése
- [ ] *b,(Flórián)* Eszköz kategóriához a karbantartásra vonatkozó instrukciók rögzítése
- [x] *c,(Szente)* Karbantartók felvétele a rendszerbe
- [ ] *d,(Flórián)* Végzettségek karbantartóhoz rendelése
- [ ] *e,(Flórián)* Rendkívüli karbantartási feladatok rögzítése a rendszerbe (eszköz, időpont,
hiba leírása)
- [ ] *f,(Szente)* Időszakos karbantartási feladatok automatikus generálása (utolsó
karbantartás és karbantartási periódus alapján)
- [ ] *g,(Flórián)* Feladatok listázása, állapotok megjelenítése

&nbsp;

**3. Mérföldkő:**

- [ ] *a,(Szente)* Feladatok kiosztása karbantartók számára (manuális hozzárendelés a
végzettség egyeztetésével, automatikus megvalósítás opcionális)
- [ ] *b,(Flórián)* Az adott karbantartóhoz rendelt feladatok listázása
- [ ] *c,(Flórián)* Állapotok beállításának lehetősége (Elfogadva, Elutasítva, Megkezdve,
Befejezve)
- [ ] *d,(Backend szempontjából nem releváns)* ~Megkezdve állapotban az instrukciók megjelenítése~
