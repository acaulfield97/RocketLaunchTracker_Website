import React, { useState, useEffect } from "react";
import { useFlightData } from "../contexts/FlightDataContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getFlightData, getFlightDataPoints } from "../database";
import { useNavigate } from "react-router-dom";
import Map from "../components/Map";

export default function Graphs() {
  const [flights, setFlights] = useState([]);
  const [expandedFlight, setExpandedFlight] = useState(null);
  const { setFlightData } = useFlightData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlightData = async () => {
      const flightData = await getFlightData();
      setFlights(flightData);
    };

    fetchFlightData();
  }, []);

  const handleFlightClick = async (flightId) => {
    const flightDataPoints = await getFlightDataPoints(flightId);
    setExpandedFlight({ flightId, dataPoints: flightDataPoints });
    setFlightData(flightDataPoints); // Set data in context
    navigate("/graphs");
  };

  const handleViewRawData = async (flightId) => {
    const flightDataPoints = await getFlightDataPoints(flightId);
    navigate("/rawdata", { state: { flightDataPoints } }); // Pass data to raw data page
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "No time available";
    const [dateStr, timeStr] = timestamp.split("T");
    if (!timeStr) return "Invalid Time";
    const time = timeStr.split(".")[0].replace(/:/g, "");
    return `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}`;
  };

  const formatData = (flightData) =>
    flightData.map((entry) => ({
      time: formatTime(entry.timestamp),
      altitude: entry.altitude,
      speed: entry.speed,
      satellitesInView: entry.satellitesInView,
      satellitesBeingTracked: entry.numberOfSatellitesBeingTracked,
    }));

  const formattedData = expandedFlight
    ? formatData(expandedFlight.dataPoints)
    : [];

  return (
    <div className="w-full p-4 bg-gray-50">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Flight List */}
        <div className="w-full md:w-1/3 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 font-astro">
              Flight List
            </h3>
          </div>
          {flights.length > 0 ? (
            <ul role="list" className="divide-y divide-gray-200">
              {flights.map((flight) => (
                <li
                  key={flight.id}
                  className="py-4 px-6 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-center">
                    <button
                      className={`font-zendots text-sm text-gray-900 leading-6 w-full text-left ${
                        expandedFlight && expandedFlight.flightId === flight.id
                          ? "bg-gray-100 rounded-md"
                          : ""
                      }`}
                      onClick={() => handleFlightClick(flight.id)}
                    >
                      {flight.flightName}
                    </button>
                    <button
                      className="ml-4 text-accent hover:underline font-zendots"
                      onClick={() => handleViewRawData(flight.id)}
                    >
                      View Raw Data
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 p-4 text-center font-zendots">
              No flight data available.
            </p>
          )}
        </div>

        {/* Graphs and Map Container */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Satellites In View / Satellites Tracked Graph */}
          <div>
            <h4 className="text-xl text-darkPurple font-zendots">
              Satellites In View / Satellites Tracked
            </h4>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={formattedData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="satellitesInView"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Satellites In View"
                  />
                  <Line
                    type="monotone"
                    dataKey="satellitesBeingTracked"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Satellites Tracked"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Speed Graph */}
          <div>
            <h4 className="text-xl font-zendots text-darkPurple">Speed</h4>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={formattedData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="speed"
                    stroke="#ff7300"
                    fill="#ff7300"
                    name="Speed (km/h)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Altitude Graph */}
          <div>
            <h4 className="text-xl font-zendots text-darkPurple">Altitude</h4>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={formattedData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="altitude"
                    stroke="#387908"
                    fill="#387908"
                    name="Altitude (m)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Map Component */}
          <div>
            <h4 className="text-xl font-zendots text-darkPurple">Map</h4>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
              <div style={{ height: "400px" }}>
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
