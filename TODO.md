CMS Anpassungen
===============


## Website

- Routing:
  - **CSR erweitern auf aktuell bearbeiteten Content** (damit bei Seite-Neuladen die akutelle Position erhalten bleibt)
  - SSR über SvelteKit hinzufügen
- *Datenbank mirgrieren zu CockroachDB damit wir nur noch eine Datenbank betreiben müssen und Backups / Zugriffskontrolle / Deployment etc. einfacher werden*
- *Landingpage / Sharing-Gateway etc abkoppeln und als eigene Seite weiterentwickeln* 
- *etwas weniger hässlich dürfte das CMS auch sein*
  
## Editor in general

- Content-Editoren vereinheitlichen, damit die Funktionalität teilen können
- **Speichern sollte mehr feedback geben und eindeutig klar machen, was wann gespeichert wurde**
- Undo/Redo
- warnen bei nicht gespeicherten Änderungen
- Content auf funktioniert in der App checken bevor Veröffentlicht werden kann 
- **entveröffentlichen**

### Analytics

- mehr analytics!
  - **DAU/MAU** (**D**aily/**M**onthly **A**ctive **U**sers)
  - Retention
  - irgendwas richtung Wirknachweise (hängt von noch nicht existierender Komponente ab)

### Bäume

- Feldnamen lesbarer machen 
- gültige Optionen für 
  - texture_name 
  - preview name
  - archetype
- Default für unlocklevel
- *Vorschauen für Texture und Preview* 
- oder wir finden uns damit ab, das die erstmal fix sind

### Aspekte

- **Quiz Elements entfernen**
- Trackingstufen reorderbar machen (Listen insgesammt könnten das brauchen)
- CO2 Fußabdrucksfragen hier? 
- @icon mit Mediengallerie verbinden oder entfernen da es in der App eh nicht mehr vorkommt?

### Infobytes

- Infobits ohne Fragen hervorheben / Anzahl Fragen in übersicht anzeigen
- Breadcrumbs oder ähnliche Navigation da man sich recht leicht in den Infobits verliert 

### Medien

- *automatisches generieren von optimierten Bildversionen vielleicht mit [Squoosh](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli)*

### Aufgaben

- Suche
- **Sortieren nach Bigpoint/Aspekt wie bei Infobytes**
- Link nachdem fertig implementieren oder entfernen 
- Datetime picker in Firefox reparieren (WebKit/Blink basierte Browser haben einen eigenen Input für ```datetime```)

--------------------------------------
Legende

<small> - **wichtig**

<small> - *wäre nett*
