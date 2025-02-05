import { useState, useEffect } from "react";

const useAzimuth = (coordinates, unit = "deg") => {
    const [azimuth1to2, setAzimuth1to2] = useState(null);
    const [azimuth2to3, setAzimuth2to3] = useState(null);
    const [overallAzimuth, setOverallAzimuth] = useState(null);

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

        if (unit === "deg") {
            azimuth = azimuth * (180 / Math.PI); // Convert to degrees
            if (azimuth < 0) azimuth += 360; // Normalize to [0, 360] degrees
        } else if (unit === "rad") {
            if (azimuth < 0) azimuth += 2 * Math.PI; // Normalize to [0, 2π] radians
        }

        return parseFloat(azimuth.toFixed(2)); // Return rounded azimuth
    };

    useEffect(() => {
        if (coordinates.length >= 2) {
            // Azimuth between Point 1 → Point 2
            const computedAzimuth1to2 = calculateAzimuth(
                [coordinates[0].longitude, coordinates[0].latitude],
                [coordinates[1].longitude, coordinates[1].latitude]
            );
            setAzimuth1to2(computedAzimuth1to2);
            console.log(`Azimuth Point 1 → Point 2: ${computedAzimuth1to2} ${unit}`);

            if (coordinates.length === 3) {
                // Azimuth between Point 2 → Point 3
                const computedAzimuth2to3 = calculateAzimuth(
                    [coordinates[1].longitude, coordinates[1].latitude],
                    [coordinates[2].longitude, coordinates[2].latitude]
                );
                setAzimuth2to3(computedAzimuth2to3);
                console.log(`Azimuth Point 2 → Point 3: ${computedAzimuth2to3} ${unit}`);

                // Overall Azimuth Point 1 → Point 3
                const computedOverallAzimuth = calculateAzimuth(
                    [coordinates[0].longitude, coordinates[0].latitude],
                    [coordinates[2].longitude, coordinates[2].latitude]
                );
                setOverallAzimuth(computedOverallAzimuth);
                console.log(`Overall Azimuth Point 1 → Point 3: ${computedOverallAzimuth} ${unit}`);
            }
        }
    }, [coordinates, unit]);

    return { azimuth1to2, azimuth2to3, overallAzimuth };
};

export default useAzimuth;
