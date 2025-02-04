import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import useAzimuth from '../hooks/useAzimuth';
import useDistance from '../hooks/useDistance';
import useAngle from '../hooks/useAngle';
import UnitSelector from './UnitSelector';
import { Plus, Minus, CornerDownLeft } from "lucide-react";

const CoordinateInput = ({ numCoordinates, onSubmit, initialCoordinates = [], onStartDrawing, onCoordinateOptionSelect }) => {
    const [coordinates, setCoordinates] = useState([]);
    const [points, setPoints] = useState("2");
    const [distanceUnit, setDistanceUnit] = useState('km');
    const [azimuthUnit, setAzimuthUnit] = useState('deg'); 
    const [angleUnit, setAngleUnit] = useState('deg');
    const azimuth = useAzimuth(coordinates, azimuthUnit);
    const distance = useDistance(coordinates, distanceUnit);
    const angle = useAngle(coordinates, angleUnit);

    useEffect(() => {
        if (initialCoordinates.length > 0) {
            setCoordinates(initialCoordinates);
        } else {
            setCoordinates(
                Array.from({ length: numCoordinates }, () => ({
                    latitude: '',
                    longitude: '',
                }))
            );
        }
    }, [initialCoordinates, numCoordinates]);

    const handleInputChange = (index, field, value) => {
        const updatedCoordinates = [...coordinates];
        updatedCoordinates[index] = {
            ...updatedCoordinates[index],
            [field]: value
        };
        setCoordinates(updatedCoordinates);
    };

    // ✅ Submit button required to trigger map update
    const handleSubmit = () => {
        const parsedCoordinates = coordinates.map(coord => ({
            latitude: parseFloat(coord.latitude),
            longitude: parseFloat(coord.longitude),
        }));

        onSubmit(parsedCoordinates);  // ✅ Only updates map when submitted
    };

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
                        onChange={(e) => handleInputChange(index, 'latitude', e.target.value)}
                        className="border p-2 w-full mb-1"
                    />
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={coord.longitude}
                        onChange={(e) => handleInputChange(index, 'longitude', e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
            ))}
            <div className="w-full items-center justify-between flex pt-2">
                <button
                    onClick={() => {
                        const newPoints = points === "2" ? "3" : "2";
                        setPoints(newPoints);
                        onStartDrawing(parseInt(newPoints, 10));
                    }}
                    className="border rounded-full p-2 flex items-center justify-center"
                    title={points === "2" ? "Switch to 3 Coordinates" : "Switch to 2 Coordinates"}
                >
                    {points === "2" ? <Plus  /> : <Minus  />}
                </button>
                <button 
                    onClick={handleSubmit} 
                    className="border rounded-full p-2 flex items-center justify-center"
                    title="Submit Coordinates"
                >
                    <CornerDownLeft />
                </button>
            </div>
            <button 
                onClick={() => {
                    setCoordinates(prev => prev.map(() => ({ latitude: "", longitude: "" }))); // Clear inputs
                    if (points === "2") {
                        onStartDrawing(2);
                    }
                    else if (points === "3") { 
                        onStartDrawing(3);
                    }
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
                                {value: "km", label: "Km"},
                                {value: "m", label: "M"}
                            ]}
                        />
  
                        <UnitSelector
                            label="Azimuth"
                            value={azimuth.azimuth1to2}
                            unit={azimuthUnit}
                            onUnitChange={setAzimuthUnit}
                            options={[
                                {value: "deg", label: "Deg"},
                                {value: "rad", label: "Rad"}
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
                                {value: "km", label: "Km"},
                                {value: "m", label: "M"}
                            ]}
                        />

                        <UnitSelector
                            label="Azimuth"
                            value={azimuth.overallAzimuth}
                            unit={azimuthUnit}
                            onUnitChange={setAzimuthUnit}
                            options={[
                                {value: "deg", label: "Deg"},
                                {value: "rad", label: "Rad"}
                            ]}
                        />

                        <UnitSelector
                            label="Angle"
                            value={angle.angle}
                            unit={angleUnit}
                            onUnitChange={setAngleUnit}
                            options={[
                                {value: "deg", label: "Deg"},
                                {value: "rad", label: "Rad"}
                            ]}
                        />
                    </>
                )}
            </div>

        </div>
    );
};

export default CoordinateInput;
