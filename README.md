# StorageCraft

ChestCraft is een Minecraft-stijl webapp om opslagplekken en items te organiseren.
De app is momenteel een statische demo: gegevens en de gekozen spelersnaam worden
alleen in de lokale browser opgeslagen. Er zijn geen echte accounts, online database
of gedeelde community-storages. Browsergegevens wissen kan je opgeslagen demo-data
verwijderen.

## Online publiceren

De app bestaat uit statische HTML-, CSS- en JavaScript-bestanden en kan zonder
buildstap worden gehost:

1. Push de repository naar GitHub.
2. Open **Settings → Pages** in de repository.
3. Kies bij **Build and deployment** voor **Deploy from a branch**, selecteer
   `main` en de map `/ (root)`, en sla op.
4. Open de URL die GitHub Pages toont. De startpagina op `index.html` stuurt
   bezoekers door naar het dashboard.

Je kunt de bestanden ook uploaden naar een statische host zoals Netlify of Vercel;
gebruik de repository-root als publicatiemap.

## Beperkingen van de demo

- De spelersnaam is alleen een profielnaam op dit apparaat, geen account of login.
- Storages en items worden alleen in deze browser bewaard en zijn niet zichtbaar
  voor andere bezoekers.
- De openbaar/privé-schakelaar deelt gegevens niet online; community-items zijn
  voorbeeldgegevens.

Voor echte accounts en gegevens die tussen gebruikers of apparaten worden gedeeld,
moet eerst een backend met database en toegangsregels worden toegevoegd.
