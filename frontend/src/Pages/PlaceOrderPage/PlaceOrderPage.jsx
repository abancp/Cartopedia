import React, { useEffect, useState } from 'react'
import "./PlaceOrderPage.css"
import Header from '../../components/Header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import collections from '../../configurations/collections'
import axios from 'axios'
import { useSelector } from 'react-redux'

function PlaceOrderPage() {
    const { item } = useParams()
    const [address, setAddress] = useState('')
    const [payMethode, setPayMethode] = useState('')

    const navigate = useNavigate()
    const user = useSelector((state) => (state.user))

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])

    const handleClick = () => {
        order()
    }

    const order = () => {
        if (item === 'cart') {
            axios.post(collections.server_base + "/place-order/cart", {  address, payMethode }).then((res) => {
                if (payMethode !== 'COD') {
                    let options = {
                        key: "rzp_test_NGBzOZCNmPu1Py",
                        amount: res.data.totalPrice,
                        currency: "INR",
                        name: "Cartopedia",
                        description: "Product payment",
                        image: "https://example.com/your_logo",
                        order_id: res.data.orderId,
                        handler: function (payment) {
                            axios.post(collections.server_base + '/verify-payment', { payment })
                        },
                        prefill: {
                            "name": "Aban Muhammed CP",
                            "email": "abancpchengani@gmail.com",
                            "contact": "6238213306"
                        },
                        notes: {
                            "address": "Razorpay Corporate Office"
                        },
                        theme: {
                            "color": "#3399cc"
                        }
                    }
                    var rzp = new window.Razorpay(options)
                    rzp.on('payment.failed', function (response) {
                        alert(response.error.code);
                        alert(response.error.description);
                        alert(response.error.source);
                        alert(response.error.step);
                        alert(response.error.reason);
                        alert(response.error.metadata.order_id);
                        alert(response.error.metadata.payment_id);
                    });
                    rzp.open()
                }
            })
        } else {
            //TODO:single product ordering
        }
    }

    return (
        <div className='PlaceOrderPage-main' >
            <Header />
            <div className='right'>
                <textarea className='place-order-adress-textarea' onChange={(e) => { setAddress(e.target.value) }} placeholder='Entar You Address'></textarea>
            </div>
            <div className="left">
                <div className='payment-selecting-div'>
                    <h4 className='payment-method-h3'>Selecting Payment Method</h4>
                    <hr className='hr-tersiory' />
                    <div className='pay-options'>
                        <div className='COD-div'>
                            <input type="radio" onChange={(e) => { setPayMethode(e.target.value) }} name="pay" value='COD' id='COD' />
                            <label htmlFor="COD">Cash On Delvery</label>
                        </div>
                        <div className='Online-div'>
                            <input type="radio" onChange={(e) => { setPayMethode(e.target.value) }} name="pay" value='Online' id="Online" />
                            <label htmlFor="Online"> Online Payment</label>
                        </div>
                    </div>
                    <div className="place-order-bottun" onClick={handleClick}>Order Now</div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderPage
