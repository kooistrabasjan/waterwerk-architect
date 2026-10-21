# WaterWerk Architect

**Van tekst naar architectuur.** Gratis Nederlandstalige webapplicatie om architectuurelementen te herkennen, visueel te bekijken, handmatig aan te passen en te exporteren.

## Status: eerste MVP

**Werkend in de broncode:** React/TypeScript-app, browsergerichte invoer, voorbeelden over peilbeheer/vergunningverlening/assetmanagement, regelgebaseerde herkenning van *expliciet genoemde bekende termen*, handmatige elementen en relaties, een interactief React Flow-diagram, basisvalidatie en lokale import van PDF, DOCX, TXT en MD.

**Export:** SVG en PNG exporteren momenteel een vereenvoudigde elementenkaart **zonder relaties**, PDF een tekstueel modeloverzicht en JSON het volledige interne model **met relaties**.

**Nog niet geïmplementeerd:** WebLLM/WebGPU-AI, de volledige officiële ArchiMate 3.2-elementen-/relatiematrix, ArchiMate-notatie en XML-uitwisselformaat met XSD-validatie, ELK-automatische indeling en diagramgetrouwe PDF-export. Regelgebaseerde herkenning is geen AI. Deze versie is niet geschikt om formeel gevalideerde ArchiMate-modellen te leveren.

## Lokaal ontwikkelen

Vereist Node.js 22 of hoger.

```bash
npm install
npm run dev
npm test
npm run build
```

## Publiceren

GitHub Actions voert automatisch tests, productiebuild en deployment uit op een push naar `main`. Selecteer onder **Settings → Pages → Source**: **GitHub Actions**. De ingestelde Vite base is `/waterwerk-architect/`. Beoogde publicatie: https://kooistrabasjan.github.io/waterwerk-architect/ .

## Privacy

Er is geen backend, tracking, gebruikersaccount of blijvende modelopslag. Documenten worden in de browser verwerkt. Tekst-PDF's worden ondersteund; gescande PDF's nog niet. Afhankelijke JavaScript-pakketten worden tijdens het laden via de gehoste site geleverd, maar ingevoerde documentinhoud wordt niet door de app geüpload.

## Tests

Er zijn drie unit-tests toegevoegd voor voorbeelden, expliciete termherkenning en het afwijzen van ongeldige relatieverwijzingen. Een geslaagde CI-run of live-publicatie moet nog worden vastgesteld.

## Licentie

MIT. Bibliotheken hebben hun eigen licenties.
