import Places from "./Places.jsx";

const AvailablePlaces = ({ onSelectPlace }) => {
  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};

export default AvailablePlaces;
