// Initialize and add the map
function initMap() {
  let app = document.getElementById("app");

  let aqi = document.getElementById("aqi");
  let city = document.getElementById("city");
  let state = document.getElementById("state");
  let country = document.getElementById("country");

  // The location of irvine
  const irvine = {
      lat: 33.68, 
      lng: -117.82, 
  };

  // The map, centered at irvine
  const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: irvine,
  });
  
  map.addListener("click", (e) => {
      console.log("mapClick");
      getAirQualityData(e.latLng)
  });

  const getAirQualityData = (latLng) => {
      console.log("getAirQualityData");
      console.log(latLng.lat());
      console.log(latLng.lng());

      axios.get("https://api.airvisual.com/v2/nearest_city?lat=" + latLng.lat() + "&lon=" + latLng.lng() + "&key=84fbc9a8-3330-4343-8870-d65a2131ad90")
      .then(positionData => {
          console.log("positionData: " + JSON.stringify(positionData));
          let data = positionData.data.data;
          console.log("data: " + JSON.stringify(data));

          city.innerHTML = data.city;
          state.innerHTML = data.state;
          country.innerHTML = data.country;

          axios.get(`https://api.airvisual.com/v2/city?city=${data.city}&state=${data.state}&country=${data.country}&key=84fbc9a8-3330-4343-8870-d65a2131ad90`)
          .then(qualityData => {
              console.log("qualityData: " + JSON.stringify(qualityData));
              let cityData = qualityData.data.data.current;
              console.log("cityData: " + JSON.stringify(cityData)); 

              aqi.innerHTML = cityData.pollution.aqius;
          })            
      });
  }
}