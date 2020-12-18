
## Übersicht

### Frontend

Das Frontend liegt in site und kann mit eigenen ```npm``` Befehlen gebaut werden. Zurzeit gibt es nur einen Editor für Infobytes/Fragen. 

Der Editor basiert auf [svelte-forms-lib](https://github.com/tjinauyeung/svelte-forms-lib). Damit können die Form-Felder mit Observables verbunden werden. 

Der Infobit-Editor benutzt [Svelte-Prosemirror](https://github.com/christianheine/prosemirror-svelte) um aus einem WYSIWIG-Editor strukturierte Daten zu generieren. Bisher kann es nur Absätze und Text-Dekoration (Die in der App noch ignoriert werden).

### Backend

Der ServerCode ist jetzt in ./server zuhause. 
Das Frontend wird im dev Modus mit ```NestExpressApplication.useStaticAssets```angezeigt. Die Production-Konfiguration bringt einen nginx-Container mit, der die statischen Inhalte ausliefert.

Als Persistenz Schicht wird MongoDb mit Mongoose Modul betrieben (die Standard-Lösung von NestJS, TypeORM, ist zwar schick aber auch recht langsam. Ausserdem ist der Schema-Builder von Mongoose besser auf NoSQL ausgerichtet als TypeORM.

Alles was aus dem Infobyte-Editor kommt wird im ```infobyte```-Modul behandelt. Infobytes werden persistiert und unterstützen CRUD-Operationen. Dabei folge ich dem Tutorial [hier](https://docs.nestjs.com/techniques/mongodb).

Es gibt auch einen Editor für TreeTemplates. Diese definieren die Eigenschaften der pflanzbaren Pflanzen im Wald. TODO: Da das Verhalten von Bäumen und anderen Pflanzen jetzt hinreichend ähnlich ist, dass diese über die selben Templates konfiguriert werden können, sollte der Name des Moduls das reflektieren. 

## Fortschritt

### Content-Editor für Info-Pakete und Quizfragen
#### Meta-Daten
- [~] Sprache zuweisen (UI existiert)
- [~] Region zuweisen (UI existiert)
- [~] Veröffentlichen (UI existiert)
- [ ] Revisionen verwalten?

#### Inhalt
- [x] Titel anlegen
- [x] Frontmatter (aka das, was in der Sprechblase am Anfang des Info-Moduls sthet) anlegen
- [ ] Icon hochladen

Infobits
- [x] Infobits anlegen
- [ ] Rich-Text Formatierung in Infobits
- [ ] Bullet-Lists in Infobits
- [ ] Tabellen in Infobits 
- [ ] Grafiken in Infobits 
- [ ] Eingaben validierung

Quiz-Fragen
- [x] Fragen anlegen
- [x] Antworten anlegen
- [ ] Eingaben validierung

Tree-Templates
- [x] CRUD operationen
- [ ] Vorschau für die ausgewählte Textur
- [ ] Feste Optionen für die Textur- und Sektorauswahl

#### Editor UI 
- es gibt kein Feedback ob speichern erfolgreich war
- man kann sich mit den ```-```-Buttons leicht in den Fuß schießen
- validierung ist zwar eingeschaltat, ich habe aber noch kein Schema für [yup](https://svelte-forms-lib-sapper-docs.now.sh/yup) angelegt

## Running the backend

```bash
$ cd server
$ npm install
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running the frontend

```bash
$ cd site
$ npm install
# development in watch mode
$ npm run dev

# build production mode
$ npm run build

# run tests
$ npm run validate
```

## Docker:
#### kommt bald(tm)
(sobald ich den Configservice aus meinem Test-Projekt hier integriert habe)

1. Konfiguration anlegen:
```bash
$ cp .env-template .env 
```

2. ein Password für die Datenbank in .env setzen

3. Die Container bauen und staren: 
```bash
$ docker-compose up
```