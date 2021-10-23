import React, { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

//Statistic label component
const StatisticsLine = ({text, value}) => (
    <div>
    {text} 
    {value}<br></br>
    </div>
  )



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


//Feedback button functions
  const handleBadClick = () => {
    setBad(bad + 1)
  } 

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  } 

  const handleGoodClick = () => {
    setGood(good + 1)
  } 

  //Statisctic functions
  const sum = (a, b, c) => a + b + c
  const avg = () =>  (good - bad) / sum(good , neutral, bad)
  const percentage = (a, b, c) => good / sum(good, neutral, bad) * 100
  
  //Doesn't render unless feedback is given
  const Statistics = ({good, neutral, bad}) => {
    if (good === 0 && neutral === 0 && bad === 0) {
      console.log(good, bad, neutral)
      return (
        <div>
          No feedback given
        </div>
      )
    }
    return (
        <div>
          <StatisticsLine text="Good " value={good} />
          <StatisticsLine text="Neutral " value={neutral} />
          <StatisticsLine text="Bad " value={bad} />
          <StatisticsLine text="All " value={sum(good, neutral, bad)} />
          <StatisticsLine text="Average " value={avg()} />
          <StatisticsLine text="Positive " value={percentage(good, neutral, bad) + " %"}  />
        </div>
    )
    
  }

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
