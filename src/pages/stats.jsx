import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function Stats() {
  const [flights, setFlights] = useState([]);
  const [expandedFlight, setExpandedFlight] = useState(null);

  useEffect(() => {
    const getFlightData = async () => {
      const launchDataCollectionRef = collection(db, "launch_data");
      const flightDocuments = await getDocs(launchDataCollectionRef);

      let flightData = [];

      for (const doc of flightDocuments.docs) {
        flightData.push({ flightName: doc.id, id: doc.id }); // Store the document ID and name
      }

      setFlights(flightData);
    };

    getFlightData();
  }, []);

  const handleFlightClick = async (flightId) => {
    if (expandedFlight && expandedFlight.flightId === flightId) {
      setExpandedFlight(null); // Collapse if the same flight is clicked again
      return;
    }

    const launchDataPointsCollectionRef = collection(
      db,
      `launch_data/${flightId}/launch_data_points`
    );
    const launchDataPointsDocs = await getDocs(launchDataPointsCollectionRef);

    let flightDataPoints = [];

    launchDataPointsDocs.forEach((pointDoc) => {
      flightDataPoints.push(pointDoc.data());
    });

    setExpandedFlight({ flightId, dataPoints: flightDataPoints });
  };

  return (
    <div className="mx-auto p-4 ">
      <div className="flex flex-row gap-4 ">
        {/* Flight List */}
        <div className="w-full md:w-1/3 border border-gray-200 rounded-lg shadow-sm">
          {flights.length > 0 ? (
            <ul role="list" className="divide-y divide-gray-100 ">
              {flights.map((flight) => (
                <li
                  key={flight.id}
                  className="py-4 hover:bg-gray-50 font-zendots"
                >
                  <button
                    className={`text-sm text-gray-900 leading-6 w-full text-left ${
                      expandedFlight && expandedFlight.flightId === flight.id
                        ? "bg-gray-100 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleFlightClick(flight.id)}
                  >
                    {flight.flightName}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 p-4">No flight data available.</p>
          )}
        </div>

        {/* Flight Details */}
        <div className="w-full md:w-2/3 overflow-auto max-h-[80vh] bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          {expandedFlight ? (
            expandedFlight.dataPoints.length > 0 ? (
              expandedFlight.dataPoints.map((point, index) => (
                <div key={index} className="py-4 border-b last:border-none">
                  <div className="flex gap-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm leading-6 text-gray-900 font-zendots">
                        <span className="font-zendots text-accent">Date:</span>{" "}
                        {point.date}
                      </p>
                      <p className="text-sm leading-6 text-gray-900 font-zendots">
                        <span className="font-zendots text-accent">
                          Altitude (m):
                        </span>{" "}
                        {point.altitude}
                      </p>
                      <p className="text-sm leading-6 text-gray-900 font-zendots">
                        <span className="font-zendots text-accent">
                          Longitude:
                        </span>{" "}
                        {point.longitude}
                      </p>
                      <p className="text-sm leading-6 text-gray-900 font-zendots">
                        <span className="font-zendots text-accent">
                          Latitude:
                        </span>{" "}
                        {point.latitude}
                      </p>
                      <p className="text-sm leading-6 text-gray-900 font-zendots">
                        <span className="font-zendots text-accent">Time:</span>{" "}
                        {point.time}
                      </p>
                      <p className="text-sm leading-6 text-gray-900 font-zendots">
                        <span className="font-zendots text-accent">
                          Speed (kmph):
                        </span>{" "}
                        {point.speed}
                      </p>
                      <p className="text-sm leading-6 text-gray-900 font-zendots">
                        <span className="font-zendots text-accent">
                          Satellites In View:
                        </span>{" "}
                        {point.satellitesInView}
                      </p>
                      <p className="text-sm leading-6 text-gray-900 font-zendots">
                        <span className="font-zendots text-accent">
                          Satellites Being Tracked:
                        </span>{" "}
                        {point.numberOfSatellitesBeingTracked}
                      </p>
                      <p className="text-sm leading-6 text-gray-900 font-zendots">
                        <span className="font-zendots text-accent">
                          Fix Quality:
                        </span>{" "}
                        {point.fixQuality}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No data points available for this flight.
              </p>
            )
          ) : (
            <p className="text-gray-500">Select a flight to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
