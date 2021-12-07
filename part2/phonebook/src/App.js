import React, { useState, useEffect } from 'react'
import Addperson from './components/Addperson'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => { 
  const [showAll, setShowAll] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    //console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
    //console.log('promise fulfilled')
    setPersons(initialPersons)
    })
  }, [])
  //console.log('render', persons.length, 'persons')

  //Add new person
  const personManagement = (event) => { 
    //Change number of the existing person 
    if (persons.some(person => person.name === newName)){
      event.preventDefault()
     if(window.confirm(`${newName} is already added to notebook, replace the old number with a new one?`)) {
      const personInvolved = persons.find(person => person.name === newName)
      return updateNumber(personInvolved.id)
     }
     else
     return console.log('Clicked cancel')
    }
    //Add new person to the server
    event.preventDefault()
    addPerson()
    
  }

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }
  const updateNumber = (id) => {
    const number = persons.find (n => n.id === id)
    const changedNumber = { ...number, number: newNumber}

    personService
    .update(id, changedNumber)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
    })
    setNewName('')
    setNewNumber('')
  }

   const personToBeRemoved = id => {
    const person = persons.find(p => p.id === id)
      if (window.confirm(`Delete ${person.name} ?`)) {
      personService
      .remove(id)
      .then(returnedPerson => {
        setPersons(persons.map(person => 
          person.id !== id ? person : returnedPerson))
      })
      .catch(error => {
        alert(
          `The person was already deleted from the server`
        )
      })
    }
  }



    
  

    //Inputfield management for name
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  //Inputfield management for number
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

    //Inputfield management for number
  const handleFindChange = (event) => {
    //console.log(event.target.value)
    setShowAll(event.target.value)
  }

  const filter = showAll.length < 1
      ? persons
      : persons.filter(person => 
        person.name.toLowerCase().includes(showAll.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFindChange={handleFindChange} />
      
      <h2>Add a new</h2>
      <Addperson persons={persons}  
                  newName={newName}
                  newNumber={newNumber}
                  personManagement={personManagement}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange} 
                    
      />
      <h2>Numbers</h2>
      <div>
            {filter.map((person, i) =>
                <Persons 
                key={i}
                person={person}
                removePerson={() => personToBeRemoved(person.id)} 
                />
            )}
        </div>
    </div>
  )
}

export default App