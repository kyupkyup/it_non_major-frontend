// 스토어 데이터 fetch 리팩토링을 위한 파일
function getToday(lat, log) {
  // data fetch again
  //음식 보내주는 api 주소 : http://3.36.171.252:5000/api/v1/food?x=경도&y=위도
  return fetch("http://3.36.171.252:5000/api/v1/food?x=" + log + "&y=" + lat, {
    method: "GET",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
    .then(function (resp) {
      // 응답 형식에 따라 resp.text() 가 될 수도 있다
      return resp.json();
    })
    .catch((reject) => {
      console.log(reject);
    });
}
export default getToday;
