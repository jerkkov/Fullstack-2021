import React from 'react'

const Notification = ({ type, message  }) => {
    if (message === null || !type) {
      return null
    }

    if (type === 'error') {
      return (<div className="error"> {message} </div>)
    }
    else {
      return (<div className="notification"> {message} </div>)
    } 
    
  }

export default Notification 