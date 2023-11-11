import React from 'react'
import "./PlaceOrderPage.css"
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'

function PlaceOrderPage() {
  const { item } = useParams()
  if (item === 'cart'){
  }else{

  }
    return (
      <div className='PlaceOrderPage-main' >
        <Header />

      </div>
    )
}

export default PlaceOrderPage
