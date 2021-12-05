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

  //Add new person
  const newPerson = (event) => { 
    //If person is already on the phonebook
    if (persons.some(person => person.name === newName)){
      event.preventDefault()
      return alert(`${newName} is already added to notebook`)
    }
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
      //update usestate
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log('button clicked', event.target)

    axios
    .post('http://localhost:3001/persons', personObject)
    .then(response => {
      console.log(response)
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