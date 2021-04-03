import React, { useState } from "react";
import Header from "./Component/Header/header";
import BodyRouter from "./Component/Route/Router";
import getGeoLoca from "./util/getGeoLocation";
import getStores from "./util/getStores";
export const GeoContext = React.createContext();

function App() {
  let geoLocaInit = getGeoLoca();
  let stores = [];
  const [geoLocation, setGeoLocation] = useState(geoLocaInit);
  const resetGeoLocation = () => {
    setGeoLocation(getGeoLoca());
  };
  const geoObject = {
    stores: stores,
    geoLocation: geoLocation,
    setGeoLocation: () => {
      resetGeoLocation();
    },
    setCustomGeoLocation: (distance, latitude, longitude) => {
      this.stores = getStores(distance, latitude, longitude);
      setGeoLocation({ latitude: latitude, longitude: longitude });
    },
  };

  return (
    <GeoContext.Provider value={geoObject}>
      <Header />
      <BodyRouter />
    </GeoContext.Provider>
  );
}

export default App;
