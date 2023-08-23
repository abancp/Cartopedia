import React, { useState } from 'react';
import "./AddCompanyProductPage.css"
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
// import AddCompanyProduct from '../../components/AddCompanyProduct/AddCompanyProduct';

function AddCompanyProductPage() {
  const [mrp,setMrp] = useState(null)
  return (
    <div className='AddCompanyProductPage'>
      <Header />
      {/* <AddCompanyProduct/> */}
      <div className="main">
        <img className='bgimg' src="/black-gear.png" alt="" />
        <div className="heading">
          <h3>Add Company products here...</h3>
        </div>
        <div className="product-main">
          <Input width="50rem" type="text" placeholder="Product name" />
        </div>
        <div className='prices'>
          {/* <form onChange={(e)=>{console.log(e.target.value)}}><Input width="20rem" type="number" placeholder="Product name" /></form> */}
          {/* <div onChange={(e)=>{setMrp(e.target.value)}}><Input width="20rem" type="number" placeholder="Product name" /></div> */}
          <input  onChange={(e)=>{setMrp(3)}} />
          {/* <h6 className='offer'>offer : {mrp}</h6> */}
        </div>
        <div className="product-main">
          <Input width="50rem" type="text" placeholder="Product name" />
        </div>
        <div className="product-main">
          <Input width="50rem" type="text" placeholder="Product name" />
        </div>
        <div className="product-main">
          <Input width="50rem" type="text" placeholder="Product name" />
        </div>
        <div className="product-main">
          <Input width="50rem" type="text" placeholder="Product name" />
        </div>
      </div>
    </div>
  );
};

export default AddCompanyProductPage;
