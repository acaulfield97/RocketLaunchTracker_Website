import React from "react";

export default function Home() {
  return (
    <div className="w-full h-screen bg-gray-50 flex justify-center">
      <div className="flex flex-col items-center space-y-6  mt-32">
        {/* Welcome Message */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 max-w-2xl text-center">
          <h1 className="text-3xl font-semibold text-darkPurple font-astro">
            Welcome to the Rocket Tracker Dashboard
          </h1>
        </div>

        {/* How it works section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-darkPurple mb-4 font-astro">
            How It Works
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 font-zendots">
              Explore the{" "}
              <span className="text-accent font-zendots">Flight Charts</span>{" "}
              page for visualisation of your flight data.
            </p>
            <p className="text-gray-700 font-zendots">
              Gain insights on altitude, speed, satellite information, as well
              as a detailed map of your rocket's flight path.
            </p>
            <p className="text-gray-700 font-zendots">
              Start by selecting a flight from the sidebar list to see more
              detailed graphs and information.
            </p>
            <p className="text-gray-700 font-zendots">
              For a more in-depth analysis, check out the{" "}
              <span className="text-accent font-zendots">Raw Data</span>{" "}
              section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
