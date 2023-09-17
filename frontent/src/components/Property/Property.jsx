import React from 'react'
import './Property.css'
function Property({property='property',value='value'}) {
  return (
    <>
    <div className='Property'>
      <div className='property-main'>
        <div className="property-property">
          <h6 className="property-property-h6">{property  }</h6>
        </div>

        <div className="property-value"><h6 className="property-value-h6">{' - ' +  value}</h6></div>
      </div>
    </div>
    </>
  )
}

export default Property
