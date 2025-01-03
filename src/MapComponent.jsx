// src/MapComponent.jsx
import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const MapComponent = () => {
    useEffect(() => {
        // Initialize the map
        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM() // OpenStreetMap as the base map
                })
            ],
            view: new View({
                center: [0, 0], // Center the map at coordinates [0,0]
                zoom: 2 // Zoom level
            })
        });

        // Clean up the map when component unmounts
        return () => map.setTarget(null);
    }, []);

    return (
        <div className="w-full h-[500px] border-2 border-gray-300" id="map"></div>
    );
};

export default MapComponent;
