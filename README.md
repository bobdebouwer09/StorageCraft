# StorageCraft

ChestCraft is een Minecraft-stijl webapp om opslagplekken en items te organiseren.
De website gebruikt Supabase Auth voor accounts en Supabase Database voor storages.
Alleen openbare storages worden zichtbaar in de community; die kunnen andere
gebruikers bekijken maar niet aanpassen.

## Online publiceren

De app bestaat uit statische HTML-, CSS- en JavaScript-bestanden en kan zonder buildstap
op GitHub Pages worden gehost:

1. Voer [`supabase/schema.sql`](./supabase/schema.sql) uit in de Supabase SQL Editor.
   Voer dit opnieuw uit na schema-updates; het script is herhaalbaar.
2. Deploy [`supabase/functions/login-with-username/index.ts`](./supabase/functions/login-with-username/index.ts)
   als een Supabase Edge Function met de naam `login-with-username`. Zet **Verify JWT**
   uit voor deze ene functie; de functie verwerkt anonieme login-verzoeken en laat
   wachtwoorden alleen door Supabase Auth controleren. De Supabase server environment
   moet `SUPABASE_URL`, `SUPABASE_ANON_KEY` en `SUPABASE_SERVICE_ROLE_KEY` bevatten.
   De service-role-key blijft uitsluitend in de Edge Function environment en hoort
   nooit in de websitecode.
3. Controleer in Supabase **Authentication → URL Configuration**:
   - Site URL: `https://bobdebouwer09.github.io/StorageCraft/`
   - Voeg `https://bobdebouwer09.github.io/StorageCraft/info.html/startpagina.html`
     toe aan de toegestane Redirect URLs.
4. Controleer dat `info.html/supabase-config.js` de juiste Project URL en
   publishable key bevat. De publishable key is bedoeld voor gebruik in de browser;
   zet nooit een `secret`- of `service_role`-key in deze repository.
5. Push de repository naar GitHub. Kies in **Settings → Pages** voor **Deploy from a
   branch**, selecteer `main` en de map `/ (root)`.
6. Open `https://bobdebouwer09.github.io/StorageCraft/`.

Bij ingeschakelde e-mailbevestiging moet een nieuwe gebruiker eerst de bevestigingsmail
openen voordat die kan inloggen. Voor productie is het verstandig een eigen SMTP-provider
en passende privacy-informatie in te stellen.

## Beveiliging en gegevens

- De tabellen gebruiken Row Level Security (RLS). Voer het schema uit voordat je
  accounts laat registreren.
- Gebruikers kunnen alleen hun eigen storages toevoegen, aanpassen en verwijderen.
  Andere ingelogde gebruikers kunnen uitsluitend storages lezen die openbaar zijn.
- E-mailadressen zijn niet publiek beschikbaar; de community toont de profielnaam.
- Gebruikersnamen zijn uniek en kunnen worden gebruikt om in te loggen. E-mail-login
  blijft beschikbaar voor bestaande accounts.
- Wachtwoordherstel verloopt via een reset-link naar het e-mailadres van het account.
- Bij de eerste login kan een gebruiker desgewenst bestaande lokale demo-storages
  importeren. Geïmporteerde storages worden standaard privé ingesteld.

De bestaande demo-inhoud wordt niet automatisch publiek gemaakt. Test privacy en
accountbevestiging voordat je de app breder aankondigt.
