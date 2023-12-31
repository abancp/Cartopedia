import React, { useEffect, useState } from 'react'
import "./OrderPage.css"
import Header from '../../components/Header/Header'
import Order from '../../components/Order/Order'
import axios from 'axios'
import collections from '../../configurations/collections'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function OrderPage() {
    const { userId } = useParams()

    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])


    useEffect(() => {
        axios.get(collections.server_base + '/orders?userId=' + userId).then((res) => {
            setOrders(res.data.orders)
            setProducts(res.data.products)
        })
    }, [])

    return (
        <div className='OrderPage'>
            <Header />
            <div className="main">
                {orders.map((order, i) => (
                    <Order {...order} products={products[i]} key={i} />
                ))}
            </div>
        </div>
    )

}

export default OrderPage
