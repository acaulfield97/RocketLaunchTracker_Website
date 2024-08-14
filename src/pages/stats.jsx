import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Stats() {
  const [expandedFlight, setExpandedFlight] = useState(null);
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (state && state.flightDataPoints) {
      setExpandedFlight({ dataPoints: state.flightDataPoints });
    }
  }, [state]);

  return (
    <div className="mx-auto p-6 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Flight Details */}
        <div className="w-full md:w-2/3 overflow-auto max-h-[80vh] bg-white border border-gray-200 rounded-lg shadow-lg p-6">
          {expandedFlight ? (
            expandedFlight.dataPoints.length > 0 ? (
              expandedFlight.dataPoints.map((point, index) => (
                <div
                  key={index}
                  className="py-4 border-b border-gray-200 last:border-none"
                >
                  <div className="flex flex-col gap-4">
                    <div className="min-w-0 flex-auto">
                      {[
                        { label: "Date", key: "date" },
                        { label: "Altitude (m)", key: "altitude" },
                        { label: "Longitude", key: "longitude" },
                        { label: "Latitude", key: "latitude" },
                        { label: "Time", key: "time" },
                        { label: "Speed (kmph)", key: "speed" },
                        {
                          label: "Satellites In View",
                          key: "satellitesInView",
                        },
                        {
                          label: "Number Of Satellites Being Tracked",
                          key: "numberOfSatellitesBeingTracked",
                        },
                        { label: "Fix Quality", key: "fixQuality" },
                      ].map(({ label, key }) => (
                        <p
                          key={key}
                          className="text-sm leading-6 text-gray-800"
                        >
                          <span className="font-semibold text-blue-600">
                            {label}:
                          </span>{" "}
                          {point[key] !== undefined && point[key] !== null
                            ? point[key]
                            : "N/A"}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No data points available for this flight.
              </p>
            )
          ) : (
            <p className="text-gray-500 text-center">
              Select a flight to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
