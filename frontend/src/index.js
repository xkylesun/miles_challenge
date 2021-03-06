// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


import React from "react"
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import App from './App';

document.addEventListener("DOMContentLoaded", () => {
  let store;
  let data = localStorage.getItem("lastData");
  if (data) {
    store = configureStore({
      arrange: JSON.parse(data),
      undo: null,
      redo: null
    })
  } else {
    let start = {
      arrange: {
        C1: [],
        C2: [],
        C3: [],
        C4: [],
        C5: [],
      },
      undo: null,
      redo: null
    }
    store = configureStore(start);
  }
  // window.store = store;
  const root = document.getElementById("root");
  ReactDOM.render(<App store={store} />, root);
});
