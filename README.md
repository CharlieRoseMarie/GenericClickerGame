# GenericClickerGame
A generic clicker game for practice

---

## Install instructions

Follow the instructions to install nodejs 10.3.0 [here](https://nodejs.org/en/download/current/).

Once installed, pull the source and navigate to the folder and run:

```
npm install
```

This will retreave all needed deps.

To build, run:

```
npm run gulp
```

Once that is done, all you need to start the server is to run:

```
npm start
```

To access the website, just point your browser to: *localhost:3000*


## Browser Sync

Building and restarting the server for every change is tedius and annoying. For rapid development,
if you are only working on files in `app/engine`, `app/public`, or `app/views`, a utility method is available that will start the server, and update your browser with the latest changes.

```
npm run gulp start-server
```

This will run the server, open a browser windows, and reload files in the above folders which have changed, then refresh your browser. Neat, eh?