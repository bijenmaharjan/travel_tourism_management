import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet default icon fix
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Configure Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Geolocation error:", err);
          // Fallback location (Kathmandu)
          setPosition([27.7172, 85.324]);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Fallback location
      setPosition([27.7172, 85.324]);
    }
  }, []);

  return (
    <div className="relative w-full h-[700px]">
      {position ? (
        <MapContainer center={position} zoom={13} className="w-full h-full">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}
    </div>
  );
}
