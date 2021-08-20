import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import contactService from './services/contacts';
import './index.css';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ personToFilter, setPersonToFilter] = useState('');
  const [ notificationMessage, setNotificationMessage ] = useState(null);
  const [ notificationType, setNotificationType ] = useState('');

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
            setNotificationMessage(`"${newName}" number is updated to ${newNumber}`);
            setNotificationType('Success');
          })
          .catch(() => {
            setPersons(persons.filter(person => person.id !== idToAdd));
            setNotificationMessage(`"${newName}" was already removed from server!`);
            setNotificationType('Error');
          })
        
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);

      }
    } else {
        contactService
          .createContact(personToAdd)
          .then(newContact => {
            setPersons(persons.concat(newContact));
            setNewName('');
            setNewNumber('');
            setNotificationMessage(`"${newName}" has been added to contacts.`);
            setNotificationType('Success');

            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
    }
  }

  const handleDeleteButton = id => {
    const filteredPerson = persons.filter(person => person.id === id);
    const personName = filteredPerson[0].name;

    if(window.confirm(`Delete "${personName}"?`)){
      contactService
        .deleteContact(id);

      setPersons(persons.filter(person => person.id !== id));
      setNotificationMessage(`"${personName}" was deleted from contacts`);
      setNotificationType('Success');

      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
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
      <div className="ContainerHalf">
        <h2>Phonebook</h2>
        <div className="Contacts">
          <Persons 
            persons={personsToShow} 
            handleDeleteButton={handleDeleteButton} />
          <Filter 
            searchFilter={personToFilter} 
            handleChange={handleFilterChange} />
        </div>
      </div>
      <div className="ContainerHalf">
        <div className="ContactActions">
          <PersonForm 
            name={newName}
            number={newNumber}
            handleSubmit={handleSubmit}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
          />
          <Notification message={notificationMessage} type={notificationType} />
        </div>
      </div>
    </div>
  )
}

export default App;
