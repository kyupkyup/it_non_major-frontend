import React, { useContext } from "react";
import { GeoContext } from "../../App";
import style from "./header.module.css";
import PersonalInfo from "./Personal/personal_info";

function Header() {
  const geo = useContext(GeoContext);
  return (
    <div className={`${style.container}`}>
      <div className={`${style.logo}`}>오늘의 음식</div>
      <div>
        오늘의 음식은 <p>{geo.todays}</p> 입니다.
      </div>
    </div>
  );
}

export default Header;
