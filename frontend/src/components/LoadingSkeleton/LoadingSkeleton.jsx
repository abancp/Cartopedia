import React from 'react'
import "./LoadingSkeleton.css"

function LoadingSkeleton({width,height,borderR}) {
  return (
    <div className='LoadingSkeleton' style={{width:width,height:height,borderRadius:borderR}}>
      
    </div>
  )
}

export default LoadingSkeleton
