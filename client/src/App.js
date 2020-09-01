import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/index";
import { Container } from "@material-ui/core";
import { TodoProvider } from "./context/todo";

function App() {
  return (
    <TodoProvider>
      <Router>
        <Container fixed>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    </TodoProvider>
  );
}

export default App;
