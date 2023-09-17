import React from 'react'
import "./CompanyInput.css"

function CompanyInput(props) {
    return (
        <div className="CompanyInput-main">
            <input
                value={props.value ? props.value : null}
                style={{ width: props.width }}
                type={props.type}
                className='CompanyInput'
                placeholder={props.placeholder}
                name={props.name}
                onChange={props.onChange}
            />
            <h6 className="error">{props.error}</h6>
        </div>
    )
}

export default CompanyInput
