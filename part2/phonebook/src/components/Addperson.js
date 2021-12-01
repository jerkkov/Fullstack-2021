import React from 'react'

const Addperson = ( {persons, 
                    newName, 
                    newNumber,
                    setPersons,
                    setNewName,
                    setNewNumber,
                    handleNameChange,
                    handleNumberChange
                  } ) => {
  //Add new person
  const newPerson = (event) => { 
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
      console.log('button clicked', event.target)
    } 
    return (
        <div>
        <form onSubmit={newPerson}>
        <div>
          name: <input  
            value={newName}
            onChange={handleNameChange} /><br/>
          number: <input
            value={newNumber}
            onChange={handleNumberChange} /><br/>
          <button type="submit"> 
            add</button>
        </div>
      </form>
      </div>
    )
}
export default Addperson