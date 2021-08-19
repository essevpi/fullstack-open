import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import contactService from './services/contacts';
import './App.css';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ personToFilter, setPersonToFilter] = useState('');

  useEffect(() => {
    contactService
      .getContacts()
      .then(initialContacts => {
        setPersons(initialContacts);
      })
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    
    const personToAdd = {
      name: newName,
      number: newNumber
    }

    if(persons.some(person => person.name === newName)){
      if (window.confirm(`'${newName}' already exist. Replace his number with ${newNumber}?`)) {
        const idToAdd = persons.find(p => p.name === newName).id;
        contactService
          .updateContact(idToAdd, personToAdd)
          .then(updatedContact => {
            setPersons(persons.map(person => person.id !== idToAdd ? person : updatedContact));
            setNewName('');
            setNewNumber('');
          })
      }
    } else {
        contactService
          .createContact(personToAdd)
          .then(newContact => {
            setPersons(persons.concat(newContact));
            setNewName('');
            setNewNumber('');
          })
    }
  }

  const handleDeleteButton = id => {
    const filteredPerson = persons.filter(person => person.id === id);
    const personName = filteredPerson[0].name;

    if(window.confirm(`Delete "${personName}"?`)){
      contactService
        .deleteContact(id)
        .then(updatedPersons => {
          setPersons(persons.filter(person => person.id !== id));
        })
    } else {
      console.log("NOPE")
    }
  }

  const personsToShow = personToFilter === ''
    ? persons
    : persons.filter( person => 
        person.name.toLowerCase().includes(personToFilter.toLowerCase())
    );

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {
    setPersonToFilter(e.target.value);
  }

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <PersonForm 
        name={newName}
        number={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Persons 
        persons={personsToShow} 
        handleDeleteButton={handleDeleteButton} />
      <Filter 
        searchFilter={personToFilter} 
        handleChange={handleFilterChange} />
    </div>
  )
}

export default App;
