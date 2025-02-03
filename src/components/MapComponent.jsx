import React, { useState } from 'react';
import Navbar from './Navbar';
import useMapControls from '../hooks/useMapControls';
import useDraw from '../hooks/useDraw';
import ZoomButtons from './ZoomButtons';
import CoordinateInput from './CoordinateInput'; 
import useInputCoordinates from '../hooks/useInputCoordinates';  


const MapComponent = () => {
    const { mapRef, handleZoomIn, handleZoomOut, mapReady } = useMapControls();
    const [numCoordinates, setNumCoordinates] = useState(null);
    const [coordinates, setCoordinates] = useState([]);  
    const [isDrawingActive, setIsDrawingActive] = useState(false);  

    // ✅ Correct import for the renamed function
    const { startDrawing, updatePolyline, clearMap, enableInfiniteEditing } = useDraw(mapRef);  
    const { drawCoordinates } = useInputCoordinates(mapRef);  

    const handleDrawingOptionSelect = (maxPoints) => {
        clearMap();
        setNumCoordinates(maxPoints);
        setCoordinates([]);
        setIsDrawingActive(true);
        startDrawing(maxPoints, setCoordinates);  
    };

    const handleCoordinateOptionSelect = (option) => {
        clearMap();
        setIsDrawingActive(false);
        if (option === 'Two Coordinates') {
            setNumCoordinates(2);
            setCoordinates([]);  
        } else if (option === 'Three Coordinates') {
            setNumCoordinates(3);
            setCoordinates([]);  
        } else {
            setNumCoordinates(null);
        }
    };

    // ✅ Fixed function call here (was makeEndpointsEditable)
    const handleCoordinateSubmit = (submittedCoordinates) => {
        setCoordinates(submittedCoordinates);  
        updatePolyline(submittedCoordinates);  
        enableInfiniteEditing();  // ✅ Corrected to match useDraw.js
    };

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
console.log()

export default MapComponent;
