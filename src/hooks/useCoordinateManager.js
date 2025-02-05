import { useState, useEffect } from "react";
import useAzimuth from "./useAzimuth";
import useDistance from "./useDistance";
import useAngle from "./useAngle";


const useCoordinateManager = (numCoordinates, initialCoordinates = []) => {
    const [coordinates, setCoordinates] = useState([]);
    const [points, setPoints] = useState("2");
    const [distanceUnit, setDistanceUnit] = useState("km");
    const [azimuthUnit, setAzimuthUnit] = useState("deg");
    const [angleUnit, setAngleUnit] = useState("deg");

    const azimuth = useAzimuth(coordinates, azimuthUnit);
    const distance = useDistance(coordinates, distanceUnit);
    const angle = useAngle(coordinates, angleUnit);

    // Initialize or update coordinates based on props
    useEffect(() => {
        if (initialCoordinates?.length > 0) {
            setCoordinates(initialCoordinates);
        } else if (numCoordinates) {
            setCoordinates(
                Array.from({ length: numCoordinates }, () => ({
                    latitude: "",
                    longitude: "",
                }))
            );
        }
    }, [initialCoordinates, numCoordinates]);

    // Handle input changes for coordinates
    const handleInputChange = (index, field, value) => {
        const updatedCoordinates = [...coordinates];
        updatedCoordinates[index] = {
            ...updatedCoordinates[index],
            [field]: value,
        };
        setCoordinates(updatedCoordinates);
    };

    // Validate and submit coordinates
    const validateAndSubmit = (onSubmit) => {
        for (const coord of coordinates) {
            if (!coord.latitude || !coord.longitude) {
                alert("All coordinate fields must be filled.");
                return;
            }

            const lat = parseFloat(coord.latitude);
            const lon = parseFloat(coord.longitude);

            if (
                isNaN(lat) ||
                isNaN(lon) ||
                lat < -90 ||
                lat > 90 ||
                lon < -180 ||
                lon > 180
            ) {
                alert(
                    "Invalid coordinates. Latitude must be between -90 and 90, and longitude must be between -180 and 180."
                );
                return;
            }
        }

        const parsedCoordinates = coordinates.map((coord) => ({
            latitude: parseFloat(coord.latitude),
            longitude: parseFloat(coord.longitude),
        }));

        onSubmit(parsedCoordinates);
    };

    return {
        coordinates,
        setCoordinates,
        points,
        setPoints,
        distanceUnit,
        setDistanceUnit,
        azimuthUnit,
        setAzimuthUnit,
        angleUnit,
        setAngleUnit,
        handleInputChange,
        validateAndSubmit,
        azimuth,
        distance,
        angle,
    };
};

export default useCoordinateManager;
