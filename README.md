# RestForMore frontend

Een React Native-app met Expo en TypeScript voor Android en iOS.

## Starten

Installeer Node.js en de Expo Go-app op je telefoon. Open een terminal in de projectmap `code` en ga eerst naar de frontendmap:

```sh
cd restformore_frontend
npm install
npm start
```

De npm-commando's moeten vanuit `restformore_frontend` worden uitgevoerd: daar staat het `package.json` met de scripts. Zit je al in die map, dan kun je de `cd`-stap overslaan.

Scan de QR-code met Expo Go op Android of met de camera op iOS. Zorg dat je telefoon en computer op hetzelfde netwerk zitten. Je kunt ook `npm run android` gebruiken voor een Android-emulator of `npm run ios` voor een iOS-simulator (op macOS).

Krijg je na het installeren van een afhankelijkheid een HTTP 500 of een melding dat Metro een module niet kan vinden? Stop de draaiende Expo-server met `Ctrl+C` en start hem opnieuw met een schone cache:

```sh
npx expo start --clear
```

Open daarna de app opnieuw via de nieuwe QR-code.

Pas `App.tsx` aan om het startscherm te wijzigen. Controleer de TypeScript-code met `npm run typecheck`.

Een actueel overzicht van de aanwezige functionaliteiten staat in [FEATURES.md](./FEATURES.md).

## Schermen bekijken

Open op het welkomstscherm **Bekijk het hoofdscherm**. De onderste navigatie verbindt Thuis, Routine, Notificaties en Profiel. De plusknop bij **Mijn plannen** opent het planformulier. Via **Profiel** zijn de introvragen, instellingen, gegevens aanpassen, Over RFM en feedback bereikbaar. Kies **Nacht** in de instellingen voor de donkere weergave, of laat de app de apparaatinstelling volgen.

De schermen zijn uitgewerkt als React Native-componenten op basis van de ontwerpen in [src/assets](./src/assets). Plannen, profielwijzigingen, antwoorden en voorkeuren blijven alleen tijdens de huidige app-sessie bewaard. Accountdiensten, appblokkering, NFC, systeemherinneringen en feedback versturen zijn nog niet gekoppeld.

## Controleren

Gebruik Node.js 24 voor de controles:

```sh
npm run typecheck
npm test
```

De tests controleren planinvoer en de toewijzing van plannen aan routinedagen, inclusief plannen die over middernacht lopen.
