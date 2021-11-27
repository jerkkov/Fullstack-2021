import React from 'react';
import ReactDOM from 'react-dom';


const Course = ( {courses} ) => {
   return (
    <>
      <h1>Web deveploment curriculum</h1>

      {courses.map((course) => 
      <div key={course.id}>
      <h2>
       {course.name}
      </h2>  
        {course.parts.map((part) =>  
          <p key={part.id}>
            {part.name} {part.exercises}
          </p> 
          
        )}
        {<b>Total of {course.parts.reduce( (s,e) =>  s + e.exercises , 0)} exercises</b>}
        </div>
        )
      }
    </>
  )
}

  const App = () => {
    const courses = [
      {
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
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]

    return (
      <div>
        <Course courses={courses} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))