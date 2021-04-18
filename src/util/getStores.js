// 스토어 데이터 fetch 리팩토링을 위한 파일
function getStores(distance, lat, log) {
  // data fetch again
  return fetch(
    "https://www.weatherplace.site/api/v1/place?x=" +
      log +
      "&y=" +
      lat +
      "&radius=" +
      distance,
    {
      method: "GET",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    }
  )
    .then(function (resp) {
      // 응답 형식에 따라 resp.text() 가 될 수도 있다
      return resp.json();
    })
    .catch((reject) => {
      console.log(reject);
    });
}
export default getStores;
