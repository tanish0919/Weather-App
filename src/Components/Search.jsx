import { useState } from "react"
import { FaSearchLocation } from "react-icons/fa";
import PropTypes from "prop-types";
const Search = ({ setLocation}) => {
  // const [city,setCity] = useState('');
  const [city, setCity] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(city);
    setCity("");
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          value={city}
          placeholder="Enter the city name"
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button">
          <FaSearchLocation />
        </button>
      </form>
    </div>
  );
};

Search.propTypes = {
  setLocation: PropTypes.func.isRequired,
  
};
export default Search;
