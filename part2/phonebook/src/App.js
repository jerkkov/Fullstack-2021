import React, { useState } from 'react'
import Addperson from './components/Addperson'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    {id: 0, name: 'Arto Hellas', number: '040-123456' },
    {id: 1, name: 'Ada Lovelace', number: '39-44-5323523' },
    {id: 2, name: 'Dan Abramov', number: '12-43-234345' },
    {id: 3, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [showAll, setShowAll] = useState('')
  const [newName, setNewName] = useState(
    ''
    )
  const [newNumber, setNewNumber] = useState(
    ''
  )

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