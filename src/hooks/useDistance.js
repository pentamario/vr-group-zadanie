import { useEffect } from 'react';

const useDistance = (coordinates, unit = 'km') => {
    const EARTH_RADIUS = 6371; // Earth's radius in kilometers

    // Helper function to calculate the distance between two points
    const calculateDistance = (point1, point2) => {
        const [lon1, lat1] = point1;
        const [lon2, lat2] = point2;

        // Convert degrees to radians
        const radLat1 = (lat1 * Math.PI) / 180;
        const radLat2 = (lat2 * Math.PI) / 180;
        const deltaLat = radLat2 - radLat1;
        const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

        // Haversine formula
        const a =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        let distance = EARTH_RADIUS * c; // Distance in kilometers
        if (unit === 'm') {
            distance *= 1000; // Convert to meters
        }

        return distance;
    };

    useEffect(() => {
        if (coordinates.length >= 2) {
            let totalDistance = 0;

            for (let i = 0; i < coordinates.length - 1; i++) {
                const point1 = [coordinates[i].longitude, coordinates[i].latitude];
                const point2 = [coordinates[i + 1].longitude, coordinates[i + 1].latitude];
                const segmentDistance = calculateDistance(point1, point2);

                totalDistance += segmentDistance;

                console.log(
                    `Distance between Point ${i + 1} → Point ${i + 2}: ${segmentDistance.toFixed(
                        2
                    )} ${unit}`
                );
            }

            console.log(`Total Distance: ${totalDistance.toFixed(2)} ${unit}`);
        }
    }, [coordinates, unit]);
};

export default useDistance;
