import React from 'react'
import "./Input.css"

function Input(props) {
  return (
    <input
      value={props.value ? props.value : null}
      style={{ width: props.width }}
      type={props.type}
      className='C-Input'
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.onChange}
    />
  )
}

export default Input
