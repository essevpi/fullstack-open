import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ personToFilter, setPersonToFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  const personsToShow = personToFilter === ''
    ? persons
    : persons.filter( person => 
        person.name.toLowerCase().includes(personToFilter.toLowerCase())
    );

  console.log(personsToShow);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {
    setPersonToFilter(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);

    const personToAdd = {
      name: newName,
      number: newNumber
    }

    if(persons.some(person => person.name === newName)){
      alert(`${newName} already exists.`)
    } else {
      setPersons(persons.concat(personToAdd));
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm 
        name={newName}
        number={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Persons persons={personsToShow} />
      <Filter 
        searchFilter={personToFilter} 
        handleChange={handleFilterChange} />
    </div>
  )
}

export default App;
