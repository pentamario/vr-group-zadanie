import React from 'react';
import Navbar from './Navbar';
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

    return (
        <div className="relative h-screen">
            <div className="absolute w-full z-50 bg-white shadow-md">
                <Navbar 
                    onStartDrawing={handleDrawingOptionSelect} 
                    onCoordinateOptionSelect={handleCoordinateOptionSelect} 
                />
            </div>

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
