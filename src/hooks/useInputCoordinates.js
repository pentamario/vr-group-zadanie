import { Feature } from 'ol';
import { Point, LineString } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Stroke, Circle, Fill } from 'ol/style';

const useInputCoordinates = (mapRef) => {
    const drawCoordinates = (coordinates) => {
        if (!mapRef.current) {
            console.error("Map reference not available.");
            return;
        }

        let vectorLayer = mapRef.current.getLayers().getArray().find(layer => layer.get('name') === 'drawLayer');

        if (!vectorLayer) {
            vectorLayer = new VectorLayer({
                source: new VectorSource(),
                style: new Style({
                    stroke: new Stroke({
                        color: 'blue',
                        width: 2
                    }),
                    image: new Circle({
                        radius: 6,
                        fill: new Fill({ color: 'red' }),
                        stroke: new Stroke({ color: 'white', width: 2 })
                    })
                }),
                name: 'drawLayer'
            });
            mapRef.current.addLayer(vectorLayer);
        }

        const vectorSource = vectorLayer.getSource();
        vectorSource.clear();

        // ✅ Convert coordinates and draw a line
        const lineCoordinates = coordinates.map(coord =>
            fromLonLat([parseFloat(coord.longitude), parseFloat(coord.latitude)])
        );
        const lineFeature = new Feature({
            geometry: new LineString(lineCoordinates)
        });
        vectorSource.addFeature(lineFeature);

        // ✅ Add dots to endpoints
        coordinates.forEach(coord => {
            const pointFeature = new Feature({
                geometry: new Point(fromLonLat([parseFloat(coord.longitude), parseFloat(coord.latitude)]))
            });
            pointFeature.setStyle(new Style({
                image: new Circle({
                    radius: 6,
                    fill: new Fill({ color: 'red' }),
                    stroke: new Stroke({ color: 'white', width: 2 })
                })
            }));
            vectorSource.addFeature(pointFeature);
        });
    };

    return { drawCoordinates };
};

export default useInputCoordinates;
