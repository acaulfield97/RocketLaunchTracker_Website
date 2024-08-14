import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RawData() {
  const [expandedFlight, setExpandedFlight] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("time"); // Default sort by time
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (state && state.flightDataPoints) {
      const sortedDataPoints = sortDataPoints(
        state.flightDataPoints,
        sortCriteria
      );
      setExpandedFlight({ dataPoints: sortedDataPoints });
    }
  }, [state, sortCriteria]);

  const sortDataPoints = (dataPoints, criteria) => {
    return [...dataPoints].sort((a, b) => {
      switch (criteria) {
        case "time":
          return new Date(a.time) - new Date(b.time);
        case "speed-asc":
          return a.speed - b.speed; // Ascending order
        case "speed-desc":
          return b.speed - a.speed; // Descending order
        case "altitude-asc":
          return a.altitude - b.altitude; // Ascending order
        case "altitude-desc":
          return b.altitude - a.altitude; // Descending order
        default:
          return 0;
      }
    });
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  return (
    <div className="mx-auto p-6 max-w-7xl">
      {/* Sorting Dropdown */}
      <div className="w-full flex justify-end mb-4 md:w-auto">
        <select
          className="border border-gray-300 rounded-lg p-2 text-sm md:text-base w-auto font-zendots"
          value={sortCriteria}
          onChange={handleSortChange}
        >
          <option value="time" className="font-zendots">
            Sort by Time
          </option>
          <option value="speed-asc" className="font-zendots">
            Sort by Speed (Ascending)
          </option>
          <option value="speed-desc" className="font-zendots">
            Sort by Speed (Descending)
          </option>
          <option value="altitude-asc" className="font-zendots">
            Sort by Altitude (Ascending)
          </option>
          <option value="altitude-desc" className="font-zendots">
            Sort by Altitude (Descending)
          </option>
        </select>
      </div>

      {/* Flight Details */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full overflow-auto max-h-[80vh] bg-white border border-gray-200 rounded-lg shadow-lg p-6">
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
                          className="text-sm leading-6 text-gray-800 font-zendots"
                        >
                          <span className=" text-accent font-zendots">
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
              <p className="text-gray-500 text-center font-zendots">
                No data points available for this flight.
              </p>
            )
          ) : (
            <p className="text-gray-500 text-center font-zendots">
              Select a flight to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
