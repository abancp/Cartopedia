import React from 'react'
import "./Input.css"

function Input(props) {
  return (
    <div className='Input'>
          <input  value={props.value?props.value:null} style={{width:props.width}} type={props.type} className='search-input' placeholder={props.placeholder} name={props.name} onChange={(e)=>(e.target.value)}  />
    </div>
  )
}

export default Input
