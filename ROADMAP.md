# Ontwikkelroadmap WaterWerk Architect

Deze roadmap is een werkplan en geen claim dat functies al af zijn. Prioriteit: een betrouwbare, goed bewerkbare ArchiMate 3.2-viewgenerator zonder backend.

## Fase 1 — Editor en diagramkwaliteit
- [x] Direct verslepen met React Flow
- [x] ELK automatische indeling
- [x] Orthogonale Manhattan-lijnen in editor
- [x] Vier zijden als bron- en doelaansluitpunten
- [x] Visuele groupings met naam en selecteerbare elementen
- [x] Bewerkbaar JSON-model opnieuw openen met groepsleden en posities
- [x] Groupings met pijltjes als geheel verplaatsen (stappen van 30 px)
- [x] Grouping via sleepbalk verslepen met alle leden (basisimplementatie, browsertest nog nodig)
- [x] Groepsmarges instellen via bewerkingspaneel (15–150 px)
- [ ] Groupings direct met de muis vergroten en verkleinen
- [ ] Leden in/uit groep slepen
- [ ] Meerdere geselecteerde elementen gezamenlijk verplaatsen
- [ ] Undo/redo voor alle modelwijzigingen
- [ ] Relatieroutering met vrije waypoints en obstakelvermijding
- [ ] Labels verplaatsen zonder verbindingen te beïnvloeden
- [ ] Snap-to-grid, magnetische hulplijnen en uitlijnacties
- [ ] Zoom/pan/fit-view en gebruikersinteracties testen met Playwright
- [ ] Visuele regressietests in Edge/Chrome

## Fase 2 — Formele ArchiMate 3.2
- [ ] Exacte officiële ArchiMate 3.2-symbolen verifiëren per element en gebruiksrechten vastleggen
- [x] Conventionele positionering van pictogrammen rechtsboven in editor en SVG/PDF/PNG
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

## Bron en licentie voor officiële notatie
De Open Group 3.2-specificatie en referentiekaarten zijn de normbron. De huidige pictogramgeometrie in `src/notation.ts` is **eigen, niet geverifieerde illustratie** en mag daarom niet als exact officieel worden gepresenteerd. De volgende acceptatiestap vereist per element visuele vergelijking met de 3.2-referentiekaart, geregistreerde bron en relevante hergebruikvoorwaarden. Zie https://www.opengroup.org/archimate-licensed-downloads en https://archimate-community.pages.opengroup.org/workgroups/archimate-101/ .

## Implementatie-notatie (21 oktober 2026)
De icoonvormen voor de 14 ondersteunde typen zijn aangepast aan de vormen uit de open-source Archi-editor (MIT), op basis van de implementatiereferentie [archi-online](https://github.com/ThomasRohde/archi-online/blob/main/src/canvas/figures/icons.tsx), die de Archi-figuurklassen overneemt. De SVG-paden zijn voor WaterWerk handmatig vertaald en deels vereenvoudigd. Dit is **niet** hetzelfde als een door The Open Group gecertificeerde notatie-implementatie. Controle tegen alle figuren in de officiële 3.2-referentiekaart en correctheid van relatie-eindpunten blijven openstaande acceptatiepunten. Bronprojecten: https://github.com/archimatetool/archi (MIT) en https://github.com/ThomasRohde/archi-online (MIT); zie hun licentiebestanden voor voorwaarden.
