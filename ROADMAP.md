# Ontwikkelroadmap WaterWerk Architect

Deze roadmap is een werkplan en geen claim dat functies al af zijn. Prioriteit: een betrouwbare, goed bewerkbare ArchiMate 3.2-viewgenerator zonder backend.

## Fase 1 — Editor en diagramkwaliteit
- [x] Direct verslepen met React Flow
- [x] ELK automatische indeling
- [x] Orthogonale Manhattan-lijnen in editor
- [x] Vier zijden als bron- en doelaansluitpunten
- [x] Visuele groupings met naam en selecteerbare elementen
- [ ] Groepen interactief vergroten en verkleinen, leden in/uit groep slepen
- [ ] Meerdere geselecteerde elementen gezamenlijk verplaatsen
- [ ] Undo/redo voor alle modelwijzigingen
- [ ] Relatieroutering met vrije waypoints en obstakelvermijding
- [ ] Labels verplaatsen zonder verbindingen te beïnvloeden
- [ ] Snap-to-grid, magnetische hulplijnen en uitlijnacties
- [ ] Zoom/pan/fit-view en gebruikersinteracties testen met Playwright
- [ ] Visuele regressietests in Edge/Chrome

## Fase 2 — Formele ArchiMate 3.2
- [ ] Volledige elementcatalogus met officiële symbolen en laagkleuren
- [ ] Officiële relatietypen en exacte pijlpunten en lijnen
- [ ] Semantische relatiematrix uit The Open Group-specificatie met tests
- [ ] Scheiding model-elementen, diagramobjecten en groupings
- [ ] Consistente naamgeving, ID's en foutmeldingen
- [ ] Perspective/viewpoint-selectie en detailniveau

## Fase 3 — Import en export
- [ ] ArchiMate Model Exchange XML volgens de officiële schema's
- [ ] XSD-validatie uitvoeren
- [ ] Diagramposities, relaties en grouping weergeven in XML
- [ ] Importtests in de gratis Archi-tool
- [ ] SVG/PNG/PDF gelijk aan de actuele editor
- [ ] Pagina-indeling en leesbaarheid van grote views
- [ ] Eigen JSON-modellen lokaal kunnen heropenen

## Fase 4 — Documentanalyse en AI
- [ ] PDF/DOCX/TXT/MD robuust lokaal lezen
- [ ] WebGPU/WebLLM-detectie en vrijwillige modeldownload
- [ ] Strikt JSON-schema voor AI-analyseresultaten
- [ ] Herleidbaarheid van elementen en relaties naar brontekst
- [ ] Aannames apart tonen en laten accepteren/weigeren
- [ ] Handmatige fallback zonder WebGPU
- [ ] Tests met realistische teksten van waterschappen

## Fase 5 — Kwaliteitsborging
- [ ] Unit-, integratie- en E2E-tests voor kernworkflow
- [ ] Toegankelijkheid toetsen aan WCAG 2.2 AA
- [ ] Prestatie- en geheugentests met grotere diagrammen
- [ ] Privacy-/licentiecontrole en dependency auditing
- [ ] Controle GitHub Pages deployment en bruikbare foutmeldingen

## Acceptatiecriteria voor de volgende release
1. De editor verbindt elk element op boven-, onder-, linker- en rechterzijde.
2. Elke verbinding blijft orthogonaal tijdens verslepen.
3. Groupings bevatten visueel de gekozen elementen en laten de onderliggende ArchiMate-semantiek intact.
4. SVG, PNG en PDF bevatten elementen, relaties en groupings.
5. Alle huidige unit-tests en de productiebuild slagen.
6. Een echte browsertest bevestigt de editor-interacties (apart, nog uit te voeren).

## Ontwerpbesluit
Grouping is voorlopig een **visuele container**, geen ArchiMate-element met semantische relaties. Dit voorkomt dat een layout-keuze onbedoeld betekenis aan het model toevoegt. De groepsleden krijgen voorlopig geen automatisch parent-child-draggedrag.
