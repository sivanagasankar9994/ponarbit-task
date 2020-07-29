import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Gallery from "./components/Gallery";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const App = ({ history }) => {
  return (
    <Router>
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link class="navbar-brand" href="#">
            Navbar
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="navbarNavDropdown" class="navbar-collapse collapse">
            <ul class="navbar-nav mr-auto"></ul>
            <ul class="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/")}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  // style={isActive(history, "/")}
                  to="/posts"
                >
                  Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  // style={isActive(history, "/")}
                  to="/gallery"
                >
                  Gallary
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact component={Users} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/gallaery" exact component={Gallery} />
      </div>
    </Router>
  );
};
export default withRouter(App);
