import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const getFlightData = async () => {
  try {
    const launchDataCollectionRef = collection(db, "launch_data");

    // Fetch documents from the collection
    const flightDocuments = await getDocs(launchDataCollectionRef);

    let flightData = [];

    flightDocuments.forEach((doc) => {
      flightData.push({ flightName: doc.id, id: doc.id });
    });
    return flightData;
  } catch (error) {
    console.error("Error fetching flight data:", error);
    // Show a browser alert to the user
    alert("Unable to fetch flight data. Please try again later.");
  }
};

export const getFlightDataPoints = async (flightId) => {
  try {
    const launchDataPointsCollectionRef = collection(
      db,
      `launch_data/${flightId}/launch_data_points`
    );
    const launchDataPointsDocs = await getDocs(launchDataPointsCollectionRef);

    let flightDataPoints = [];

    launchDataPointsDocs.forEach((pointDoc) => {
      flightDataPoints.push(pointDoc.data());
    });
    return flightDataPoints;
  } catch (error) {
    alert(
      "Error",
      "Unable to fetch flight data points. Please try again later.",
      [{ text: "OK" }]
    );
  }
};
