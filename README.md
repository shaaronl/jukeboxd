# Jukebox♪d

  This is the monorepo for Jukebox'd.
## Product Vision

**Jukeboxd** is a music review platform designed for music enthusiasts who want to rate songs and albums they like or dislike. Our website caters to users seeking personalized music suggestions and those who want to know what to avoid.

**Unlike Letterboxd**, which focuses on movies, Jukeboxd is dedicated to the world of music, providing a space for in-depth reviews and ratings of individual songs and albums.


The **deployed app** can be viewed at: https://kind-pebble-01340fc1e.5.azurestaticapps.net/

And the **backend** can be accessed from: https://jukeboxd-music.azurewebsites.net/

## Artifacts

### ♪ UI Prototype
The UI Prototype can be accessed here: https://www.figma.com/design/BpFj1NG2oKtV8Dxo4gEHn8/Jukebox'd?node-id=0-1&t=Mt7yFI4xg6dEh0z8-1

## Development Environment Set Up

Follow these steps to clone the repository, set up your environment, and start the development servers.

### ♪ Clone the Repository

```sh
git@github.com:shaaronl/jukeboxd.git
cd jukeboxd
npm install
```
### ♪ To start up local instances
#### frontend
```sh
npm start
```
#### backend
```sh
cd packages/backend
npm run dev
```
### ♪ Before commiting/pushing, maintain style conventions with:
```sh
npm run lint
npx prettier --write .
```



