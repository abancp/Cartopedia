import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import collections from "../../configurations/collections";
function Header(props) {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [company, setCompany] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [showVoiceSearchPopup, setShowVoiceSearchPopup] = useState(false)
  const [voiceSearch, setVoiceSearch] = useState('')
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);



  useEffect(() => {
    if (user) {
      setUserName(user.firstName + " " + user.lastName);
      setEmail(user.email);
      setCompany(user.company);
      setAdmin(user.admin);
      setUserId(user._id);
    }
  }, [user]);
  const searchItem = (e) => {
    e.preventDefault()
    // console.log(e.target[0].value);
    if (e.target[0].value) {
      navigate("/loading", {
        state: { loadingCode: 0, searchedLine: e.target[0].value, email: email },
      });
    } else {
      setShowVoiceSearchPopup(true)
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.lang = 'en-US'
        recognition.onstart = () => { setVoiceSearch('Recording') }
        recognition.onresult = (e) => {
          setVoiceSearch(e.results[0][0].transcript)

          setTimeout(()=>{navigate("/loading", {
            state: { loadingCode: 0, searchedLine: voiceSearch, email: email },
          })},500)
        }
        recognition.start()
      }
    }

  };
  return (
    <div className="Header">
      {/* seting left section of the header */}
      <div className="left-div">
        <h3 className="branding" onClick={() => window.location.pathname !== "/" ? navigate("/") : null}>Cartopedia</h3>
        <h5
          className="sell"
          onClick={() =>
            window.location.pathname !== "/add-company-product" &&
            navigate("/loading", { state: { loadingCode: 1 } })
          }
        >
          {" "}
          {company && "Sell"}{" "}
        </h5>
        <Link to={"/admin/dashboard"} className="text-decoration-none panel">
          <h5 className="panel"> {admin && "Panel"} </h5>
        </Link>
      </div>

      {/* seting center section of the header */}
      <div className="center-div">
        <div className="search">
          <form className="search-form" onSubmit={searchItem}>
            <input
              type="text"
              placeholder={props.searchedLine ? props.searchedLine : ""}
              className="search-input"
            />
            <button className="search-btn" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23    "
                fill="currentColor"
                className="search-icon bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* seting right section of the header  */}
      <div className="right-div">
        {userName && (
          <Link to={"/orders/" + userId} className="orders-link">
            <div className="cart-icon-div">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="currentColor"
                class="cart-svg bi bi-list-ul"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                />
              </svg>
            </div>
          </Link>
        )}

        {userName && (
          <Link to="/cart" className="cart-link">
            <div className="cart-icon-div">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="currentColor"
                class="cart-svg bi bi-cart2"
                viewBox="0 0 16 16"
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
              </svg>
            </div>
          </Link>
        )}

        <div className="account">
          {userName && (
            <Link className="text-decoration-none" to={"/user-profile/view"}>
              <div className="profile-image">
                <img
                  className="user-profile-img"
                  src={
                    collections.server_base + "/user-profiles/" + email + ".jpg"
                  }
                  alt="profile"
                />
              </div>
            </Link>
          )}

          {userName ? (
            <div className="account-loggedin-div">
              <Link className="text-decoration-none" to={"/user-profile/view"}>
                <h5 className="account-login-h4 username-h5">{userName}</h5>
              </Link>
            </div>
          ) : (
            <div className="account-loginorsignup">
              <div className="account-login-div">
                <Link className="text-decoration-none" to={"/login"}>
                  <h5 className="account-login-h4">login</h5>
                </Link>
              </div>

              <div className="account-signup-div">
                <Link className="text-decoration-none" to={"/signup"}>
                  <h5 className="account-signup-h4">signup</h5>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {showVoiceSearchPopup && <div className="voice-search-popup-main">
        <div className="voice-search-popup">
          <div className="animation">
            <div className="blocks block-1"></div>
            <div className="blocks block-2"></div>
            <div className="blocks block-3"></div>
            <div className="blocks block-4"></div>
            <div className="blocks block-5"></div>
            <div className="blocks block-6"></div>
            <div className="blocks block-7"></div>
            <div className="blocks block-8"></div>
            <div className="blocks block-9"></div>
            <div className="blocks block-10"></div>
            <div className="blocks block-11"></div>
            <div className="blocks block-12"></div>
            <div className="blocks block-13"></div>
            <div className="blocks block-14"></div>
            <div className="blocks block-15"></div>
            <div className="blocks block-16"></div>
            <div className="blocks block-17"></div>
            <div className="blocks block-18"></div>
            <div className="blocks block-19"></div>
            <div className="blocks block-20"></div>
          </div>
          <h4 className="voice-search-text">{voiceSearch}</h4>
        </div>
      </div>}
    </div>
  );
}

export default Header;
