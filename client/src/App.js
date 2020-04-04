import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/pages/login";
import Manage from "./components/pages/manage";
import Search from "./components/pages/search";


function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login}/>
        <Route exact path="/manage" component={Manage} />
        <Route exact path="/search" component={Search} />
      </div>
    </Router>
  );
}

export default App;
