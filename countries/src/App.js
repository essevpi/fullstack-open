import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Filter from './components/Filter';
import Countries from './components/Countries';

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ searchFilter, setSearchFilter ] = useState('');

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter(country=>
    country.name.toLowerCase().includes(searchFilter.toLowerCase())
  );
  
  const handleFilterChange = e => 
    setSearchFilter(e.target.value);
  

  const handleShowButton = e => 
    setSearchFilter(e.target.id);
  

  return (
    <div className="App">
      <h2>Countries!</h2>
      <Filter 
        countryFilter={searchFilter} 
        handleChange={handleFilterChange} />
      <Countries 
        countries={filteredCountries} 
        countryFilter={searchFilter} 
        handleButton={handleShowButton} />
    </div>
  );
}

export default App;
