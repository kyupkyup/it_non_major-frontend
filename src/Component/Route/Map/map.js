import React, { useState, useContext, useEffect } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps"; // 패키지 불러오기
import { GeoContext } from "../../../App";
import getStores from "../../../util/getStores";
import "./marker.css";
import style from "./map.module.css";
import legend from "../../../data/legend.json";
import MapList from "./MapList/mapList";
// import storesTest from "../../../test_data/store_data.json";

function Map() {
  const geo = useContext(GeoContext);
  const [stores, setStores] = useState([]);
  const [center, setCenter] = useState({
    distance: 300,
    center: { y: geo.geoLocation.latitude, x: geo.geoLocation.longitude },
  });

  useEffect(() => {
    getStores(center.distance, center.center.y, center.center.x)
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
  const [listClick, setListClick] = useState(true);
  console.log(listClick);

  const clickList = () => {
    if (listClick) {
      setListClick(false);
    } else {
      setListClick(true);
    }
  };

  return (
    <div className={`${style.container}`}>
      <div
        className={`${
          listClick ? style.list_container : style.list_container_mobile_show
        }`}
      >
        <button class={`${style.mobile_show_list}`} onClick={() => clickList()}>
          {listClick ? "클릭해서 리스트 보기" : "클릭해서 닫기"}
        </button>

        {stores &&
          stores.map((store) => {
            console.log(stores);
            return (
              <MapList
                key={Number(store.id)}
                name={store.place_name}
                url={store.place_url}
                category={store.category_name}
                address={store.road_address_name}
              />
            );
          })}
      </div>
      <div
        className={`${style.current_position_button}`}
        onClick={() =>
          getStores(center.distance, center.center.y, center.center.x).then(
            (stores) => {
              setStores(stores);
            }
          )
        }
      >
        현 위치에서 찾기
      </div>

      <RenderAfterNavermapsLoaded
        ncpClientId={"vmwwi5c4v1"} // 자신의 네이버 계정에서 발급받은 Client ID
        error={<p>Maps Load Error</p>}
        loading={<p>loading</p>}
      >
        <NaverMap
          mapDivId={"react-naver-map"} // default: react-nave
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
            console.log(zoom);
            getDataByZoomChanged(zoom);
            const distance = findRealDistance();
            setCenter({
              distance: distance,
              center: {
                x: center.center.x,
                y: center.center.y,
              },
            });
            getStores(center.distance, center.center.y, center.center.x)
              .then((stores) => {
                setStores(stores);
              })
              .catch((rejected) => {
                console.log(rejected);
              });
          }}
          onCenterChanged={(center) => {
            const distance = findRealDistance();
            if (center && distance) {
              setCenter({
                center: {
                  x: center.x,
                  y: center.y,
                },
                distance: distance,
              });
            }
          }}
        >
          {stores &&
            stores.map((store) => {
              return (
                <Marker
                  key={Number(store.id)}
                  position={{ lat: store.y, lng: store.x }}
                  animation={0}
                  onClick={() => {
                    window.location.href = store.place_url;
                  }}
                />
              );
            })}
        </NaverMap>
      </RenderAfterNavermapsLoaded>
    </div>
  );
}
export default Map;
