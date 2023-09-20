import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import Header from '../../components/Header/Header'
import axios from "axios"
import Previews from '../../components/Previews/Previews'
import collections from "../../configurations/collections"
import IndrestedItems from '../../components/IndrestedItems/IndrestedItems'
import IndrestedProduct from '../../components/IndrestedProduct/IndrestedProduct'
import { useSelector } from 'react-redux'
import Footer from '../../components/Footer/Footer'

function HomePage() {
  const [user, setUser] = useState({})
  const [indrestedItem, setIntrestedItem] = useState({})
  const [coverPhotoname, setCoverPhotoName] = useState('')
  const [trendingProducts, setTrendingProducts] = useState([{}])
  let store = useSelector((state) => (state.user))
  useEffect(() => {
    if (store) store.then((user) => setUser(user))
    if (user.email) { axios.get(`${collections.server_base}/get-indrested-item/${user.email}`).then((res) => { res.data.err ? setIntrestedItem({}) : setIntrestedItem(res.data.indrestedItem) }) }
    axios.get(collections.server_base + "/get-cover-photo",{headers: {"Access-Control-Allow-Origin": "*"}}).then((res) => setCoverPhotoName(res.data.coverPhotoName))
    axios.get(collections.server_base + "/get-trending-products",{headers: {"Access-Control-Allow-Origin": "*"}}).then((res) => setTrendingProducts(res.data.products))
  }, [store, user])
  return (
    <div className='HomePage'>


      <Header />
      <div className='Homepage-main-top'>
        <div className='cover-photo-div'>
          <img className='cover-photo' src={`${collections.server_base}/cover-photos/${coverPhotoname}`} alt="" />
        </div>
        <IndrestedItems item={ user && indrestedItem.name ? indrestedItem : trendingProducts[0]} />
      </div>



      <div className='Homepage-main-bottum'>
        <div className='Previews'>
          <Previews store={store} user={user} />
        </div>
        <div className="trending-products">
          {trendingProducts.map((product, i) => (<IndrestedProduct key={i} indrestedItem={product} />))}
        </div>
      </div>
      <Footer/>


    </div>
  )
}

export default HomePage