import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import style from "./Router.module.css";
import Feed from "./Feed/feed";
import Map from "./Map/map";

function BodyRouter() {
  return (
    <Router>
      <div id="router" className={`${style.router}`}>
        <NavLink
          to="/feed"
          className={`${style.link}`}
          activeClassName={`${style.active_link}`}
        >
          피드
        </NavLink>
        <NavLink
          to="/map"
          className={`${style.link}`}
          activeClassName={`${style.active_link}`}
        >
          지도
        </NavLink>
      </div>
      <Switch>
        <Route path="/feed">
          <Feed />
        </Route>
        <Route path="/map">
          <Map />
        </Route>

        <Route exact path="/">
          <Feed />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
export default BodyRouter;
