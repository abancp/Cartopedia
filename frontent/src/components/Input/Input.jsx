import React from 'react'
import "./Input.css"

function Input(props) {
  return (
    <div className='Input'>
          <input value={props.value} style={{width:props.width}} type={props.type} className='search-input' placeholder={props.placeholder} name={props.name} onChange={props.onChange} />
    </div>
  )
}

export default Input
