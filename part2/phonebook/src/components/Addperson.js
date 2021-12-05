import React from 'react'

const Addperson = ( {newPerson,
                    newName, 
                    newNumber,
                    handleNameChange,
                    handleNumberChange
                  } ) => {

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