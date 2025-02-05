import React from "react";
import UnitSelector from "./UnitSelector";
import { Plus, Minus, CornerDownLeft, Trash2 } from "lucide-react";
import useCoordinateManager from "../hooks/useCoordinateManager";

const CoordinateInput = ({ numCoordinates, onSubmit, initialCoordinates, onStartDrawing }) => {
    const {
        coordinates,
        setCoordinates, // Ensure this is destructured
        points,
        setPoints,
        distanceUnit,
        setDistanceUnit,
        azimuthUnit,
        setAzimuthUnit,
        angleUnit,
        setAngleUnit,
        handleInputChange,
        validateAndSubmit,
        azimuth,
        distance,
        angle,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        } = useCoordinateManager(numCoordinates, initialCoordinates);
 
    return (
        <div className="absolute top-5 right-5 bg-white rounded-xl w-[25%] border-2 border-gray-300 shadow-xl z-50 font-poppins text-gray-600">
            <div className="p-5 space-y-3">
                <h2 className="text-2xl font-poppins font-medium">Draw or Input Coordinates</h2>
                <div className="pt-2 space-y-3">
                    {coordinates.map((coord, index) => (
                        <div key={index} className="mb-2 space-y-2">
                            <span className="font-semibold text-xl">Point {index + 1}</span>
                            <input
                                type="text"
                                placeholder="Latitude"
                                value={coord.latitude}
                                onChange={(e) => handleInputChange(index, "latitude", e.target.value)}
                                className="border rounded-xl p-2 w-full mb-1 focus:outline-none focus:ring-1 focus:ring-gray-500"
                            />
                            <input
                                type="text"
                                placeholder="Longitude"
                                value={coord.longitude}
                                onChange={(e) => handleInputChange(index, "longitude", e.target.value)}
                                className="border rounded-xl p-2 w-full mb-1 focus:outline-none focus:ring-1 focus:ring-gray-500"
                            />
                        </div>
                    ))}
                </div>

                <div className="w-full flex items-center justify-between pb-1">
                    <button
                        onClick={() => {
                            setCoordinates((prev) => prev.map(() => ({ latitude: "", longitude: "" })));
                            onStartDrawing(parseInt(points, 10));
                        }}
                        className="border rounded-full p-2 flex items-center justify-center bg-red-500 text-white hover:border-gray-400 hover:shadow-md"
                        title="Clear Fields"
                    >
                        <Trash2 />
                    </button>

                    <button
                        onClick={() => validateAndSubmit(onSubmit)}
                        className="border rounded-full p-2 flex items-center justify-center hover:border-gray-400 hover:shadow-md"
                        title="Submit Coordinates"
                    >
                        <CornerDownLeft />
                    </button>
                </div>

                <div className="border-t border-gray-300 my-4"></div>

                <div className="flex items-center justify-center">
                    <button
                        onClick={() => {
                            const newPoints = points === "2" ? "3" : "2";
                            setPoints(newPoints);
                            onStartDrawing(parseInt(newPoints, 10));
                        }}
                        className="border rounded-full p-2 flex items-center justify-center hover:border-gray-400 hover:shadow-md"
                        title={points === "2" ? "Switch to 3 Coordinates" : "Switch to 2 Coordinates"}
                    >
                        {points === "2" ? <Plus /> : <Minus />}
                    </button>
                </div>
                
                <div className="space-y-2">
                    {points === "2" && (
                        <>
                            <UnitSelector
                                label="Distance:"
                                value={distance.totalDistance}
                                unit={distanceUnit}
                                onUnitChange={setDistanceUnit}
                                options={[
                                    { value: "km", label: "Km" },
                                    { value: "m", label: "M" },
                                ]}
                            />
                            <UnitSelector
                                label="Azimuth:"
                                value={azimuth.azimuth1to2}
                                unit={azimuthUnit}
                                onUnitChange={setAzimuthUnit}
                                options={[
                                    { value: "deg", label: "Deg" },
                                    { value: "rad", label: "Rad" },
                                ]}
                            />
                        </>
                    )}
                    {points === "3" && (
                        <>
                            <UnitSelector
                                label="Distance:"
                                value={distance.totalDistance}
                                unit={distanceUnit}
                                onUnitChange={setDistanceUnit}
                                options={[
                                    { value: "km", label: "Km" },
                                    { value: "m", label: "M" },
                                ]}
                            />
                            <UnitSelector
                                label="Azimuth:"
                                value={azimuth.overallAzimuth}
                                unit={azimuthUnit}
                                onUnitChange={setAzimuthUnit}
                                options={[
                                    { value: "deg", label: "Deg" },
                                    { value: "rad", label: "Rad" },
                                ]}
                            />
                            <UnitSelector
                                label="Angle:"
                                value={angle.angle}
                                unit={angleUnit}
                                onUnitChange={setAngleUnit}
                                options={[
                                    { value: "deg", label: "Deg" },
                                    { value: "rad", label: "Rad" },
                                ]}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoordinateInput;
