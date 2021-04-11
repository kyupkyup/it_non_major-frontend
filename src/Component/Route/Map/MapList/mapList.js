import React from "react";
import style from "./mapList.module.css";

function MapList({ key, name, url, category, address }) {
  return (
    <div className={`${style.container}`}>
      <a href={url} className={`${style.title}`}>
        {name}
      </a>
      <p className={`${style.category}`}>{category}</p>
      <p className={`${style.address}`}>{address}</p>
    </div>
  );
}

export default MapList;
