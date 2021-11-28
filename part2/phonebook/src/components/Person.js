import React from 'react'

const Person = ({ person }) => {
    console.log(person.name)
    return (
        <p>{person.name}</p>
    )
}

export default Person