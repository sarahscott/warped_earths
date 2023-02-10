import Map from "react-map-gl";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxGlobe = () => {
  // const width = typeof window === "undefined" ? 100 : window.innerWidth;
  const zoom = 1;

  return (
    <Map
      mapboxAccessToken="pk.eyJ1Ijoic2FyYWgtb3BlbnN5c3RlbXNsYWIiLCJhIjoiY2t0dXV6cW8zMXhqMzJvcGlvaG5oc3U3NCJ9.fy80cmE0f565WsGzhkow-w"
      projection={{ name: "globe" }}
      maxZoom={zoom}
      minZoom={zoom}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
    />
  );
};

export default MapboxGlobe;
