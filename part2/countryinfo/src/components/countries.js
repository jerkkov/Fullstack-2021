import React from 'react'

const Countries = (countries, filter) => {
    
        
        //person.name.toLowerCase().includes(showAll.toLowerCase()))
    return (
        <div>
            {countries.map(country => <p>{country.name}</p>)}
        </div>
    )
}

export default Countries