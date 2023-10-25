import React from 'react'
import "./Input.css"

function Input(props) {
  return (
    <input
      style={{ width: props.width }}
      className='C-Input'
      {...props}    />
  )
}

export default Input
