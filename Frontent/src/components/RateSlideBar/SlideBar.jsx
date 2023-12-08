import React from 'react'
import "./SlideBar.css"

function SlideBar(props) {
    if(props.percent > 100){
        props.percent=100
    }
    return (
        <div className='Slidebar' style={{"width":props.width}}>
            <div className="sidebar-value" style={{"width":props.percent+"%"}}>

            </div>
        </div>
    )
}

export default SlideBar
