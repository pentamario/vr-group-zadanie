import React from 'react';
import MapComponent from './MapComponent';

const App = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">React + OpenLayers + Tailwind</h1>
            <MapComponent />
        </div>
    );
};

export default App;
