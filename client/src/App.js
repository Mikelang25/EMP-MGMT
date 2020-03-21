import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import Login from "./components/pages/login";
import Manage from "./components/pages/manage";


function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login}/>
        <Route exact path="/manage" component={Manage} />
      </div>
    </Router>
  );
}

export default App;
