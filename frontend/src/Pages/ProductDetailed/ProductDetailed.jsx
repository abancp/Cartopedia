import React, { useEffect, useRef, useState } from "react";
import "./ProductDetailed.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import collections from "../../configurations/collections";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CompanyMiniView from "../../components/CompanyMiniView/CompanyMiniView";
import { useSelector } from "react-redux";
import StarRating from "react-star-ratings";
import RatePopup from "../../components/RatePopup/RatePopup";
import ReactImageMagnify from 'react-image-magnify'


//TODO : showing detaild images
//TODO : Zoom when hover image

function ProductDetailed() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const imageDivRef = useRef(null)

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [showRatePopup, setShowRatePopup] = useState(false);
  const [displayImage, setDisplayImage] = useState()
  const [rating, setRating] = useState({
    rate: 0,
    totalRatings: 0,
    rates: [0, 0, 0, 0, 0],
  });
  const [imageWidth, setImageWidth] = useState(500)
  const [imageHeight, setImageHeight] = useState(500)

  const handleImagechange = (i) => {
    setDisplayImage(images[i])
  }

  useEffect(() => {
    axios.get(collections.server_base + "/product/" + id).then((res) => {
      setProduct(res.data);
      setRating(res.data.rating);
      setImages(
        res.data.displayUrl
          ? [res.data.displayUrl]
          : [collections.server_base + "/product-displays/" + id + ".jpg"]
      );
      setDisplayImage(res.data.displayUrl
        ? [res.data.displayUrl]
        : [collections.server_base + "/product-displays/" + id + ".jpg"])
    });
  }, [id]);

  useEffect(() => {
    if (product.numberOfDetailed !== 0) {
      for (let i = 0; i <= product.numberOfDetailed; i++) {
        console.log(i);
        setImages((images) => [
          images.push(collections.server_base + "/product-details/" + id + "/" + id + "(" + i + ").jpg")
        ]);
      }
    }
    if (product.detailsUrls) {
      setImages((images) => [
        images[0],
        ...product.detailsUrls
      ])
    }

  }, [product])

  useEffect(() => {
    setDisplayImage(images[0])
  }, [images])

  useEffect(() => {
    setImageWidth(imageDivRef.current.offsetWidth)
    setImageHeight(imageDivRef.current.offsetHeight)
  }, [imageDivRef.current,product,displayImage])

  const handleClickAddToCart = () => {
    axios
      .patch(`${collections.server_base}/add-to-cart/${id}/${1}/${user._id}`)
      .then((res) => {
        if (res.data.cartPriceLimitErr) {
          alert("Maximum 500,000 rupees in cart");
        } else {
          alert("Iterm added to Cart");
        }
      });
  };

  const handleRateChange = (newRate) => {
    axios
      .patch(
        `${collections.server_base}/rate-product?proId=${id}&rate=${newRate}&userId=${user._id}`
      )
      .then((res) => {
        setRating(res.data.rating);
      });
  };

  const handleMouseEnterToRate = (e) => {
    setShowRatePopup(true);
  };

  const handleMouseLeaveToRate = (e) => {
    setShowRatePopup(false);
  };
  return (
    <div className="ProductDetailed">
      <Header />
      <div className="main">
        <div className="product-left">
          <div className="image-selector-div">
            {
              images.map((image, i) => (
                <div key={i} className={`image-selector-image-div  ${i == images.indexOf(displayImage) ? 'opened-img' : 'closed-img'} `} onClick={() => { handleImagechange(i) }} >
                  <img className="images-selector-img" src={image} alt="" />
                </div>
              ))
            }
          </div>
          <div className="image-div" ref={imageDivRef} >
            <ReactImageMagnify   {...{
              smallImage: {
                alt: '',
                isFluidWidth: true,
                src: displayImage
              },
              largeImage: {
                src: displayImage,
                width: imageWidth*2,
                height: imageHeight*2
              }
            }} />
          </div>


        </div>
        <div className="product-right">
          {/* <img className="zoomed-img" src="" alt="" /> */}
          <h3 className="product-name">{product.name}</h3>
          <div className="product-prices">
            <h5 className="product-price">₹ {product.price} </h5>
            <h5 className="product-mrp">
              ₹ <strike>{product.mrp}</strike>
            </h5>
            <h5 className="product-offer">
              {100 -
                Math.round(
                  (parseInt(product.price) * 100) / parseInt(product.mrp)
                )}
              % Offer
            </h5>
          </div>
          <div className="star-rating-div">
            <h5
              className="rate-h6"
              onMouseEnter={handleMouseEnterToRate}
              onMouseLeave={handleMouseLeaveToRate}
            >
              {rating?.rate.toFixed(1)?rating?.rate.toFixed(1):0} Rating {" "}
            </h5>
            <StarRating
              rating={rating?.rate}
              starRatedColor="rgb(0, 195, 255)"
              starEmptyColor="rgba(9, 61, 77, 0.8)"
              starDimension="35px"
              starSpacing="3px"
              starHoverColor="#DBE8E1"
              changeRating={handleRateChange}
            />
            <h6
              className="total-rate-h6"
              onMouseEnter={handleMouseEnterToRate}
              onMouseLeave={handleMouseLeaveToRate}
            >
              {" "}
              Total {rating?.totalRatings?rating?.totalRatings:0} votting
            </h6>
          </div>
          {showRatePopup && (
            <RatePopup
              rating={rating}
              onMouseEnter={handleMouseEnterToRate}
              onMouseLeave={handleMouseLeaveToRate}
            />
          )}
          {/* <div className="product-properties"> */}
          {/* <Property /> */}
          {/* </div> */}
          <div className="description-div">
            <h5 className="product-description">{product.description}</h5>
          </div>
          <div className="product-buy">
            <div className="add-to-cart" onClick={handleClickAddToCart}>
              <h3>Add to Cart </h3>
            </div>
            <div className="buy-now">
              <h3>Buy Now</h3>
            </div>
          </div>
          <div className="company-div">
            <CompanyMiniView {...product} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailed;
