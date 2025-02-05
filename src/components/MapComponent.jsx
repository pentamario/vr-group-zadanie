import React, { useEffect } from 'react';
import useMapControls from '../hooks/useMapControls';
import useMapManager from '../hooks/useMapManager';
import ZoomButtons from './ZoomButtons';
import CoordinateInput from './CoordinateInput';

const MapComponent = () => {
    const { mapRef, handleZoomIn, handleZoomOut, mapReady } = useMapControls();
    const {
        numCoordinates,
        coordinates,
        handleDrawingOptionSelect,
        handleCoordinateOptionSelect,
        handleCoordinateSubmit
    } = useMapManager(mapRef);

    // 🟢 Automatically trigger onStartDrawing when the component mounts
    useEffect(() => {
        handleDrawingOptionSelect(2); // Adjust the value if needed
    }, []); // Empty dependency array ensures it runs only once

    return (
        <div className="relative h-screen">
            {numCoordinates && (
                <CoordinateInput 
                    numCoordinates={numCoordinates} 
                    initialCoordinates={coordinates} 
                    onSubmit={handleCoordinateSubmit} 
                    onStartDrawing={handleDrawingOptionSelect} 
                    onCoordinateOptionSelect={handleCoordinateOptionSelect} 
                />
            )}

            <div 
                id="map-container" 
                className="absolute inset-0 h-full w-full z-0"
            />

            <ZoomButtons 
                handleZoomIn={handleZoomIn} 
                handleZoomOut={handleZoomOut} 
                mapReady={mapReady}
            />
        </div>
    );
};

export default MapComponent;
