import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { sortPlacesByDistance } from "../loc.js";

const AvailablePlaces = ({ onSelectPlace }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places...");
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const sortedPlaces = sortPlacesByDistance(
                resData.places,
                position.coords.latitude,
                position.coords.longitude
              );
              setAvailablePlaces(sortedPlaces);
              setIsFetching(false);
            },
            (error) => {
              console.error("Geolocation error:", error);
              const sortedPlaces = sortPlacesByDistance(
                resData.places,
                15.78609,
                74.5129
              );
              setAvailablePlaces(sortedPlaces);
              setIsFetching(false);
            }
          );
        }
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places please try again later",
        });
        setIsFetching(false);
      }
    };

    fetchPlaces();
  }, []);

  if (error) {
    return (
      <ErrorPage title="Error fetching places..." message={error.message} />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};

export default AvailablePlaces;
