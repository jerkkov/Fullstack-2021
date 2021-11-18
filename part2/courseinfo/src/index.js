import React from 'react';
import ReactDOM from 'react-dom';

const Course = (props) => {
  //console.log("Props value: ", courses)
  //console.log("parts value: ", parts)
  //console.log("total value: ", total)

  const parts = props.course.parts
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)

   return (

    <div>
      <h1>{props.course.name}</h1>

      {parts.map(part => 
      <p key={part.id}>{part.name} {part.exercises}
      </p>)}

      <b>Total of {total} exercises</b>
    </div>
    )
  }

  const App = () => {
    const course = {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))