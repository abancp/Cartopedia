import React, { useState, useEffect } from 'react'
import "./AddCompanyProductPage.css"
import axios from "axios"
import Popup from '../../components/Popup/Popup'
import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
import Dropzone from 'react-dropzone'
import collections from "../../configurations/collections"
import CompanyInput from '../../components/Inputs/CompanyInput'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'

function AddCompanyProductPage() {
  const [showBlock, setShowBlock] = useState(true)
  // product state
  const [productMrp, setProductMrp] = useState('')
  const [productTags, setProductTags] = useState([])
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productStock, setProductStock] = useState('')
  const [productCategory, setProductCategory] = useState('0')
  const [productDescription, setProductDescription] = useState('')
  // all categorirs list state
  const [categories, setCategories] = useState([])
  // product errors 
  const [productMrpErr, setProductMrpErr] = useState('')
  const [productTagsErr, setProductTagsErr] = useState('')
  const [productNameErr, setProductNameErr] = useState('')
  const [productPriceErr, setProductPriceErr] = useState('')
  const [productStockErr, setProductStockErr] = useState('')
  const [productCategoryErr, setProductCategoryErr] = useState('')
  const [productDescriptionErr, setProductDiscriptionErr] = useState('')
  // company state
  const [companyName, setCompanyName] = useState('')
  const [companyMail, setCompanyMail] = useState('')
  const [companySite, setCompanySite] = useState('')
  //popup boolean state
  const [showPopup, setShowPopup] = useState(false)
  //images state
  const [photo, setPhoto] = useState(null)
  const [detailedPhotos, setDetailedPhotos] = useState([])
  const [detailedPhotosLength, setDetailedPhotosLength] = useState(0)
  //making instances
  const store = useSelector((reduxState) => (reduxState.user))
  const navigate = useNavigate()
  //useState function 
  useEffect(() => {
    if (store) {
      store.then((user) => {
        setCompanyMail(user.email)
        if (user.companyDetails === undefined) {
          navigate("/")
        } else {
          setShowBlock(false)
          setCompanyName(user.companyDetails.companyName)
          setCompanySite(user.companyDetails.website)
        }
      })
    } else {
      navigate("/")
    }
  })
  useState(() => {
    navigate("/")
    axios.get(collections.server_base + "/company/all-categories", { headers: { 'Authorization': window.localStorage.getItem("token") } }).then((res) => setCategories(res.data.categories))
  }, [])
  // function checing entered values
  const checkAll = (e) => {
    e.preventDefault();
    const product = { productName, productPrice, productMrp, productCategory, productStock, productTags, productDescription }
    axios.post(collections.server_base + "/company/check-company-product", product, { headers: { 'Authorization': window.localStorage.getItem("token") } }).then((res) => {
      setProductNameErr(res.data.productNameErr)
      setProductPriceErr(res.data.productPriceErr)
      setProductMrpErr(res.data.productMrpErr)
      setProductCategoryErr(res.data.productCategoryErr)
      setProductTagsErr(res.data.productTagsErr)
      setProductStockErr(res.data.productStockErr)
      setProductDiscriptionErr(res.data.productDescriptionErr)
      if (res.data.CompanyProductCompleteOk) {
        setShowPopup(true)
      }
    })
  }
  // function for submit product
  const handleSubmit = (e) => {
    e.preventDefault();
    // creating product object
    const product = {
      name: productName,
      price: productPrice,
      mrp: productMrp,
      category: productCategory,
      stock: productStock,
      tags: productTags,
      description: productDescription,
      numberOfDetailed: detailedPhotos.length,
      date: Date.now(),
      comapanyId: companyMail,
      companyName: companyName,
      companySite: companySite
    }
    //upload the product
    axios.post(collections.server_base + "/company/add-company-product", product, { headers: { 'Authorization': window.localStorage.getItem("token") } }).then((res) => {
      //post the display photo
      let fromDataProfile = new FormData();
      fromDataProfile.append('_id', res.data.id);
      fromDataProfile.append("file", photo);
      axios.post(collections.server_base + "/uplaod/product-display", fromDataProfile, { headers: { 'Authorization': window.localStorage.getItem("token") } });

      // post the detailed images
      let formDataDetailed = new FormData();
      formDataDetailed.append('_id', res.data.id);
      for (let i = 0; i < detailedPhotos.length; i++) {
        formDataDetailed.append("index", i);
        formDataDetailed.append("files", detailedPhotos[i]);
      }
      axios.post(collections.server_base + "/uplaod/product-details", formDataDetailed, { headers: { 'Authorization': window.localStorage.getItem("token") } }).then((res) => {
        navigate("/loading", { state: { loadingCode: 1 } })
      });
    })
  }

  return (

    <div className='AddCompanyProductPage'>
      <Header />
      <div className="main">
        {showBlock ? <div className="users-block"></div> : null}
        <img className='bgimg' src="/black-gear.png" alt="" />
        <div className="heading">
          <h3 className='heading-h6'>Add Company products here...</h3>
        </div>
        <div className="product-main">
          <CompanyInput value={productName} error={productNameErr} onChange={(e) => { setProductName(e.target.value) }} width="70rem" type="text" placeholder="Product Name ( Unique ) [ Max 50 Charectors ]" />
        </div>
        <div className='prices'>
          <CompanyInput value={productPrice} error={productPriceErr} onChange={(e) => { setProductPrice(e.target.value) }} width="34.8rem" type="text" placeholder="Your Price ( in Rupees '₹' ) [ Max 1,000,000 ₹ ]" />
          <CompanyInput value={productMrp} error={productMrpErr} onChange={(e) => { setProductMrp(e.target.value) }} width="34.8rem" type="text" placeholder="Maximum Retail Price ( in Rupees '₹' ) [ Max 1,000,000 ₹ ] " />
        </div>
        <div className="product-main">
          <select value={productCategory} style={{ 'color': productCategory !== '0' ? 'var(--primary)' : 'var(--secondery)' }} onChange={(e) => { setProductCategory(e.target.value) }} className='category-selector'  >
            <option style={{ "color": 'var(--secondery)' }} value="0" className='select'>Category ( Select One )</option>
            {
              categories.map((category, i) => (
                <option className='category-options' key={i} value={category}>{category}</option>
              ))
            }
            <option style={{ "color": 'var(--secondery)' }} value="add-catrgory">-----------------Request for new Category----------------- </option>
          </select>
          <h6 className="error">{productCategoryErr}</h6>
        </div>
        <div className="product-main">
          <CompanyInput value={productTags} error={productTagsErr} onChange={(e) => { setProductTags(e.target.value.split(",")) }} width="70rem" type="text" placeholder="Tags (Seperated with commas ',' ) [ Atleast 15 tags ] " />
        </div>
        <div className="product-main">
          <CompanyInput value={productStock} error={productStockErr} onChange={(e) => { setProductStock(e.target.value) }} width="70rem" type="text" placeholder="Stock" />
        </div>
        <div className="product-main">
          <textarea value={productDescription} onChange={(e) => { setProductDescription(e.target.value) }} className='description-text-area' placeholder='Description [ Minimum 20 charectors ]' />
          <h6 className="description-error">{productDescriptionErr}</h6>
        </div>
        <div className='dropzone-div'>
          <Dropzone multiple={false} onDrop={acceptedFiles => { setPhoto(acceptedFiles[0]) }}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className='dropzone' {...getRootProps()}>
                  <input   {...getInputProps()} />
                  <h6 className='dropzon-placeholder' style={{ 'color': photo ? 'var(--primary)' : 'var(--secondery)' }} >{`${photo ? photo.name : "Display Photo Browse or Drop ( one image )"}`}</h6>
                </div>
              </section>
            )}
          </Dropzone>
          <Dropzone multiple={true} onDrop={acceptedFiles => { setDetailedPhotos(acceptedFiles); setDetailedPhotosLength(detailedPhotosLength + acceptedFiles.length) }}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className='dropzone' {...getRootProps()}>
                  <input  {...getInputProps()} />

                  <h6 className='dropzon-placeholder' style={{ 'color': detailedPhotos.length === 0 ? 'var(--secondery)' : 'var(--primary)' }} >{`${detailedPhotos.length === 0 ? "Detailed Photos Browse or Drop ( Maximum 10 images )" : detailedPhotosLength <= 10 ? `You can put here  ${10 - detailedPhotosLength}  More` : "Not accept more images ( 10 Images added )"}`}</h6>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className='product-main bottum-div'>
          <Button onClick={checkAll} className="submit-btn" height="2.5rem" text="S U B M I T" borderRadius="2px" width="70rem" color="green" icon={<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-cart-x" viewBox="0 0 16 16"><path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" /><path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>} />
        </div>
      </div>
      {showPopup ? <Popup submit={handleSubmit} cancel={() => setShowPopup(false)} name={productName} price={productPrice} mrp={productMrp} category={productCategory} tags={productTags} description={productDescription} stock={productStock} display={photo} detaileds={detailedPhotos} /> : null}
      <Footer />
    </div>
  )
}

export default AddCompanyProductPage