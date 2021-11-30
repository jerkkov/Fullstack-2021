import React, { useState } from 'react'
import Person from './components/Person'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Input = ({ value, onChange, text }) => (
 <div>
 {text}<input value={value} onChange={onChange}></input>
 </div>
 )

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

  //Add new person
  const addPerson = (event) => { 
    //If person is already on the phonebook
    if (persons.some(person => person.name === newName)){
      event.preventDefault()
      return alert(`${newName} is already added to notebook`)
    }
    event.preventDefault()
    const nameObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
      //update usestate
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
      //console.log('button clicked', event.target)
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

  //Find person
  const personToShow = showAll.length < 1
  ? persons
  : persons.filter(person => 
    person.name.toLowerCase().includes(showAll.toLowerCase()))

  console.log("show all:", showAll)
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with<input onChange={handleFindChange} />
      <form onSubmit={addPerson}>
        <div>
          <h2>Add a new</h2>
          <Input text="name:" 
            value={newName}
            onChange={handleNameChange}>
          </Input>
          <Input text="number:"
            value={newNumber}
            onChange={handleNumberChange}>
          </Input>

          <Button type="submit" 
            handleClick={addPerson} 
            text={"add"}>
          </Button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personToShow.map(person =>
        <Person key={person.id} person={person} />
        )}
    </div>
  )
}

export default App