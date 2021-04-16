import React, { useState } from "react";
import Header from "./Component/Header/header";
import BodyRouter from "./Component/Route/Router";
import getGeoLoca from "./util/getGeoLocation";
import getStores from "./util/getStores";
import getToday from "./util/getToday";
export const GeoContext = React.createContext();

function App() {
  let stores = [];
  let [todays, setTodays] = useState();
  const [geoLocation, setGeoLocation] = useState();
  getGeoLoca.then(function (value) {
    setGeoLocation(value);
    if (!todays) {
      getToday(value.latitude, value.longitude).then((value) => {
        setTodays(value);
      });
    }
  });

  const resetGeoLocation = () => {
    getGeoLoca.then(function (value) {
      setGeoLocation(value);
    });
  };
  const geoObject = {
    stores: stores,
    todays: todays,
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
