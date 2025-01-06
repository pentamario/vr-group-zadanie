import { useState, useRef, useEffect } from 'react';
import { Draw, Modify } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point, LineString } from 'ol/geom';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat, toLonLat } from 'ol/proj';  
import { Collection } from 'ol';

const useDraw = (mapRef) => {
    const [vectorSource] = useState(new VectorSource());
    const vectorLayer = new VectorLayer({ source: vectorSource });
    const modifyInteractionRef = useRef(null);  
    const drawInteractionRef = useRef(null);  
    const setCoordinatesRef = useRef(null);     

    const circleStyle = new Style({
        image: new Circle({
            radius: 6,
            fill: new Fill({ color: 'red' }),
            stroke: new Stroke({ color: 'white', width: 2 }),
        }),
    });

    const clearMap = () => {
        if (mapRef.current) {
            vectorSource.clear();
        }
    };

    const updatePolyline = (coordinates) => {
        if (!mapRef.current) return;
        vectorSource.clear();  

        const transformedCoords = coordinates.map(coord => 
            fromLonLat([parseFloat(coord.longitude), parseFloat(coord.latitude)])
        );

        // ✅ Draw the polyline
        const lineFeature = new Feature({
            geometry: new LineString(transformedCoords),
        });
        vectorSource.addFeature(lineFeature);

        // ✅ Add circle markers for both endpoints (draggable)
        transformedCoords.forEach((coord, index) => {
            const pointFeature = new Feature({
                geometry: new Point(coord),
            });
            pointFeature.setStyle(circleStyle);
            pointFeature.set('isDraggable', index === 0 || index === transformedCoords.length - 1); 
            pointFeature.set('index', index);  
            vectorSource.addFeature(pointFeature);
        });
    };

    const startDrawing = (maxPoints = 2, setCoordinates) => {
        if (mapRef.current) {
            clearMap();
            setCoordinatesRef.current = setCoordinates;  
            const map = mapRef.current;

            if (!map.getLayers().getArray().includes(vectorLayer)) {
                map.addLayer(vectorLayer);
            }

            // ✅ Prevent multiple draw interactions from stacking
            if (drawInteractionRef.current) {
                map.removeInteraction(drawInteractionRef.current);
            }

            drawInteractionRef.current = new Draw({
                source: vectorSource,
                type: 'LineString',
                maxPoints: maxPoints,
            });

            map.addInteraction(drawInteractionRef.current);

            drawInteractionRef.current.on('drawend', (event) => {
                const coordinates = event.feature.getGeometry().getCoordinates();
                const transformedCoordinates = coordinates.map(coord => {
                    const [lon, lat] = toLonLat(coord);
                    return { latitude: lat.toFixed(6), longitude: lon.toFixed(6) };
                });

                setCoordinates(transformedCoordinates);
                updatePolyline(transformedCoordinates);

                // ✅ Stop drawing and switch to modify mode
                map.removeInteraction(drawInteractionRef.current);  
                enableInfiniteEditing();  
            });
        }
    };

    // ✅ Persistent Modify Interaction with Proper State Handling
    const enableInfiniteEditing = () => {
        if (!mapRef.current) return;

        const map = mapRef.current;

        // ✅ Prevent duplicate modify interactions
        if (modifyInteractionRef.current) {
            map.removeInteraction(modifyInteractionRef.current);
        }

        // ✅ Create the Modify Interaction once and keep it active
        modifyInteractionRef.current = new Modify({
            source: vectorSource, // ✅ Correct binding to the source
        });

        modifyInteractionRef.current.on('modifyend', () => {
            const updatedCoords = vectorSource.getFeatures()
                .filter(feature => feature.getGeometry().getType() === 'Point')
                .map(feature => {
                    const [lon, lat] = toLonLat(feature.getGeometry().getCoordinates());
                    return { latitude: lat.toFixed(6), longitude: lon.toFixed(6) };
                });

            if (setCoordinatesRef.current) {
                setCoordinatesRef.current(updatedCoords);
            }
            updatePolyline(updatedCoords);
        });

        map.addInteraction(modifyInteractionRef.current);  // ✅ Interaction persists
    };

    useEffect(() => {
        return () => {
            if (mapRef.current) {
                if (modifyInteractionRef.current) {
                    mapRef.current.removeInteraction(modifyInteractionRef.current);
                }
                if (drawInteractionRef.current) {
                    mapRef.current.removeInteraction(drawInteractionRef.current);
                }
            }
        };
    }, []);

    return { startDrawing, updatePolyline, clearMap, enableInfiniteEditing };  
};

export default useDraw;
