import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

const ZoomButtons = ({ handleZoomIn, handleZoomOut, mapReady }) => {
    return (
        <div className="absolute bottom-10 left-10 flex flex-col space-y-3 z-50">
            <button
                onClick={handleZoomIn}
                disabled={!mapReady}
                className={`p-2 text-white rounded-lg shadow-md ${mapReady ? 'bg-blue-500' : 'bg-gray-400'}`}
            >
                <ZoomIn size={24} />
            </button>
            <button
                onClick={handleZoomOut}
                disabled={!mapReady}
                className={`p-2 text-white rounded-lg shadow-md ${mapReady ? 'bg-red-500' : 'bg-gray-400'}`}
            >
                <ZoomOut size={24} />
            </button>
        </div>
    );
};

export default ZoomButtons;
