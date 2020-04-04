import React from "react";
import { BrowserRouter as Router, Route, Switch,browserHistory} from "react-router-dom";
import Login from "./components/pages/login";
import Manage from "./components/pages/manage";
import Search from "./components/pages/search";


function App() {
  return (
    <Router history={browserHistory}>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/manage" component={Manage} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
