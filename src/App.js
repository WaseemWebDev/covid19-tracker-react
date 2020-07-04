import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/navbar';
import GlobalStats from './components/globalStates';
import AllCountries from './components/allCountries';
import './App.css';

function App() {
  // const screenConfig = useState(0);

  return (

    <div >
      <Navbar />
      <Switch>
        <Route exact path="/"
          component={GlobalStats}
        />
        <Route exact path="/countries"
          component={AllCountries}
        />
       

      </Switch>
    </div>






  );
}

export default App;
