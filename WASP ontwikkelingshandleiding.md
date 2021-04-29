# WASP ontwikkelingshandleiding

## Node.js, NPM en Vue.js/CLI installatiehandleiding

### Vereisten

- Windows 7 of hoger.
- Administratorrechten

### Installatie Node.js en NPM

#### Stap 1: Het installatiebestand

Open een browser en ga naar `https://nodejs.org/en/download/`. Klik dan op de **Windows Installer** knop. Daarbij hoort automatisch het installatiebestand gedownload te worden.

#### Stap 2: De installatie

1. Start het installatiebestand. Deze kun je openen door onder in het scherm van de browser op het bestand te klikken of naar de **Downloads** folder op de pc te gaan.
2. Het systeem zal vragen om toestemming voor het Nodejs installatieprogramma om wijzigingen te maken op de pc. - klik op **ja**.
3. De Node.js Setup Wizard zal nu tevoorschijn komen - klik op **Next**.
4. Op het volgende scherm, lees de licentieovereenkomst door - klik op **Next** als je ermee akkoord gaat.
5. De volgende schermen zullen allerlei vragen stellen, maar tenzij je specifieke wensen hebt, houd ze op de standaard instellingen door te klikken op **Next** totdat er gevraagd wordt om te installeren.
6. Ten slotte, klik op de **Install** knop om het programma te installeren, wanneer het klaar is, klik op **Finish**.

#### Stap 3: Verificatie

Start een **command prompt** (of powershell) en typ `node -v` en `npm -v`. Als er geen errors komen en de huidige versie van Node.js en npm laat zien, dan is de installatie succesvol verlopen.

Een **command prompt** open je door op de **windows** knop te drukken en te typen `cmd`. Druk dan op **Enter** of klik op de app die verschijnt.

### Installatie Vue.js Command-Line Interface

Omdat NPM al geïnstalleerd is, kan deze gebruikt worden om Vue.js/CLI te installeren.

1. Open een **command prompt** en typ in `npm i -y -g @vue/cli`.
2. Om de installatie te verifiëren type je `vue --version`.

## Installatie andere programma's

Een ander programma dat nodig is, is TypeScript. Hiervoor wordt ook weer NPM gebruikt.

### TypeScript

1. Open een **command prompt** en typ in `npm i -g typescript`.
2. Om de installatie te verifiëren type je `tsc -v`.

Voor het ontwikkelen gebruiken we Visual Studio Code samen met GitHub. Die moeten ook geïnstalleerd worden.

## Visual Studio Code

### Installatie

#### Stap 1: Het installatiebestand

Open een browser en ga naar `https://code.visualstudio.com/download`. Klik dan op de **Windows** knop. Daarbij hoort automatisch het installatiebestand gedownload te worden.

#### Stap 2: De installatie

1. Start het installatiebestand. Deze kun je openen door onder in het scherm van de browser op `VSCodeUserSetup-{versie}.exe` te klikken of naar de **Downloads** folder op de pc te gaan.
2. Lees de licentieovereenkomst door - klik op **I accept the agreement** en op **Next** als je ermee akkoord gaat.
3. Het volgende scherm zal allerlei vragen stellen, maar tenzij je specifieke wensen hebt, behoud de standaard instellingen door te klikken op **Next**.
4. Ten slotte, klik op de **Install** knop om het programma te installeren, wanneer het klaar is, klik op **Finish**.

#### Stap 3: Verificatie

Zoek in Windows startmenu naar `VSC`, klik dan op **Visual Studio Code**. Als VS Code zonder problemen opstart dan is de installatie gelukt.

### Extensies

De volgende extensies moeten in Visual Studio Code worden geïnstalleerd. Dit kun je doen door te klikken op de extensie logo (of Ctrl+Shift+X) en dan de extensienaam te typen en vervolgens op **INSTALL** te klikken.

- `ESLint`
- `GitHub Pull Requests and Issues`
- `npm`
- `Prettier - Code formatter`
- `Vetur`

## Ontwikkelen

Wij ontwikkelen met Visual Studio Code en GitHub. Hiervoor is dus een GitHub account nodig. Die kan op het volgende manier worden aangemaakt:

1. Ga naar `https://github.com/join`.
2. Typ een gebruikersnaam, jouw email adres, en een wachtwoord.
3. Kies **Sign up for GitHub**, en volg dan de instructies.

In VS Code moet de koppeling met GitHub worden gemaakt. Als de `Github Pull Requests and Issues` extensie is geïnstalleerd, moet je inloggen met GitHub. Volg de instructies om in de browser met GitHub in te loggen en ga dan terug in VS Code.

Nu kun je door in **Source Control** op **Clone Repositry** te klikken het WASP Project kloneren.

Vanaf dit punt is het mogelijk om lokale aanpassingen op de client en server te maken. Bovendien kunnen er nu pull requests worden ingediend om die veranderingen met master te samenvoegen. Hierbij verwachten we wel dat de _Issue_ en _Pull Request Templates_ worden gevolgd.
