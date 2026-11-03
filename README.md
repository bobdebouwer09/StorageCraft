# StorageCraft

ChestCraft is een Minecraft-stijl webapp om opslagplekken en items te organiseren.
De website gebruikt Supabase Auth voor accounts en Supabase Database voor storages.
Alleen openbare storages worden zichtbaar in de community; die kunnen andere
gebruikers bekijken maar niet aanpassen.

## Online publiceren

De app bestaat uit statische HTML-, CSS- en JavaScript-bestanden en kan zonder buildstap
op GitHub Pages worden gehost:

1. Voer [`supabase/schema.sql`](./supabase/schema.sql) uit in de Supabase SQL Editor.
2. Controleer in Supabase **Authentication → URL Configuration**:
   - Site URL: `https://bobdebouwer09.github.io/StorageCraft/`
   - Voeg `https://bobdebouwer09.github.io/StorageCraft/info.html/startpagina.html`
     toe aan de toegestane Redirect URLs.
3. Controleer dat `info.html/supabase-config.js` de juiste Project URL en
   publishable key bevat. De publishable key is bedoeld voor gebruik in de browser;
   zet nooit een `secret`- of `service_role`-key in deze repository.
4. Push de repository naar GitHub. Kies in **Settings → Pages** voor **Deploy from a
   branch**, selecteer `main` en de map `/ (root)`.
5. Open `https://bobdebouwer09.github.io/StorageCraft/`.

Bij ingeschakelde e-mailbevestiging moet een nieuwe gebruiker eerst de bevestigingsmail
openen voordat die kan inloggen. Voor productie is het verstandig een eigen SMTP-provider
en passende privacy-informatie in te stellen.

## Beveiliging en gegevens

- De tabellen gebruiken Row Level Security (RLS). Voer het schema uit voordat je
  accounts laat registreren.
- Gebruikers kunnen alleen hun eigen storages toevoegen, aanpassen en verwijderen.
  Andere ingelogde gebruikers kunnen uitsluitend storages lezen die openbaar zijn.
- E-mailadressen zijn niet publiek beschikbaar; de community toont de profielnaam.
- Bij de eerste login kan een gebruiker desgewenst bestaande lokale demo-storages
  importeren. Geïmporteerde storages worden standaard privé ingesteld.

De bestaande demo-inhoud wordt niet automatisch publiek gemaakt. Test privacy en
accountbevestiging voordat je de app breder aankondigt.
