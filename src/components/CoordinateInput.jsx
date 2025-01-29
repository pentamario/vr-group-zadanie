import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';

const CoordinateInput = ({ numCoordinates, onSubmit, initialCoordinates = [], onStartDrawing, onCoordinateOptionSelect }) => {
    const [coordinates, setCoordinates] = useState([]);

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
            <div className="flex justify-between items-center py-2">
                <select
                    id="draw-options"
                    className="p-2 border rounded-lg bg-white w-24"
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '2') onStartDrawing(2);
                        else if (value === '3') onStartDrawing(3);
                    }}
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="2">2 Points</option>
                    <option value="3">3 Points</option>
                </select>
                <select
                    className="p-2 border rounded-lg bg-white w-24"
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="Km">Km</option>
                    <option value="M">M</option>
                </select>
                <select
                    className="p-2 border rounded-lg bg-white w-24"
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="Km">Rd</option>
                    <option value="M">Deg</option>
                </select>
            </div>
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
            <button 
                onClick={handleSubmit} 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Submit Coordinates
            </button>
        </div>
    );
};

export default CoordinateInput;
