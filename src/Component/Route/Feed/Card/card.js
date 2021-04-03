import React from "react";
import style from "./card.module.css";
import Profile from "../Profile/profile";
import users from "../../../../test_data/user_data.json";
import stores from "../../../../test_data/store_data.json";

import CardDetailLinkBox from "./CardDetailLinkBox/cardDetailLinkBox";

function Card({ id, userId, storeId, review, thumb_nail_image }) {
  const user = users.users.filter((user) => user.user_id === userId)[0];
  const store = stores.stores.filter((store) => store.store_id === storeId)[0];
  return (
    <div className={`${style.container}`}>
      <Profile
        name={user.name}
        url={user.img_url}
        review_count={user.review_count}
      />
      <img
        src={thumb_nail_image}
        alt="리뷰그림"
        className={`${style.img_container}`}
      />
      <div className={style.review}>{review}</div>

      <CardDetailLinkBox
        id={store.id}
        storeName={store.place_name}
        storeAddress={store.store_address}
      />
    </div>
  );
}

export default Card;
