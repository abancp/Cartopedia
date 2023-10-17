import React from 'react'
import "./Status.css"

function Status({title,number}) {
  return (
    <div className='Status'>
      <div className="status-left-div">
        <h4 className='status-title' >{title}</h4>
        <hr className='status-graph' />
      </div>
      <div className="status-right-div">
        <h3 className="status-number">{number}</h3>
      </div>
    </div>
  )
}

export default Status
