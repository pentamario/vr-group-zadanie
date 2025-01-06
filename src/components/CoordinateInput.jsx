import React, { useState, useEffect } from 'react';

const CoordinateInput = ({ numCoordinates, onSubmit }) => {
    const [coordinates, setCoordinates] = useState([]);

    // ✅ Reset coordinates on change of numCoordinates
    useEffect(() => {
        setCoordinates(
            Array.from({ length: numCoordinates }, () => ({
                latitude: '',
                longitude: '',
            }))
        );
    }, [numCoordinates]);

    const handleInputChange = (index, field, value) => {
        const updatedCoordinates = [...coordinates];
        updatedCoordinates[index] = {
            ...updatedCoordinates[index],
            [field]: value
        };
        setCoordinates(updatedCoordinates);
    };

    const handleSubmit = () => {
        const parsedCoordinates = coordinates.map(coord => ({
            latitude: parseFloat(coord.latitude),
            longitude: parseFloat(coord.longitude),
        }));

        // ✅ Send data back to MapComponent
        onSubmit(parsedCoordinates);
    };

    return (
        <div className="absolute top-20 LEFT-10 bg-white p-4 rounded-lg shadow-lg z-50">
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
