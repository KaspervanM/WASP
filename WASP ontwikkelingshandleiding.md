# WASP ontwikkelingshandleiding

## Node.js, NPM en Vue.js/CLI installatiehandleiding

### Vereisten

- Windows 7 of hoger.
- Administratorrechten

### Installatie Node.js en NPM

#### Stap 1: Het installatiebestand

Open een browser en ga naar `https://nodejs.org/en/download/`. Klik dan op de **Windows Installer** knop. Daarbij hoort automatisch het installatiebestand gedownload te worden.

#### Stap 2: De installatie

1. Start het installatiebestand. Deze kun je openen door onderin het scherm van de browser op het bestand te klikken of naar de **Downloads** folder op de pc te gaan.
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
2. Om de installatie te verifieren type je `vue --version`.

## Installatie andere programma's

Een ander programms dat nodig is, is TypeScript. Hiervoor wordt ook weer NPM gebruikt.

#### Typescript

1. Open een **command prompt** en typ in `npm i -g typescript`.
2. Om de installatie te verifieren type je `tsc -v`.
