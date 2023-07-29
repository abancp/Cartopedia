import React, { useEffect, useState } from 'react';
import "./AddCompanyProduct.css";
import Dropzone from 'react-dropzone';
import axios from 'axios';
import collections from '../../configurations/collections';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../configurations/firebase"

function AddCompanyProduct() {
  const [photo, setPhoto] = useState(null);
  const [detailedPhotos, setDetailedPhotos] = useState([]);
  const [companyMail, setCompanyMail] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const navigate = useNavigate();
  const storage = getStorage(app);

  var store = useSelector((state) => { return state.user })
  useEffect(() => {
    store.then((res) => {
      setCompanyMail(res.email)
      if (res.companyDetails === undefined) {
        navigate("/")
      } else {
        setCompanyName(res.companyDetails.companyName)
      }
    })
  }, [navigate, store])

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name:e.target[1].value,
      price:e.target[2].value,
      category:e.target[4].value,
      stock:e.target[5].value,
      tags:e.target[6].value.split(','),
      description:e.target[7].value,
      date:Date.now(),
      trend:0,
      comapanyId:companyMail,
      companyName:companyName
    }
    axios.post(collections.server_base+"/company/add-product",product,{ headers: { 'Authorization':  window.localStorage.getItem("token") } }).then((res)=>{

    let fromDataProfile = new FormData();
    fromDataProfile.append('_id',res.data.id);
    fromDataProfile.append("file",photo);
    axios.post(collections.server_base+"/uplaod/product-display",fromDataProfile,{ headers: { 'Authorization':  window.localStorage.getItem("token") } });

    let formDataDetailed = new FormData();
    formDataDetailed.append('_id',res.data.id);
    for (let i = 0; i < detailedPhotos.length; i++) {
        const storageRef = ref(storage, `product-detaileds/${res.data.id}/${res.data.id}[${i}]`);
        uploadBytes(storageRef, detailedPhotos[i]).then(() => { })
      }
    axios.post(collections.server_base + "/uplaod/product-details", formDataDetailed,{ headers: { 'Authorization':  window.localStorage.getItem("token") } });
    })
  }
  return (
    <div className='addcompanyproduct'>
      <div className='container-fluid'>
        <div className='row'>
          <div className=' d-flex justify-content-center '>
            <div className='col-12 col-sm-11 col-md-8 col-lg-6 col-xl-5 p-3 addcompanyproduct-main-div '>
              <form action="" onSubmit={handleSubmit}>
                <div className='d-flex justify-content-between'>
                  <div className="col mr-1">
                    <Dropzone multiple={false} onDrop={acceptedFiles => { setPhoto(acceptedFiles[0]) }}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div className='addcompanyproduct-product-imagepicker-dropzone d-flex justify-content-center ' {...getRootProps()}>
                            <input className='register-form-input'  {...getInputProps()} />

                            <h6 className='text-secondary my-auto'>{`${photo ? photo.name : "Display Photo Browse or Drop"}`}</h6>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                    <input type="text" className='register-form-password-input register-form-input' name='name' placeholder='Product Name' />
                    <input type="text" className='register-form-password-input register-form-input' name='price' placeholder='Price (rupee)' />
                  </div>
                  <div className='width-1rem'></div>
                  <div className="col ml-1">
                    <Dropzone multiple={true} onDrop={acceptedFiles => { setDetailedPhotos(acceptedFiles) }}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div className='addcompanyproduct-product-imagepicker-dropzone d-flex justify-content-center ' {...getRootProps()}>
                            <input className='register-form-input'  {...getInputProps()} />

                            <h6 className='text-secondary my-auto'>{`${detailedPhotos.length === 0 ? "Detailed Photos Browse or Drop" : "You can put here More"}`}</h6>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                    <input type="text" className='register-form-password-input register-form-input' name='price' placeholder='Category' />
                    <input type="text" className='register-form-password-input register-form-input' name='price' placeholder='Stock' />
                  </div>
                </div>
                <textarea type="text" className='register-form-password-input register-form-input' name='price' placeholder='Tags( Seperated by coma )' />
                <textarea type="text" className='register-form-password-input register-form-input' name='price' placeholder='Description' rows={"3"} />
                <button className='register-form-submit-button' type="submit">SUBMIT</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyProduct;
