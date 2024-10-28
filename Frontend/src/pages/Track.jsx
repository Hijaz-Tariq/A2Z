import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import Navbar from "../components/Navbar";

const Track = () => {
  const [parcel, setParcel] = useState({});
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
      } catch (error) {
        console.error("Error fetching parcel data:", error);
      }
    };

    getParcel();
  }, [parcelId]);

  const radius = 20; // Radius of the circles
  const spacing = 85; // Spacing between circles
  const startX = 60; // Starting X position
  const centerY = 50; // Y position of the circles

  // Calculate the positions of the circles
  const circles = Array.from({ length: 4 }, (_, i) => ({
    cx: startX + i * spacing,
    cy: centerY,
  }));

  // Define status to index mapping
  const statusToIndex = {
    0: 0, // e.g., pending
    1: 1, // e.g., in_transit
    2: 2, // e.g., delivered
    3: 3, // e.g., completed
  };

  const statusIndex =
    statusToIndex[parcel.status] !== undefined
      ? statusToIndex[parcel.status]
      : -1;
  const statusLabels = [
    "Picked up",
    "In Transit",
    "Out of delivery",
    "Delivered",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <h2 className="p-2">
          Tracking no. <br />{" "}
          {parcel.parcelTrack +
            `B` +
            parcel.oliveQuantity +
            `A` +
            parcel.oilQuantity +
            `-` +
            parcel.rState}
        </h2>
        <div className="flex justify-center p-2">
          <svg width="400" height="100">
            <rect x="7" y="0" width="360" height="100" fill="white" rx="10" />
            {/* Draw lines with a border */}
            {circles.map((circle, index) => {
              if (index < circles.length - 1) {
                const nextCircle = circles[index + 1];
                return (
                  <>
                    <line
                      key={`border-line-${index}`}
                      x1={circle.cx}
                      y1={circle.cy}
                      x2={nextCircle.cx}
                      y2={nextCircle.cy}
                      stroke="gray"
                      strokeWidth="4"
                    />
                    <line
                      key={`line-${index}`}
                      x1={circle.cx}
                      y1={circle.cy}
                      x2={nextCircle.cx}
                      y2={nextCircle.cy}
                      stroke="black"
                      strokeWidth="1"
                    />
                  </>
                );
              }
              return null;
            })}

            {/* Draw circles */}
            {circles.map((circle, index) => (
              <circle
                key={`circle-${index}`}
                cx={circle.cx}
                cy={circle.cy}
                r={radius}
                fill={index === statusIndex ? "rgb(233, 235, 119)" : "lightblue"}
                stroke="grey"
                strokeWidth="3"
              />
            ))}

            {/* Checkmark in the circle corresponding to status */}
            {statusIndex >= 0 && (
              <text
                x={circles[statusIndex].cx}
                y={circles[statusIndex].cy + 5}
                fontSize="30"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                ✓
              </text>
            )}
            {circles.map((circle, index) => (
              <text
                key={`label-${index}`}
                x={circle.cx}
                y={circle.cy + radius + 15}
                fontSize="12"
                fill="black"
                textAnchor="middle"
              >
                {statusLabels[index]}
              </text>
            ))}
          </svg>
        </div>

        <div className="bg-white text-black p-4 m-3 w-[360px]">
          <h1 className="text-xl">{statusLabels[parcel.status]}</h1>
          <br />
          <span>{new Date().toLocaleDateString()}</span>
          <br />
        </div>
      </main>

      <footer className="bg-[#e9eb77] text-[#444] ">
        <div className="h-[50px] flex items-center justify-between p-[6px]">
          <div className="flex flex-col">
            <span>info@a2z-express.com</span>
          </div>
          <div className="flex flex-col">
            <span>&copy; copyright 2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Track;
