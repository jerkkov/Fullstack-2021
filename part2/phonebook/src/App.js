import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Addperson from './components/Addperson'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => { 
  const [showAll, setShowAll] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
    console.log('promise fulfilled')
    setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

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
                    setPersons={setPersons}
                    setNewName={setNewName}
                    setNewNumber={setNewNumber}
                    handleNameChange={handleNameChange}
                    handleNumberChange={handleNumberChange} 
                    
      />
      <h2>Numbers</h2>
      <Persons persons={persons} showAll={showAll} />
    </div>
  )
}

export default App