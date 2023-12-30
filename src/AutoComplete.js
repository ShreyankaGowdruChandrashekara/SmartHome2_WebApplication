
import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useHistory } from 'react-router-dom';

const AutoComplete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const history = useHistory();

  const handleInputChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      const response = await axios.get(
        `http://localhost:3001/autocomplete?action=complete&searchId=${term}`
      );
      console.log(response.data)
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSelectItem = (item) => {
    // Redirect to Details.js with the selected item's data
    console.log(item)
    //e.preventDefault();
    history.push({
      pathname: 'Details',
      state: { item_p: item },
    });
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        name="searchId"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for products..."
      />
      <ul className="suggestions-list">
        {suggestions.map((item) => (
          <li key={item.Id} onClick={(e) => {e.preventDefault();handleSelectItem(item)}}>{item.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;

