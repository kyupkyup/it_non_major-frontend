import React, { useState, useContext, useEffect } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps"; // 패키지 불러오기
import { GeoContext } from "../../../App";
import getStores from "../../../util/getStores";
import "./marker.css";
import legend from "../../../data/legend.json";
import storesTest from "../../../test_data/store_data.json";

function Map() {
  const geo = useContext(GeoContext);

  const [stores, setStores] = useState([]);

  useEffect(() => {
    getStores(300, geo.geoLocation.latitude, geo.geoLocation.longitude)
      .then((stores) => {
        setStores(stores);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  const [zoomState, setZoomState] = useState(15);
  const findRealDistance = () => {
    const temp = String(zoomState);
    return legend[temp];
  };

  const getDataByZoomChanged = (zoom) => {
    setZoomState(zoom);
  };

  const scroll = () => {
    let location = document.querySelector("#router").offsetTop;
    window.scrollTo({ top: location, behavior: "smooth" });
  };

  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={"vmwwi5c4v1"} // 자신의 네이버 계정에서 발급받은 Client ID
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMap
        mapDivId={"react-naver-map"} // default: react-nave
        p
        style={{
          width: "100%", // 네이버지도 가로 길이
          height: "80vh", // 네이버지도 세로 길이
        }}
        defaultCenter={{
          lat: geo.geoLocation.latitude,
          lng: geo.geoLocation.longitude,
        }} // 지도 초기 위치
        defaultZoom={15} // 지도 초기 확대 배율 => 해
        onMouseover={scroll}
        onZoomChanged={(zoom) => {
          getDataByZoomChanged(zoom);
          const distance = findRealDistance();

          getStores(
            distance,
            geo.geoLocation.latitude,
            geo.geoLocation.longitude
          )
            .then((stores) => {
              setStores(stores);
            })
            .catch((rejected) => {
              console.log(rejected);
            });
        }}
        onCenterChanged={(center) => {
          const distance = findRealDistance();
          // geo.setCustomGeoLocation(distance, center.x, center.y);

          // getStores(distance, center.y, center.x)
          //   .then((stores) => {
          //     setStores(stores);
          //   })
          //   .catch((rejected) => {
          //     console.log(rejected);
          //   });
        }}
      >
        {stores.map((store) => {
          return (
            <Marker
              key={Number(store.id)}
              position={{ lat: store.y, lng: store.x }}
              animation={0}
              // icon={{
              //   content:
              //     zoomState >= 14
              //       ? [
              //           '<div class="cs-mapbridge">',
              //           "<div class='marker'>",
              //           `${store.place_name}`,
              //           "</div>",
              //           "</div>",
              //         ].join("")
              //       : "<div class='zoom-out-marker'></div>",
              // }}
              onClick={() => alert("hello")}
            />
          );
        })}
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
}
export default Map;
