# PRG08 tentamen

## Fenton!

Fenton de hond heeft als taak om de schaapjes in het weiland naar de voederplek te jagen.

## Opdracht

- Lees de [Toetsinstructie PDF](fenton_2018_2019_instructie.pdf) goed door.
- Vergeet niet om Typescript te compileren naar Javascript met CMD/CTRL+SHIFT+B (watch mode)
- Lever het project in als zip bestand op N@Tschool, inclusief ingevuld inleverdocument.

# Inleverdocument

## OOP Fundamentals

Beschrijf waar en waarom je code gebruik maakt van Inheritance, Composition en Encapsulation.

---

###Inheritance
Alle game objecten lijken op bepaalde punten op elkaar. Hierom heb ik een GameObject klasse gemaakt die de overeenkomsten en dus de dubbele code voorkomt. Sheep, Wolf en Fenton extenden deze klasse.

###Composition
Om er voor te zorgen dat de schapen weten waar fenton is, kunnen in Sheep een parameter meegeven. In Game maken we fenton aan en voeren we die door naar alle Sheep zodat zij een referentie hebben. Als we dit niet deden was er geen mogelijkheid voor de Sheep om te weten waar fenton is en dus waar van ze moeten weg rennen. Buiten dat hebben Sheep en Wolf ook nog een referentie naar Game. Dit hebben zij omdat ze allebij gebruik maken van de removeGame methode in Game.

###Encapsulation
Om er voor te zorgen dat belangrijke methoden alleen intern aangeroepen mogen worden gebruiken we Private en Protected. Dit gebeurd bij alle algemene properties van GameObject. Voor de methoden die toegankelijk moetten zijn vanaf buiten zoals een update of een subscribe in Wolf gebruiken we Public.


## Singleton

Beschrijf welk programmeerprobleem je oplost met de Singleton en waarom het patroon zich goed leent voor dit probleem.

---

Ik heb in Game.ts singleton toegepast om er voor te zorgen dat er maar een keer een game aangemaakt kan worden. Het kan namelijk voorkomen dat als ik dit niet had gedaan, er meer dat een keer een game word gestart. Dat zou betekenen dat alle objecten nogmaals worden aangemaakt en dat er twee games in een venster gaan draaien. 

## Polymorfisme

Beschrijf waar en waarom polymorfisme gebruikt wordt in jouw project. Dit moet code zijn die niet onderdeel is van de Strategy of Observer patronen uit dit tentamen.

---

Bij het aanmaken van alle gameobjecten (wolf, sheep, fenton) plaats ik deze in een gezamelijke gameobjects array. Bij de update loop ik door deze array en voer ik checks uit op de objecten zoals of de wolf het schaap heeft geraakt.

## Strategy

Beschrijf welk programmeerprobleem je oplost met de Strategy en waarom het patroon zich goed leent voor dit probleem.

---

Een gameobject kan meerdere soorten gedrag vertonen. Als je al deze soorten gedrag gaat uitwerken in de klassen van dat gameobject kan het wat chaotish worden en het is ook lastig om van buitenaf simpel dat gedrag te veranderen. Shapen hebben in deze game twee soorten gedrag: Slapen en rennen. Om deze reden heb ik bij de schapen ook een behaviour patroon toegepast. Bij het aanpassen van het gedrag word er simpelweg de behaviour property op een ander behaviour patroon gezet.

## Observer

Beschrijf welk programmeerprobleem je oplost met de Observer en waarom het patroon zich goed leent voor dit probleem.

---
 
Tussen sheep en wolf heb ik een observer patroon toegepast. Het is namelijk handig om berichten door te sturen naar alle Sheep als de wolf geluid maakt. Op dat moment loopt de wolf door alle observers (sheep in dit geval) en roept hij de notify aan. Als dat is gebeurd reageren de schapen daarop door wakker te worden en te gaan lopen.
Bij het verwijderen van een schaap uit de game (door de wolf of door de pen) unsubscribed het schaap ook eerst van de wolf zodat hij niet nog berichtjes krijgt als hij is opgegeten :D

## Finished product

Beschrijf welke componenten uit de onderstaande "finished product" lijst voorkomen in jouw project. Je krijgt 1 punt per component tot een maximum van 2 punten.

---

Ik heb geluid toegevoegd wanneer een schaap wakker word en wanneer de wolf gaat huilen.

### Finished product components

- De game heeft een startscherm en een eindscherm met een scoreweergave.
- Je score komt in een lijst met namen en scores. De lijst wordt bewaard als de browser is afgesloten. 
- De game bevat local of online multiplayer.
- De game werkt op mobiele schermen met touch controls.
- De game gebruikt alternatieve input zoals de camera, microfoon, gyroscoop, locatiebepaling.
- De game heeft levels met een oplopende moeilijkheidsgraad.
- Geluid en muziek is een integraal onderdeel van de game.
- De game werkt met Canvas in plaats van DOM elementen.