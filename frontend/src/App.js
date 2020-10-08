import React from 'react';
import TableContainer from "./components/table_container"
import './App.css';

import {Provider} from "react-redux";

const App = ({store}) => {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="project_title">Miles Front-end Challenge - Kyle Sun</div>
        <TableContainer/>
      </div>
    </Provider>
  );
}

export default App;
