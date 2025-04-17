const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log("Sending location:", { latitude, longitude });
      socket.emit("send-location", { latitude, longitude });
    },
    (err) => {
      console.log(err);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Bijen",
}).addTo(map);

const markers = {};
let line = null;

//receiving the location data from the socket server backend
socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;

  map.setView([latitude, longitude]);
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude], 16).addTo(map);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: userLatitude, longitude: userLongitude } =
        position.coords;
      const userLocation = L.latLng(userLatitude, userLongitude);
      const receivedLocation = L.latLng(latitude, longitude);

      // Calculate the distance in meters
      const distance = userLocation.distanceTo(receivedLocation);
      console.log(`Distance to user ${id}: ${distance.toFixed(2)} meters`);

      if (line) {
        map.removeLayer(line); // Remove the old line if it exists
      }

      line = L.polyline([userLocation, receivedLocation], {
        color: "blue",
      }).addTo(map);
    });
  }

  //when the user is disconnet
  socket.on("user-disconnected", (payloadid) => {
    if (markers[payloadid]) {
      map.removeLayer(markers[payloadid]);
      delete markers[payloadid];
    }
  });
});
