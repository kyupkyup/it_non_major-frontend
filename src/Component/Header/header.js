import React, { useContext, useState } from "react";
import { GeoContext } from "../../App";
import style from "./header.module.css";
import PersonalInfo from "./Personal/personal_info";

function Header() {
  const geo = useContext(GeoContext);
  console.log(geo);
  return (
    <div className={`${style.container}`}>
      <div className={`${style.logo}`}>오늘의 음식</div>
      <span className={`${style.title}`}>
        날씨가 좋네요. 오늘의 추천 음식은 <br></br>
        <span>
          {geo.todays &&
            geo.todays.map((today) => (
              <span className={`${style.title_detail}`}>{today + " "}</span>
            ))}
        </span>{" "}
        입니다.
      </span>
    </div>
  );
}

export default Header;
