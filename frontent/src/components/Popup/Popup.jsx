import React from 'react'
import "./Popup.css"
import Button from '../Button/Button'

function Popup(props) {
  let displayUrl = props.display ? URL.createObjectURL(props.display) : null
  let detaildeUrls = []
  props.detaileds.forEach((img) => detaildeUrls.push(URL.createObjectURL(img)))
  return (
    <div className='Popup'>
      <div className="popup-main">
        <div className="images-div">
          <div className="display-div">
            <img src={displayUrl} className='display-img' alt="" />
          </div>
          <div className="detailds-div">
            {detaildeUrls.map((detailed) => (<img alt={`product detailed ${detailed}`} src={detailed} />))}
          </div>
        </div>
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="propedrties-div">
          <h5>Name : {props.name}</h5>
          <h5>Your price : {props.price}₹</h5>
          <h5>M R P : {props.mrp}₹</h5>
          <h5>Your Offer : {(parseInt(props.prize) * 100) / parseInt(props.mrp)}</h5>
          <h5>Category : {props.category}</h5>
          <h5>Stock : {props.stock}</h5>
          <div className="popup-tags-container">
            <div className="tags">
              {props.tags.map((tag, i) => (<div key={i} className="tag">{tag}</div>))}
            </div>
          </div>
          <div className="description">
            <h6>{props.description}</h6>
          </div>
          <div className="buttons">
            <Button text="cancel" onClick={props.cancel} />
            <Button text="submit" onClick={props.submit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
