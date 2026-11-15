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

Pas `App.tsx` aan om het startscherm te wijzigen. Controleer de TypeScript-code met `npm run typecheck`.
