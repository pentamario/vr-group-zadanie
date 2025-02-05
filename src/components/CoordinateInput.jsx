import React from "react";
import UnitSelector from "./UnitSelector";
import { Plus, Minus, CornerDownLeft } from "lucide-react";
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
        <div className="absolute top-10 right-10 bg-white p-4 rounded-lg shadow-lg z-50">
            <h2 className="text-lg font-bold mb-2">Draw or Input Coordinates</h2>
            {coordinates.map((coord, index) => (
                <div key={index} className="mb-2">
                    <p className="font-semibold">Point {index + 1}</p>
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={coord.latitude}
                        onChange={(e) => handleInputChange(index, "latitude", e.target.value)}
                        className="border p-2 w-full mb-1"
                    />
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={coord.longitude}
                        onChange={(e) => handleInputChange(index, "longitude", e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
            ))}
            <div className="w-full flex items-center justify-between pt-2">
                <button
                    onClick={() => {
                        const newPoints = points === "2" ? "3" : "2";
                        setPoints(newPoints);
                        onStartDrawing(parseInt(newPoints, 10));
                    }}
                    className="border rounded-full p-2 flex items-center justify-center"
                    title={points === "2" ? "Switch to 3 Coordinates" : "Switch to 2 Coordinates"}
                >
                    {points === "2" ? <Plus /> : <Minus />}
                </button>
                <button
                    onClick={() => validateAndSubmit(onSubmit)}
                    className="border rounded-full p-2 flex items-center justify-center"
                    title="Submit Coordinates"
                >
                    <CornerDownLeft />
                </button>
            </div>
            <button
                onClick={() => {
                    setCoordinates((prev) => prev.map(() => ({ latitude: "", longitude: "" })));
                    onStartDrawing(parseInt(points, 10));
                }}
                className="border rounded-full p-2 flex items-center justify-center bg-red-500 text-white"
                title="Clear Fields"
            >
                Clear Fields
            </button>
            <div className="pt-4 space-y-4">
                {points === "2" && (
                    <>
                        <UnitSelector
                            label="Distance"
                            value={distance.totalDistance}
                            unit={distanceUnit}
                            onUnitChange={setDistanceUnit}
                            options={[
                                { value: "km", label: "Km" },
                                { value: "m", label: "M" },
                            ]}
                        />
                        <UnitSelector
                            label="Azimuth"
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
                            label="Distance"
                            value={distance.totalDistance}
                            unit={distanceUnit}
                            onUnitChange={setDistanceUnit}
                            options={[
                                { value: "km", label: "Km" },
                                { value: "m", label: "M" },
                            ]}
                        />
                        <UnitSelector
                            label="Azimuth"
                            value={azimuth.overallAzimuth}
                            unit={azimuthUnit}
                            onUnitChange={setAzimuthUnit}
                            options={[
                                { value: "deg", label: "Deg" },
                                { value: "rad", label: "Rad" },
                            ]}
                        />
                        <UnitSelector
                            label="Angle"
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
    );
};

export default CoordinateInput;
