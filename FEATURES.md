# Functionaliteiten

Dit document beschrijft geïmplementeerde functionaliteiten. Als een functionaliteit wordt verwijderd of teruggedraaid, blijft de beschrijving staan met de vermelding **verwijderd**. Als de functionaliteit terugkomt, wordt vermeld dat deze opnieuw aanwezig is. Geplande functies staan niet in dit overzicht.

## Mobiele app

- **Startscherm:** toont de naam RestForMore en een korte welkomsttekst. Gewijzigd: het welkomstscherm bevat een landschap en knoppen naar registratie en inloggen, met dag- en nachtweergave volgens de apparaatinstelling. **Gewijzigd:** automatische nachtweergave is verwijderd; de schermen gebruiken voorlopig alleen dagmodus. Het landschap past zich aan de beschikbare schermruimte aan en houdt de zon rond. **Gewijzigd:** de achtergrond onderaan gebruikte dezelfde lichte kleur als de andere schermen, met daarop aangepaste tekst en knop; de achtergrondkleur is daarna gewijzigd naar `#B8764A` en vervolgens naar donkerbruin `#603A24` met lichte tekst en knop.
- **Zon op het welkomstscherm:** de ringen bewegen langzaam groter en kleiner voor een subtiel gloei-effect. Bij de apparaatinstelling voor minder beweging blijven ze stilstaan; op de andere schermen bewegen ze niet. **Gewijzigd:** de ringen zijn beter zichtbaar en variëren sterker in grootte.
- **Accountknop op het welkomstscherm:** de achtergrond verandert subtiel van kleur bij hover of tijdens het indrukken. **Gewijzigd:** de achtergrondverandering is verwijderd; alleen de tekst verandert nu van kleur.
- **Voorbeeldteller:** een knop verhoogt de teller telkens met één. De waarde bestaat alleen zolang de app actief is en wordt niet opgeslagen. **Verwijderd** uit de mobiele app.
- **Registratiescherm:** bevat velden voor e-mailadres en wachtwoord, invoercontrole, wachtwoord zichtbaar maken en een link naar inloggen. Registratie zelf is nog niet gekoppeld aan een accountdienst. **Gewijzigd:** het scherm toont een zonsopgang en bevat een veld om het wachtwoord te herhalen, met controle of beide wachtwoorden overeenkomen. De lijnen rond de zon zijn later **verwijderd**.
- **Loginscherm:** bevat velden voor e-mailadres en wachtwoord, invoercontrole, wachtwoord zichtbaar maken, een link naar registratie en een melding bij wachtwoordherstel. Inloggen en wachtwoordherstel zijn nog niet gekoppeld aan een accountdienst. **Gewijzigd:** de zon staat hoger dan op het registratiescherm.
- **App-icoon:** de Expo-configuratie verwijst naar het RFM-logo als icoon voor een eigen app-build.

## Webvoorbeeld

- **Voorbeeldpagina:** de aanwezige React/Vite-startpagina toont afbeeldingen en links naar documentatie en communitypagina's van React en Vite.
- **Voorbeeldteller:** een knop verhoogt de teller telkens met één. De waarde wordt niet opgeslagen.

De huidige npm-scripts zijn gericht op de Expo-app; er is momenteel geen webstartscript geconfigureerd.
