import React, { useState } from 'react';
import Navbar from './Navbar';
import useMapControls from '../hooks/useMapControls';
import useDraw from '../hooks/useDraw';
import ZoomButtons from './ZoomButtons';
import CoordinateInput from './CoordinateInput'; 
import useInputCoordinates from '../hooks/useInputCoordinates';  // ✅ New Import

const MapComponent = () => {
    const { mapRef, handleZoomIn, handleZoomOut, mapReady } = useMapControls();
    const { startDrawing } = useDraw(mapRef);
    const { drawCoordinates } = useInputCoordinates(mapRef); // ✅ Hook Used Here
    const [numCoordinates, setNumCoordinates] = useState(null);

    const handleCoordinateOptionSelect = (option) => {
        if (option === 'Two Coordinates') {
            setNumCoordinates(2);
        } else if (option === 'Three Coordinates') {
            setNumCoordinates(3);
        } else {
            setNumCoordinates(null);
        }
    };

    // ✅ Calls the new hook
    const handleCoordinateSubmit = (coordinates) => {
        drawCoordinates(coordinates);
    };

    return (
        <div className="relative h-screen w-full">
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar 
                    onStartDrawing={startDrawing}
                    onCoordinateOptionSelect={handleCoordinateOptionSelect} 
                />
            </div>
            {numCoordinates && (
                <CoordinateInput 
                    numCoordinates={numCoordinates} 
                    onSubmit={handleCoordinateSubmit} 
                />
            )}
            <ZoomButtons 
                handleZoomIn={handleZoomIn} 
                handleZoomOut={handleZoomOut} 
                mapReady={mapReady}
            />
            <div 
                id="map-container" 
                className="absolute inset-0 h-full w-full z-0"
            />
        </div>
    );
};

export default MapComponent;
