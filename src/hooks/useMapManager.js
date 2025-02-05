// hooks/useMapManager.js
import { useState } from 'react';
import useDraw from './useDraw';
import useInputCoordinates from './useInputCoordinates';

const useMapManager = (mapRef) => {
    const [numCoordinates, setNumCoordinates] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [isDrawingActive, setIsDrawingActive] = useState(false);

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
        if (option === 'Two Coordinates') setNumCoordinates(2);
        else if (option === 'Three Coordinates') setNumCoordinates(3);
        else setNumCoordinates(null);
    };

    const handleCoordinateSubmit = (submittedCoordinates) => {
        setCoordinates(submittedCoordinates);
        updatePolyline(submittedCoordinates);
        enableInfiniteEditing();
    };
    

    return {
        numCoordinates,
        coordinates,
        isDrawingActive,
        handleDrawingOptionSelect,
        handleCoordinateOptionSelect,
        handleCoordinateSubmit,
    };
};

export default useMapManager;
