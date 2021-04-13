import React, { useContext, useState } from "react";
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
import { GeoContext } from "../../App";
import postionImage from "../../source/gps.png";

function BodyRouter({ resetGeoLocation }) {
  const geo = useContext(GeoContext);

  return (
    <Router>
      <div id="router" className={`${style.router}`}>
        <NavLink
          to="/map"
          className={`${style.link}`}
          activeClassName={`${style.active_link}`}
        >
          지도
        </NavLink>
        {/* <NavLink
          to="/feed"
          className={`${style.link}`}
          activeClassName={`${style.active_link}`}
        >
          피드
        </NavLink> */}
      </div>
      <div className={`${style.get_location_container}`}>
        <div className={`${style.get_location}`}>
          <button
            className={`${style.set_location_button}`}
            onClick={() => geo.setGeoLocation()}
          >
            <img
              src={postionImage}
              style={{
                width: 20,
                height: 20,
                color: "#2d8dee",
                marginRight: 5,
              }}
              alt="위치이미지"
            />
            현 위치
          </button>
        </div>
      </div>
      <Switch>
        {/* <Route path="/feed">
          <Feed />
        </Route> */}
        <Route path="/map">
          <Map />
        </Route>

        <Route exact path="/">
          <Map />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
export default BodyRouter;
