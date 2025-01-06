import { useState } from 'react';
import { Draw } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point, LineString } from 'ol/geom';
import { Circle, Fill, Stroke, Style } from 'ol/style';

const useDraw = (mapRef) => {
    const [vectorSource] = useState(new VectorSource());
    const vectorLayer = new VectorLayer({ source: vectorSource });

    const circleStyle = new Style({
        image: new Circle({
            radius: 6,
            fill: new Fill({ color: 'red' }),
            stroke: new Stroke({ color: 'white', width: 2 }),
        }),
    });

    const startDrawing = (maxPoints = 2) => {
        if (mapRef.current) {
            const map = mapRef.current;
            if (!map.getLayers().getArray().includes(vectorLayer)) {
                map.addLayer(vectorLayer);
            }

            const drawInteraction = new Draw({
                source: vectorSource,
                type: 'LineString',
                maxPoints: maxPoints,
            });

            map.addInteraction(drawInteraction);

            drawInteraction.on('drawend', (event) => {
                const coordinates = event.feature.getGeometry().getCoordinates();

                // ✅ Clear previous points
                vectorSource.clear();

                // ✅ Draw the final line
                const lineFeature = new Feature({
                    geometry: new LineString(coordinates),
                });
                vectorSource.addFeature(lineFeature);

                // ✅ Add circle markers on all endpoints
                coordinates.forEach((coord) => {
                    const pointFeature = new Feature({
                        geometry: new Point(coord),
                    });
                    pointFeature.setStyle(circleStyle);
                    vectorSource.addFeature(pointFeature);
                });

                map.removeInteraction(drawInteraction); // Stop drawing after completion
            });
        } else {
            console.warn('Map is not ready yet!');
        }
    };

    return { startDrawing };
};

export default useDraw;
