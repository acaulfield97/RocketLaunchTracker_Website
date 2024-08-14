import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useFlightData } from "../contexts/FlightDataContext";
import markerImage from "../assets/icons/rocket_icon_purple.png";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const { flightData: data } = useFlightData();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWNhdWxmaWVsZDk3IiwiYSI6ImNseGxyeWNycjAwbHoyanNrYXl1MHp2cncifQ.TnmB8BQ4SfL5wDpTerOGcQ";

    // Function to initialize the map
    const initialiseMap = (lng, lat) => {
      if (mapContainerRef.current) {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/standard-satellite",
          center: [lng, lat],
          zoom: 14,
        });

        mapRef.current.on("load", () => {
          mapRef.current.loadImage(markerImage, (error, image) => {
            if (error) throw error;
            mapRef.current.addImage("custom-marker", image);

            if (data && Array.isArray(data) && data.length > 0) {
              console.log("Flight data loaded:", data);

              // Add layer with custom marker image
              mapRef.current.addLayer({
                id: "markers",
                type: "symbol",
                source: {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    features: data.map((flight) => ({
                      type: "Feature",
                      geometry: {
                        type: "Point",
                        coordinates: [flight.longitude, flight.latitude],
                      },
                      properties: {},
                    })),
                  },
                },
                layout: {
                  "icon-image": "custom-marker",
                  "icon-size": 0.1,
                  "icon-allow-overlap": true,
                  "icon-ignore-placement": true,
                },
              });
            } else {
              console.warn(
                "No flight data available or flight data is not an array."
              );
            }
          });
        });
      } else {
        console.error("Map container is not available.");
      }
    };

    // Check if geolocation is available and get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          initialiseMap(longitude, latitude);
        },
        (error) => {
          console.error("Error retrieving location:", error);
          initialiseMap(-74.006, 40.7128); // New York City as fallback
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      initialiseMap(-74.006, 40.7128); // New York City as fallback
    }

    // Cleanup on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [data]);

  return (
    <div style={{ height: "100%", width: "100%" }} ref={mapContainerRef} />
  );
};

export default Map;
