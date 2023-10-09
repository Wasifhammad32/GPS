import React from "react";
import { Marker, Popup, Polyline } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../images/marker.png";
import data from "../model/gpsDataJasons.json";

const customIcon = new L.Icon({
  iconUrl: icon, 
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
});

const LeafletMap = () => {
  const desiredDate = "2021-09-09";
  const filteredData = data.filter((entry) =>
    entry.RTC.startsWith(desiredDate)
  );
  const polygonCoords = filteredData.map((entry) => [entry.Lat, entry.Lng]);

  return (
    <div className="map-container">
      <MapContainer
        style={{ position: "", width: "100%", height: "100vh" }}
        center={[24.37348833, 54.536335]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline positions={polygonCoords} color="blue" />

        {filteredData.map((point, index) => (
          <Marker
            key={index}
            position={[point.Lat, point.Lng]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h3>GPS Data</h3>
                <p>Date/Time: {point.RTC}</p>
                <p>Latitude: {point.Lat}</p>
                <p>Longitude: {point.Lng}</p>
                <p>Speed: {point.Speed}</p>
                <p>Temperature: {point.Tmp}</p>
                <p>Humidity: {point.Hmd}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
