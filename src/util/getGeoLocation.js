const obj = {
  latitude: 0,
  longitude: 0,
};
const getGeoLoca = new Promise(function (resolve, reject) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      obj.latitude = position.coords.latitude;
      obj.longitude = position.coords.longitude;
      resolve(obj);
    });
  } else {
    console.log("위치 정보 사용 불가능");
    alert("위치 정보 사용 불가능");
  }
  console.log(obj);
});
export default getGeoLoca;

//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       obj.latitude = position.coords.latitude;
//       obj.longitude = position.coords.longitude;
//     });
//   } else {
//     console.log("위치 정보 사용 불가능");
//     alert("위치 정보 사용 불가능");
//   }
//   console.log(obj);
//   return obj;
// }
