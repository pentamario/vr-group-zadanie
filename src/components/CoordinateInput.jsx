import React, { useState, useEffect } from 'react';

const CoordinateInput = ({ numCoordinates, onSubmit, initialCoordinates = [] }) => {
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
        <div className="absolute top-20 left-10 bg-white p-4 rounded-lg shadow-lg z-50">
            <h2 className="text-lg font-bold mb-2">Enter Coordinates</h2>
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
            {/* ✅ Submit button added for triggering the polyline */}
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
