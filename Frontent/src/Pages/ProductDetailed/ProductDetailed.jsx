import React, { useEffect, useState } from 'react'
import './ProductDetailed.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import collections from '../../configurations/collections'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CompanyMiniView from '../../components/CompanyMiniView/CompanyMiniView'
import Property from '../../components/Property/Property'
import { useSelector } from 'react-redux'

function ProductDetailed() {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [images, setImages] = useState([])

    const store = useSelector((state) => (state.user))
    const [userId, setUserId] = useState(store?.then((user) => (user._id)))
    //TODO : showing detaild images 
    useEffect(() => {
        axios.get(collections.server_base + '/product/' + id).then((res) => setProduct(res.data))
        setImages(['/product-displays/' + id + '.jpg'])
        if (product.numberOfDetailed) {
            for (let i = 1; i <= 0; i++) {
                setImages(images => [...images, '/product-details/' + id + '/' + id + '(' + i + ').jpg'])
            }
        }
    }, [id, product.numberOfDetailed])

    useEffect(() => {
        store?.then((user) => (setUserId(user._id)))
    }, [store])

    const handleClickAddToCart = () => {
        axios.patch(`${collections.server_base}/add-to-cart/${id}/${1}/${userId}`).then((res) => {
            if (res.data.cartPriceLimitErr) {
                alert("Maximum 500,000 rupees in cart")
            } else {
                alert("Iterm added to Cart")
            }
        })
    }

    return (
        <div className='ProductDetailed'>
            <Header />
            <div className="main">
                <div className="product-left">
                    <div className="image-div">
                        {<img className='product-img' src={collections.server_base + images[0]} alt="" />}
                    </div>
                    <div className="description-div">
                        <h4 className='description-label'>Description</h4>
                        <hr className='description-hr' />
                        <h5 className=' product-description'>{product.description}</h5>
                    </div>
                </div>
                <div className="product-right">
                    <h3 className='product-name'>{product.name}</h3>
                    <div className="product-prices">
                        <h5 className='product-price'>₹ {product.price} </h5>
                        <h5 className="product-mrp">₹ <strike>{product.mrp}</strike></h5>
                        <h5 className='product-offer'>{100 - Math.round((parseInt(product.price) * 100) / parseInt(product.mrp))}%  Offer</h5>
                    </div>
                    <div className="product-properties">
                        <Property />
                    </div>
                    <div className="product-buy">
                        <div className="add-to-cart" onClick={handleClickAddToCart} >
                            <h3>Add to Cart </h3>
                        </div>
                        <div className="buy-now">
                            <h3>Buy  Now</h3>
                        </div>
                    </div>
                    <div className="company-div">
                        <CompanyMiniView {...product} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetailed
