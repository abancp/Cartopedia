import React from 'react'
import "./CompanyInput.css"

function CompanyInput(props) {
    return (
        <input
            value={props.value ? props.value : null}
            style={{ width: props.width }}
            type={props.type}
            className='C-CompanyInput'
            placeholder={props.placeholder}
            name={props.name}
            onChange={props.onChange}
        />
    )
}

export default CompanyInput
