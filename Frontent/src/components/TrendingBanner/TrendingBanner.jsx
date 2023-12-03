import React, { useState, useEffect } from 'react';
import "./TrendingBanner.css";
import axios from "axios";
import collections from "../../configurations/collections"

function TrendingBanner() {
    const [trendingProducts, setTrendingProducts] = useState([]);
    useEffect(() => {
        axios.get(collections.server_base + "/get-trending-products").then((res) => {
            setTrendingProducts(res.data.products)
        })
    }, [])
    return (
        <div className='trendingbanner'>
            <div className='container-fluid'>
                <div className="row">
                <h4 className=' mt-5'>Trending Products</h4>
                    <div className='home-trendingbanner-main-div'>
                        {trendingProducts.map((product) => (
                            <div className='home-trendingbanner-product'>
                                <div className='home-trendingbanner-product-image-div p-1'>
                                    <img className='home-trendingbanner-product-image ' src={`${collections.server_base}/product-displays/${product._id}.jpg`} alt="" />
                                </div>
                                <div className="home-trendingbanner-product-details-div">
                                    <h5 className='home-trendingbanner-product-details-price text-center '>{product.price}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mb-1 bi bi-currency-rupee" viewBox="0 0 16 16">
                                        <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                    </svg></h5>
                                    <div className='home-trendingbanner-product-details-title-div'>
                                        <h5 className='home-trendingbanner-product-details-title text-center '>{product.name.length > 24 ?product.name = product.name.substring(0,23) + "...":product.name}</h5>
                                    </div>
                                    <h6 className='home-trendingbanner-product-details-company mb-1 text-center text-secondary'>{product.companyName}</h6>
                                </div>
                                <div className='home-trendingbanner-product-addtocart-div'>
                                    <h5 className='home-trendingbanner-product-addtocart text-center text-white'>Add to Cart <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mb-1 bi bi-cart-plus-fill" viewBox="0 0 16 16">
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                                    </svg></h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingBanner;
