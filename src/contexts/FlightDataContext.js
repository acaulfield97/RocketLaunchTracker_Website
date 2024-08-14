import React, { createContext, useState, useContext } from "react";

const FlightDataContext = createContext();

export const FlightDataProvider = ({ children }) => {
  const [flightData, setFlightData] = useState(null);

  return (
    <FlightDataContext.Provider value={{ flightData, setFlightData }}>
      {children}
    </FlightDataContext.Provider>
  );
};

export const useFlightData = () => useContext(FlightDataContext);
