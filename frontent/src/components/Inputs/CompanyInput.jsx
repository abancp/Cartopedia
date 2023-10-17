import React from 'react'
import "./CompanyInput.css"

function CompanyInput(props) {
    return (
        <div className="CompanyInput-main">
            <input
                style={{ width: props.width }}
                className='CompanyInput'
                {...props}
            />
            <h6 className="error">{props.error}</h6>
        </div>
    )
}

export default CompanyInput
