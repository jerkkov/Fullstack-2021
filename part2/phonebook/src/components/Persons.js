import React from 'react'

const Persons = ({ showAll, persons }) => {
    //To show all names or filtered result
    const filter = showAll.length < 1
      ? persons
      : persons.filter(person => 
        person.name.toLowerCase().includes(showAll.toLowerCase()))
    return (
        <div>
            {filter.map(person =>
                <p key={person.id}>{person.name} {person.number}</p>
            )}
        </div>
    )
}
export default Persons