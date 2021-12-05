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
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
    console.log('promise fulfilled')
    setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  //Add new person
  const newPerson = (event) => { 
    //If person is already on the phonebook
    if (persons.some(person => person.name === newName)){
      event.preventDefault()
      return alert(`${newName} is already added to notebook`)
    }
    event.preventDefault()
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

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFindChange={handleFindChange} />
      
      <h2>Add a new</h2>
      <Addperson persons={persons}  
                    newName={newName}
                    newNumber={newNumber}
                    newPerson={newPerson}
                    handleNameChange={handleNameChange}
                    handleNumberChange={handleNumberChange} 
                    
      />
      <h2>Numbers</h2>
      <Persons persons={persons} showAll={showAll} />
    </div>
  )
}

export default App