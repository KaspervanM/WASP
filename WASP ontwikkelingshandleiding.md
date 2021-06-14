# WASP ontwikkelingshandleiding

## Installatiehandleiding

### Vereisten

- Windows 7 of hoger.
- Administratorrechten

### Installatie Node.js en NPM

#### Stap 1: Het installatiebestand

Open een browser en ga naar [deze website](https://nodejs.org/en/download/). Klik dan op de **Windows Installer** knop. Daarbij hoort automatisch het installatiebestand gedownload te worden.

#### Stap 2: De installatie

1. Start het installatiebestand. Deze kun je openen door onder in het scherm van de browser op het bestand te klikken of naar de **Downloads** folder op de pc te gaan.
2. Het systeem zal vragen om toestemming voor het Nodejs installatieprogramma om wijzigingen te maken op de pc. - klik op **ja**.
3. De Node.js Setup Wizard zal nu tevoorschijn komen - klik op **Next**.
4. Op het volgende scherm, lees de licentieovereenkomst door - klik op **Next** als je ermee akkoord gaat.
5. De volgende schermen zullen allerlei vragen stellen, maar tenzij je specifieke wensen hebt, houd ze op de standaard instellingen door te klikken op **Next** totdat er gevraagd wordt om te installeren.
6. Ten slotte, klik op de **Install** knop om het programma te installeren, wanneer het klaar is, klik op **Finish**.

#### Stap 3: Verificatie

Start een **command prompt** (of powershell) en voer uit: `$ node -v` en `$ npm -v`. Als er geen errors komen en de huidige versie van Node.js en npm laat zien, dan is de installatie succesvol verlopen.

Een **command prompt** open je door op de **windows** knop te drukken en te typen `cmd`. Druk dan op **Enter** of klik op de app die verschijnt.

### Installatie Vue.js Command-Line Interface

Omdat NPM al geïnstalleerd is, kan deze gebruikt worden om Vue.js/CLI te installeren. Voer hiervoor de volgende commando's uit:

1. Installatie: `$ npm i -y -g @vue/cli`.
2. Verificatie: `$ vue --version`.

### Installatie TypeScript

1. Installatie: `$ npm i -g typescript`.
2. Verificatie: `$ tsc -v`.

Voor het ontwikkelen gebruiken we Visual Studio Code samen met GitHub. Die moeten ook geïnstalleerd worden.

### Installatie Git for Windows

#### Stap 1: Het installatiebestand

Open een browser en ga naar [deze website](https://git-scm.com/download/win). Klik dan op de **Click here to download manually** knop. Daarbij hoort automatisch het installatiebestand gedownload te worden.

#### Stap 2: De installatie

1. Start het installatiebestand. Deze kun je openen door onder in het scherm van de browser op `Git-versie.exe` te klikken of naar de **Downloads** folder op de pc te gaan.
2. Het systeem zal vragen om toestemming voor het Git installatieprogramma om wijzigingen te maken op de pc. - klik op **ja**.
3. Lees de licentieovereenkomst door - klik op **Install** als je ermee akkoord gaat.
4. Ten slotte, wanneer het klaar is, klik op **Finish**.

#### Stap 3: Verificatie

Start een **command prompt** (of powershell) en voer uit: `$ git --version`. Als er geen errors komen en de huidige versie van Git laat zien, dan is de installatie succesvol verlopen.

### Installatie Visual Studio Code

#### Stap 1: Het installatiebestand

Open een browser en ga naar [deze website](https://code.visualstudio.com/download). Klik dan op de **Windows** knop. Daarbij hoort automatisch het installatiebestand gedownload te worden.

#### Stap 2: De installatie

1. Start het installatiebestand. Deze kun je openen door onder in het scherm van de browser op `VSCodeUserSetup-{versie}.exe` te klikken of naar de **Downloads** folder op de pc te gaan.
2. Lees de licentieovereenkomst door - klik op **I accept the agreement** en op **Next** als je ermee akkoord gaat.
3. Het volgende scherm zal allerlei vragen stellen, maar tenzij je specifieke wensen hebt, behoud de standaard instellingen door te klikken op **Next**.
4. Ten slotte, klik op de **Install** knop om het programma te installeren, wanneer het klaar is, klik op **Finish**.

#### Stap 3: Verificatie

Zoek in Windows startmenu naar `VSC`, klik dan op **Visual Studio Code**. Als VS Code zonder problemen opstart dan is de installatie gelukt.

#### Extensies

De volgende extensies moeten in Visual Studio Code worden geïnstalleerd. Dit kun je doen door te klikken op de extensie logo (of Ctrl+Shift+X) en dan de extensienaam te typen en vervolgens op **INSTALL** te klikken.

- `ESLint`
- `GitHub Pull Requests and Issues`
- `npm`
- `Prettier - Code formatter`
- `Vetur`

## Ontwikkelen

### Voorbereiding

#### GitHub-account

Wij ontwikkelen met Visual Studio Code en GitHub. Hiervoor is dus een GitHub-account nodig. Heb je die nog niet? Dan kan die op het volgende manier worden aangemaakt:

1. Ga naar [deze website](https://github.com/join).
2. Typ een gebruikersnaam, jouw e-mailadres, en een wachtwoord.
3. Kies **Sign up for GitHub**, en volg dan de instructies.

#### GitHub koppelen met VS Code

In VS Code moet de koppeling met GitHub worden gemaakt. Als de `Github Pull Requests and Issues` extensie is geïnstalleerd, moet je inloggen met GitHub. Volg de instructies om in de browser met GitHub in te loggen en ga dan terug in VS Code.

#### Git-account instellen

Voordat je aanpassingen in kunt voeren op de git repo moet er eerst aangegeven worden wie jij bent. Dit doe je door de volgende commando's uit te voeren:

1. `$ git config --global user.name "Your Name"`
2. `$ git config --global user.email "youremail@yourdomain.com"`

Gebruik nu de gebruikersnaam en het e-mailadres van jouw GitHub-account.
Het gebruik van een GPG sleutel is een mogelijkheid en is aanbevolen. De instructies voor het aanmaken van een GPG sleutel en het gebruiken hiervan is te vinden op [deze website](https://medium.com/@ryanmillerc/use-gpg-signing-keys-with-git-on-windows-10-github-4acbced49f68).

## Bijdragen aan WASP

### Kloneren van WASP

Je kunt door in **Source Control** op **Clone Repositry** te klikken het WASP Project kloneren.

### Aanmaken van branches

Als WASP is gekloneerd, dan kun je door links onderaan op de **Checkout Branch** knop (GitHub Branch Icoon (![GitHub Branch Icon](https://cdn0.iconfinder.com/data/icons/octicons/1024/git-branch-16.png)) met de _branch_ naam erachter) te klikken, de lijst van alle _branches_ zien. Als je dan op **+ Create new branch...** klikt, dan wordt er een nieuwe _branch_ aangemaakt met de lokale bestanden. Klik je op **+ Create new branch from...** , dan kun je een nieuwe _branch_ maken met de bestanden van een _branch_ die al online is .

### Source Control gebruiken

Als je veranderingen in een branch maakt, dan verschijnen deze in de **Source Control**. De Source Control kun je zien door in de zijbalk te klikken op de grote GitHub branch icoon (![GitHub Branch Icon](https://cdn0.iconfinder.com/data/icons/octicons/1024/git-branch-16.png)). Er verschijnt dan een tablad met de naam **Changes**.

Om van de veranderingen een _commit_ te maken, moet je eerst op de **Stage changes** knop klikken (een grote **+**). Dit zorgt ervoor dat de veranderingen mee worden genomen in de volgende _commit_. Om de _commit_ te maken typ je eerst een kort omschrijving van de veranderingen die je aanbrengt en klik je op het vinkje bovenaan bij **Source Control** of doe je **Ctrl+Enter**.

Je kunt van meerdere veranderingen tegelijk een _commit_ maken, maar zorg er wel voor dat iedere groep bij elkaar horende verandering hun eigen omschrijving krijgt.

### Synchroniseren van wijzigingen

Alle wijzigingen die nu ingevoerd worden, worden lokaal ingevoerd. Dit houdt in dat deze wijzigingen niet zichtbaar zijn op GitHub en dus ook niet voor andere ontwikkelaars. Om er voor te zorgen dat de wijzigingen die lokaal ingevoerd zijn ook ingevoerd worden op GitHub, moeten de wijzigingen gesynchroniseerd worden. Dit doe je door op **Synchronize Changes** te klikken in de balk onderaan het scherm naast de **Checkout Branch** knop.

**_Nota bene!_** Wijzigingen van andere ontwikkelaars die al met GitHub gesynchroniseerd hebben, synchroniseren niet automatich met jouw apparaat. Ook hiervoor gebruik je de **Synchronize Changes** knop. Als VSCode wijzigingen gevonden heeft, wordt dat aangegeven met pijlen in de knop. Controleer dus bij het opstarten of wijzigen van branch of er niet al wijzigingen zijn waardoor je achterloopt.

### De Server en Client opstarten

1. Server opstarten: `$ npm start`
2. Client opstarten: `$ npm run serve`

Vanaf dit punt is het mogelijk om lokale aanpassingen op de client en server te maken. Bovendien kunnen er nu pull requests worden ingediend om die veranderingen met master te samenvoegen. Hierbij verwachten we wel dat de _Issue_ en _Pull Request Templates_ worden gevolgd.

## Scrum methode

Wij gebruiken GitHub Projecs. Het projectbord is zo ingericht dat het bestaat uit de volgende statussen:

- een Backlog
- een To-do lijst
- een In progress lijst
- een Blocked lijst
- een Review lijst
- een Done lijst

### Algemeen

Dit bord werkt volgens een bepaald systeem. Hierbij voeren we taken uit in sprints (perioden) van twee weken. Het is dan de bedoeling dat alle taken binnen de sprint periode uitgevoerd worden zodat we kunnen focussen op wat wij op dat moment belangrijk vinden. De andere taken worden in de volgende sprint opgepakt.
Ook is het van belang dat tweemaal per week (donderdag en zondag) contact opnemen met elkaar om onze voortgang te bespreken: de stand-up. Dit geeft ons allen dan een goed beeld hoe ver iedereen is. Dit doen we dan via Google Meet. Deze meetings gaan niet over de inhoud, maar puur over de voortgang: wat we gaan doen, wat we hebben gedaan, wat niet lukte. Een oplossing zoeken voor eventuele problemen of Blocked taken gebeurt in een andere meeting, evt. aansluitend hierop, want de stand-up duurt maximaal vijf tot tien minuten.
Niets in deze methode staat vast, maar staat open voor verandering. Vandaar dat we aan het eind van iedere sprint ook een reflectie meeting hebben waarin we bespreken hoe we deze methode vinden en hoe we het zouden kunnen verbeteren: de retrospective.
Als je iets hebt gedaan aan een taak, meld dat dan in een comment of commit in de desbetreffende taak op het bord.

### De Backlog

Hierin stop je alles wat je kunt bedenken wat nog uitgevoerd moet worden: dingen voor nu, voor later, voor waar we nog niet eens aan begonnen zijn en alles daar tussen in. Iedere week worden de nieuwe backlog taken besproken in een meeting: de Backlog refinement. Hierbij wordt gekeken of de taken voor iedereen duidelijk en volledig zijn. Deze zullen dan gemarkeerd zijn als besproken met een blauw stipje (standaard hebben ze een groene).
Eens in de twee weken, aan het begin van iedere sprint, zullen we bespreken aan welke taken we die sprint zullen werken: de sprintplanning. Die worden dan in de To-do lijst gezet op volgorde van prioriteit. Mochten er taken van vorige sprint over zijn gebleven, dan zullen we bespreken hoe deze dan alsnog (gezamenlijk) afgemaakt kunnen worden.

### De To-do lijst

Hierin staan alle taken die we in een sprint gaan uitvoeren. Het is de bedoeling dat een taak wordt opgenomen door één persoon. Samenwerken mag uiteraard, maar de persoon die de taak opgenomen heeft is verantwoordelijk. Het oppakken van een taak houdt in:

- De taak op jouw naam zetten met Assign
- De taak slepen naar In progress
  Dit doe je pas als je er echt aan gaat beginnen. Pak altijd de bovenste taak uit de lijst, tenzij anders aangeduid.

### De In progress lijst

Hierin staan alle taken die op dat moment in behandeling zijn. Als je klaar bent met een taak sleep je deze naar:

- Review als er nog naar gekeken moet worden door iemand anders. Let wel op dat je dan jouw naam er vanaf haalt zodat iemand anders deze taak weer op kan pakken.
- Done als Review niet nodig is
  Als je niet verder kunt sleep je de taak naar:
- Blocked

### De Blocked lijst

Dit is waar alle taken in staan waarmee op dat moment geen voortgang meer gemaakt kan worden, maar ook niet Done zijn. Bespreek het met elkaar en als we er nog steeds niet uitkomen, laat de taak dan in Blocked zitten. In de sprint planning worden de taken die nog steeds in Blocked zitten weer besproken.

### De Review lijst

Deze lijst wordt gebruikt als je wil dat iemand jouw taak nog reviewt. Dit is altijd iemand die niet de taak heeft uitgevoerd. Samen reviewen kan natuurlijk ook.

### De Done lijst

Hierin staan alle taken die afgerond zijn.

### Kortom,

Ons team werk in sprints van twee weken. Voorafgaande de sprints bespreken we waar we de komende twee weken onze aandacht aan zullen besteden in de sprint planning. Na iedere sprint zullen we ook reflecteren over hoe we deze methode tot dan toe vinden en hoe we het zouden kunnen verbeteren in de retrospective. Daarnaast bespreken we iedere week de taken in de Backlog in de Backlog refinement. Ook zullen we om de één à twee dagen vijf tot tien minuten bijeen komen om onze voortgang te delen in de stand-up. Deze meetings zullen allen op Google Meet plaatsvinden.
In het bord zie je in een oogopslag de voortgang.
