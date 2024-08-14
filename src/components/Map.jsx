import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useFlightData } from "../contexts/FlightDataContext";

import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const { flightData: data } = useFlightData(); // Destructure to get the array

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWNhdWxmaWVsZDk3IiwiYSI6ImNseGxyeWNycjAwbHoyanNrYXl1MHp2cncifQ.TnmB8BQ4SfL5wDpTerOGcQ";

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite", // Set the map style
      center: [-5.555, 54.555],
      zoom: 14, // Set the initial zoom level
    });

    mapRef.current.on("load", () => {
      if (data && Array.isArray(data) && data.length > 0) {
        console.log("Flight data loaded:", data);

        data.forEach((flight, index) => {
          if (!flight.longitude || !flight.latitude) {
            console.warn(`Invalid coordinates for flight:`, flight);
            return;
          }

          new mapboxgl.Marker()
            .setLngLat([flight.longitude, flight.latitude])
            .addTo(mapRef.current);
        });
      } else {
        console.warn(
          "No flight data available or flight data is not an array."
        );
      }
    });

    // Clean up on unmount
    return () => mapRef.current.remove();
  }, [data]);

  return (
    <div style={{ height: "100vh", width: "100%" }} ref={mapContainerRef} />
  );
};

export default MapboxExample;
