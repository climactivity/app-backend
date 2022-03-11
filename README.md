
## Übersicht

### Frontend

Das Frontend liegt in [site](./site) und kann mit eigenen ```npm``` Befehlen gebaut werden. Zurzeit gibt es nur einen Editor für Infobytes/Fragen. 

Der Editor basiert auf [svelte-forms-lib](https://github.com/tjinauyeung/svelte-forms-lib). Damit können die Form-Felder mit Observables verbunden werden. 

Der Infobit-Editor benutzt [Svelte-Prosemirror](https://github.com/christianheine/prosemirror-svelte) um aus einem WYSIWIG-Editor strukturierte Daten zu generieren. Bisher kann es nur Absätze und Text-Dekoration (Die in der App noch ignoriert werden).

### Backend

Der ServerCode liegt in [server](./server).

Das Frontend wird im dev Modus mit ```NestExpressApplication.useStaticAssets```angezeigt. Die Production-Konfiguration bringt einen nginx-Container mit, der die statischen Inhalte ausliefert.

Als Persistenz Schicht wird MongoDb mit Mongoose Modul betrieben (die Standard-Lösung von NestJS, TypeORM, ist zwar schick aber auch recht langsam. Ausserdem ist der Schema-Builder von Mongoose besser auf NoSQL ausgerichtet als TypeORM.

Alles was aus dem Infobyte-Editor kommt wird im ```infobyte```-Modul behandelt. Infobytes werden persistiert und unterstützen CRUD-Operationen. Dabei folge ich dem Tutorial [hier](https://docs.nestjs.com/techniques/mongodb).

Es gibt auch einen Editor für TreeTemplates. Diese definieren die Eigenschaften der pflanzbaren Pflanzen im Wald. TODO: Da das Verhalten von Bäumen und anderen Pflanzen jetzt hinreichend ähnlich ist, dass diese über die selben Templates konfiguriert werden können, sollte der Name des Moduls das reflektieren. 

## Fortschritt

Aufstellung von aktuellen problemen:[TODO.md](/TODO.md)

Wird jetzt unter [cryptpad](https://cryptpad.fr/kanban/#/2/kanban/view/2EzmoZzILWMbaPiQ0xY523P7rTjb1OCtxsBQmcU-2j0/) verwaltet. 


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

1. Konfiguration anlegen:
```bash
$ cp .env-template .env 
```

2. ein Password für die Datenbank in .env setzen

3. Die Container bauen und staren: 
```bash
$ docker-compose up
```
