import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Countries from './components/countries'
const App = () => {
  
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('response fulfilled')
      setCountries(response.data)
    })
  }, [])
  console.log('render', countries.length, 'countries')
  //console.log('countries: ', countries)
  console.log('countries: ', countries[0])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    //console.log(filter)
  }

  
  return (
   <div>
     find countries<input onChange={handleFilterChange}/>
     <Countries countries={countries} filter={filter}/>
   </div>
  )
}

export default App;
