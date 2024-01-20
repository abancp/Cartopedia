import React from 'react'
import "./Button.css"
function Button(props) {
    return (
        <div className='Button' style={{ width: props.width }} onClick={props.onClick} >
            <div className="button-main" style={{ borderRadius: props.borderRadius, height: props.height }}>
                {/* {props.icon && <div className="left-div">
                    <div className="button-circle">
                        <div style={{ color: props.color }} className="button-icon">{props.icon}</div>
                    </div>
                </div>} */}
                <div className="right-div">
                    <h6 className='button-text'>{props.text}</h6>
                </div>
            </div>
        </div>
    )
}

export default Button