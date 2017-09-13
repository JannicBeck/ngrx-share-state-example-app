# @ngrx example application for sharing state between reducers
The example app is extended by a counter reducer. On pressing the "Increment corresponding counter" it increments countOpened if the sidenav is open and countClosed if it is closed.

### Quick start

```bash
# clone the repo
git clone https://github.com/ngrx/platform.git

# clone the sharing state example
https://github.com/JannicBeck/ngrx-share-state-example-app

# replace example-app folder
replace the folder content of example-app with content of ngrx-share-state-example-app

# Use npm or yarn to install the dependencies:
npm install

# OR
yarn

# start the server
npm run build && npm run cli -- serve

# OR
yarn run example:start
```

Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser

_NOTE:_ The above setup instructions assume you have added local npm bin folders to your path.
If this is not the case you will need to install the Angular CLI globally.
