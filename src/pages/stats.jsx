import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Stats.css";

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
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <div className="list-group">
              {flights.length > 0 ? (
                flights.map((flight) => (
                  <button
                    key={flight.id}
                    className={`list-group-item list-group-item-action ${
                      expandedFlight && expandedFlight.flightId === flight.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleFlightClick(flight.id)}
                  >
                    {flight.flightName}
                  </button>
                ))
              ) : (
                <p>No flight data available.</p>
              )}
            </div>
          </div>
          <div className="col-md-8">
            {expandedFlight && (
              <div className="overflow-auto" style={{ maxHeight: "80vh" }}>
                {expandedFlight.dataPoints.length > 0 ? (
                  expandedFlight.dataPoints.map((point, index) => (
                    <div key={index} className="border p-3 mb-2 rounded">
                      <p>
                        <strong>Date:</strong> {point.date}
                      </p>
                      <p>
                        <strong>Altitude:</strong> {point.altitude}
                      </p>
                      <p>
                        <strong>Longitude:</strong> {point.longitude}
                      </p>
                      <p>
                        <strong>Latitude:</strong> {point.latitude}
                      </p>
                      <p>
                        <strong>Time:</strong> {point.time}
                      </p>
                      <p>
                        <strong>Speed:</strong> {point.speed}
                      </p>
                      <p>
                        <strong>Satellites In View:</strong>{" "}
                        {point.satellitesInView}
                      </p>
                      <p>
                        <strong>Satellites Being Tracked:</strong>{" "}
                        {point.numberOfSatellitesBeingTracked}
                      </p>
                      <p>
                        <strong>Fix Quality:</strong> {point.fixQuality}
                      </p>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>No data points available for this flight.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
