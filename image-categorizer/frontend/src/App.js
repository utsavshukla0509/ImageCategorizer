import React, { Component } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/LogIn";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path = "/" component={LandingPage}/>
              <Route exact path = "/register" component={Register} />
              <Route exact path = "/login" component={Login} />
            </Switch> 
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;