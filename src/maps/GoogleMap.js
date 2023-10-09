import React from "react";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

const Googlemap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 24.37348833, lng: 54.536335 }), []);

  if (!isLoaded) {
    // Return loading or fallback content if the Google Maps library is not loaded yet
    return <div>Loading...</div>;
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        center={center}
        zoom={12}
      />
    </>
  );
};

export default Googlemap;
