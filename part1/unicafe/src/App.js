import React, { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 // const [all, setAll] = useState(0)


  const handleBadClick = () => {
    setBad(bad + 1)
  } 

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  } 

  const handleGoodClick = () => {
    setGood(good + 1)
  } 

  const sum = (a, b, c) => a + b + c
  
  //Example 1.7 seems to return different value
  const Statistics = ({good, neutral, bad}) => {
    return (
      <div>
        <p>
          Good {good}<br></br>
          Neutral {neutral}<br></br>
          Bad {bad} <br></br>
          All {sum(good, neutral, bad)} <br></br>
          Average {avg()} <br></br>
          Positive {percentage(good, neutral, bad)} %
        </p>
      </div>
    )
  }
  const avg = () =>  (good - bad) / sum(good , neutral, bad)
  const percentage = (a, b, c) => good / sum(good, neutral, bad) * 100




  

  return (
    <div>
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' /> 
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
    
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App
