import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button> 
)

//Returns max value from votes array
const findMax = votes => votes.indexOf(Math.max(...votes))

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(7))

  const handleSelect = () => setSelected(generateRnd()) //Generates random number 0-6
  const handleUpdate = () => { //Updates array containing votes
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    
  }
  console.log(votes)
  let max = findMax(votes)
  console.log("Max: ", max)
  const generateRnd = () => Math.floor(Math.random() * 7)
    
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}<br></br>
      <Button handleClick={handleUpdate} text="vote" />
      <Button handleClick={handleSelect} text="Next anectdote"/>
      <div>
      <h1>Anecdote With Most Votes</h1>
      {anecdotes[max]}<br></br>
      has {votes[max]} votes
      </div>
    </div>
  )
}

export default App