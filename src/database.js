import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const getFlightData = async () => {
  const launchDataCollectionRef = collection(db, "launch_data");
  const flightDocuments = await getDocs(launchDataCollectionRef);

  let flightData = [];
  flightDocuments.forEach((doc) => {
    flightData.push({ flightName: doc.id, id: doc.id });
  });

  return flightData;
};

export const getFlightDataPoints = async (flightId) => {
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
};
