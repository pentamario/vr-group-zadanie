import { useEffect } from 'react';

const useAngle = (coordinates, unit = 'deg') => {
    // Helper function to calculate azimuth between two points
    const calculateAzimuth = (point1, point2) => {
        const [lon1, lat1] = point1;
        const [lon2, lat2] = point2;

        // Convert degrees to radians
        const radLat1 = (lat1 * Math.PI) / 180;
        const radLat2 = (lat2 * Math.PI) / 180;
        const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

        const x = Math.sin(deltaLon) * Math.cos(radLat2);
        const y =
            Math.cos(radLat1) * Math.sin(radLat2) -
            Math.sin(radLat1) * Math.cos(radLat2) * Math.cos(deltaLon);

        let azimuth = Math.atan2(x, y); // Azimuth in radians

        if (unit === 'deg') {
            azimuth = azimuth * (180 / Math.PI); // Convert to degrees
            if (azimuth < 0) azimuth += 360; // Normalize to [0, 360]
        }

        return azimuth;
    };

    useEffect(() => {
        if (coordinates.length === 3) {
            // Calculate azimuths for the two segments
            const azimuth1 = calculateAzimuth(
                [coordinates[0].longitude, coordinates[0].latitude],
                [coordinates[1].longitude, coordinates[1].latitude]
            );

            const azimuth2 = calculateAzimuth(
                [coordinates[1].longitude, coordinates[1].latitude],
                [coordinates[2].longitude, coordinates[2].latitude]
            );

            // Calculate the angle between the two azimuths
            let angle = Math.abs(azimuth1 - azimuth2); // Absolute difference
            if (unit === 'deg' && angle > 180) {
                angle = 360 - angle; // Normalize to [0, 180°]
            }

            console.log(`Angle at Point 2: ${angle.toFixed(2)} ${unit}`);
        }
    }, [coordinates, unit]);
};

export default useAngle;
