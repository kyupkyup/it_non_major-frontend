import React, { useState } from "react";
import Header from "./Component/Header/header";
import BodyRouter from "./Component/Route/Router";
import getGeoLoca from "./util/getGeoLocation";
import getStores from "./util/getStores";
export const GeoContext = React.createContext();

function App() {
  let stores = [];
  const [geoLocation, setGeoLocation] = useState();
  getGeoLoca.then(function (value) {
    setGeoLocation(value);
    console.log(value);
  });
  const resetGeoLocation = () => {
    getGeoLoca.then(function (value) {
      setGeoLocation(value);
    });
  };
  const geoObject = {
    stores: stores,
    geoLocation: geoLocation,
    setGeoLocation: resetGeoLocation,
    setCustomGeoLocation: (distance, latitude, longitude) => {
      this.stores = getStores(distance, latitude, longitude);
      setGeoLocation({ latitude: latitude, longitude: longitude });
    },
  };

  return (
    <GeoContext.Provider value={geoObject}>
      <Header />
      {geoLocation ? <BodyRouter /> : <div>loading</div>}
    </GeoContext.Provider>
  );
}

export default App;
