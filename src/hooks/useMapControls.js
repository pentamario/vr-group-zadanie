import { useRef, useEffect, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

const useMapControls = () => {
    const mapRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(6);

    useEffect(() => {
        // ✅ Properly setting the DOM element as the target
        if (!mapRef.current) {
            mapRef.current = new Map({
                target: 'map-container', // The corrected ID for targeting the map
                layers: [new TileLayer({ source: new OSM() })],
                view: new View({
                    center: fromLonLat([14.42, 50.08]),
                    zoom: zoomLevel,
                }),
                controls: [],
            });
            setMapReady(true);
        }
    }, []);

    const handleZoomIn = () => {
        if (mapRef.current) {
            const view = mapRef.current.getView();
            view.setZoom(view.getZoom() + 1);
            setZoomLevel(view.getZoom());
        } else {
            console.warn("Map not ready yet.");
        }
    };

    const handleZoomOut = () => {
        if (mapRef.current) {
            const view = mapRef.current.getView();
            view.setZoom(view.getZoom() - 1);
            setZoomLevel(view.getZoom());
        } else {
            console.warn("Map not ready yet.");
        }
    };

    return { mapRef, handleZoomIn, handleZoomOut, mapReady, zoomLevel };
};

export default useMapControls;
