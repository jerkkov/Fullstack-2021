import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0,
      name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState(
    ''
    )

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      id: persons.length + 1,
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    console.log('button clicked', event.target)
    } 
  
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
                onChange={handleNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person key={person.id} person={person} />
        )}
    </div>
  )

}

export default App