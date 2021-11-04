import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Recipes from "./components/Recipes";
import ShoppingList from "./components/ShoppingList";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" variant="light">
          <Container>
            <Nav className="me-auto">
              <NavLink exact to="/" className="ms-0 me-5 nav-link">
                Recipes Book
              </NavLink>
              <NavLink to="/recipes" className="me-5 nav-link">
                Recipes
              </NavLink>
              <NavLink to="/shopping-list" className="me-5 nav-link">
                Shopping List
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
        <Switch>
          <Route path="/recipes" exact={false}>
            <Recipes />
          </Route>

          <Route path="/shopping-list" exact={false}>
            <ShoppingList />
          </Route>

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
