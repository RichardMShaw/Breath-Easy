const cToF = (celsius) => {
  return celsius * 9 / 5 + 32;
}


const getWeather = (position) => {
  axios.get(`https://api.airvisual.com/v2/nearest_city?lat=${position.lat}}&lon=${position.lng}&key=84fbc9a8-3330-4343-8870-d65a2131ad90`)
    .then(res => {
      let data = res.data.data
      axios.get(`https://api.airvisual.com/v2/city?city=${data.city}&state=${data.state}&country=${data.country}&key=84fbc9a8-3330-4343-8870-d65a2131ad90`)
        .then(res => {
          let cityData = res.data.data.current
          console.log(cityData)

        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(err)
    })
}


function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.640495, lng: -117.844296 },
    zoom: 13,
    mapTypeId: "roadmap",
  })

  map.addListener('click', (event) => getWeather(event.latLng.toJSON()))

  // Create the search box and link it to the UI element.
  const input = document.getElementById("searchInput");
  const searchBox = new google.maps.places.SearchBox(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.

  const searchLocation = () => {
    const places = searchBox.getPlaces();

    if (places.length != 1 || places[0].icon !== 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png') {
      return;
    }
    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      getWeather(place.geometry.location)
    });
    map.fitBounds(bounds);
  }

  const searchButton = document.getElementById("searchButton")
  searchButton.addEventListener('click', (event) => {
    event.preventDefault()
    searchLocation()
  })

  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.getElementById("locationButton");
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          getWeather(pos)
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });


}