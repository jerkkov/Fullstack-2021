import React from 'react';

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

 export default Course