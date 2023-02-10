import Map, { Marker } from "react-map-gl";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import data from "../data";

const MapboxGlobe = ({
  onMarkerClick,
}: {
  onMarkerClick?: (id: number) => any;
}) => {
  // const width = typeof window === "undefined" ? 100 : window.innerWidth;
  const zoom = 1;

  return (
    <Map
      mapboxAccessToken="pk.eyJ1Ijoic2FyYWgtb3BlbnN5c3RlbXNsYWIiLCJhIjoiY2t0dXV6cW8zMXhqMzJvcGlvaG5oc3U3NCJ9.fy80cmE0f565WsGzhkow-w"
      projection="globe"
      maxZoom={zoom}
      minZoom={zoom}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
      }}
    >
      {data.map((presenter, idx) => {
        return (
          <Marker
            longitude={presenter.location.longitude}
            latitude={presenter.location.latitude}
            key={presenter.name}
            anchor="bottom"
            onClick={() => onMarkerClick?.(idx)}
          >
            {/* <img src={`/${presenter.icon}`} /> */}
            <img src="/triangle.png" width={20} />
          </Marker>
        );
      })}
    </Map>
  );
};

export default MapboxGlobe;
