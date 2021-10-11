import React from 'react'

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
      
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.partName}</p>
      <p>{props.exercises}</p>
    </div>  
  )
}
 

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part partName={props.part[0].name} exercises={props.part[0].exercises} />
      <Part partName={props.part[1].name} exercises={props.part[1].exercises} />
      <Part partName={props.part[2].name} exercises={props.part[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return <p>total: {props.total}</p>
  
}

const App = () =>
{
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name:'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course} />
      <Content part={parts} />
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App