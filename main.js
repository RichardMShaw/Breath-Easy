function Main() {
  console.log("main");

  let app = document.getElementById("app");

  axios.get("https://finnhub.io/api/v1/stock/recommendation?symbol=AAPL&token=bulgg3n48v6p4m01pn00")
    .then(function (response) {
      console.log(response);
      $(app).html(JSON.stringify(response));
    })
    .catch(function (error) {
      console.log(error);
    });
}