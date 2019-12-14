import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';




ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Routes />
  </FirebaseContext.Provider>
  , document.getElementById("root")
);


serviceWorker.register();
// serviceWorker.unregister();
