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
    // Access the Mapbox token from the environment variable
    const MAPBOX_PUBLIC_TOKEN = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

    if (!MAPBOX_PUBLIC_TOKEN) {
      console.error("Mapbox token is not defined.");
      return;
    }

    mapboxgl.accessToken = MAPBOX_PUBLIC_TOKEN;

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

    const firstValidLocation = data?.find(
      (flight) => flight.longitude && flight.latitude
    );
    const initialCenter = firstValidLocation
      ? [firstValidLocation.longitude, firstValidLocation.latitude]
      : [-5.93012, 54.5964]; // Belfast default coordinates

    // Initialise the map with either the first valid location or Belfast
    initialiseMap(...initialCenter);

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
