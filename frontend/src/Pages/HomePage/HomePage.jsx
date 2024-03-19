import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Previews from "../../components/Previews/Previews";
import collections from "../../configurations/collections";
import IndrestedItems from "../../components/IndrestedItems/IndrestedItems";
import IndrestedProduct from "../../components/IndrestedProduct/IndrestedProduct";
import Alert from "../../components/Alert/Alert";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";

const HomePage = () => {
  const [indrestedItem, setIntrestedItem] = useState({});
  const [coverPhotoname, setCoverPhotoName] = useState("");
  const [trendingProducts, setTrendingProducts] = useState([{}]);
  const [coverLoaded, setCoverLoaded] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    //getting user from store
    if (user) {
      axios.get(`${collections.server_base}/get-indrested-item`).then((res) => {
        res.data.err
          ? setIntrestedItem({})
          : setIntrestedItem(res.data.indrestedItem);
      });
    }
    //get cover photo from backend
    axios.get(collections.server_base + "/get-cover-photo").then((res) => setCoverPhotoName(res.data.coverPhotoName));
    //getting 20 trending products from backend
    axios.get(collections.server_base + "/get-trending-products").then((res) =>{ setTrendingProducts(res.data.products)
    })
  }, [user]);

  return (
    <div className="HomePage">
      <Header />
      {/* <Alert/> */}
      <div className="Homepage-main-top">
        <div className="cover-photo-div">
          <img
            className="cover-photo"
            src={`${collections.server_base}/cover-photos/${coverPhotoname}`}
            alt=""
            style={coverLoaded?{'display':'block'}:{'display': 'none'}}
            onLoad={()=>{setCoverLoaded(true)}}
          />
          {coverLoaded||<LoadingSkeleton borderR={'5px'} width={'85%'} height={'80%'}/>}
        </div>
        <div className="indrested-products-div">
          <IndrestedItems
            item={
              user && indrestedItem?.name ? indrestedItem : trendingProducts[0]
            }
          />
        </div>
      </div>

      <div className="Homepage-main-bottum">
        <div className="previews">
          <Previews user={user} />
        </div>
        <div className="trending-products">
          {trendingProducts.map((product, i) => (
            <IndrestedProduct key={i} indrestedItem={product} />
          ))}
        </div>
        <div className="trending-products">
          {trendingProducts.map((product, i) => (
            <IndrestedProduct key={i} indrestedItem={product} />
          ))}
        </div>
        <div className="trending-products">
          {trendingProducts.map((product, i) => (
            <IndrestedProduct key={i} indrestedItem={product} />
          ))}
        </div>
        <div className="trending-products">
          {trendingProducts.map((product, i) => (
            <IndrestedProduct key={i} indrestedItem={product} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
