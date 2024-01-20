import React, { useEffect } from 'react'
import "./LoadingPage.css"
import axios from 'axios'
import Header from '../../components/Header/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import collections from '../../configurations/collections'

function LoadingPage() {
    const navigate = useNavigate()
    const location = useLocation()
    let loadingCode = location.state.loadingCode
    useEffect(() => {
        switch (loadingCode) {
            case 0:
                navigate("/search", { state: { searchedLine: location.state.searchedLine, email: location.state.email } })
                break
            case 1:
                if ( window.localStorage.getItem("token")) {
                    axios.post(collections.server_base + "/get-user-details", { token:  window.localStorage.getItem("token") }).then((res) => {
                        if (res.data.company) {
                            navigate("/add-company-product")
                        } else {
                            navigate("/")
                        }
                    })
                }
                break
            default:
                navigate("/")
        }
    }, [navigate, location,loadingCode])

    return (
        <div className='LoadingPage'>
            <Header />
            <div className="main">
                <div className="player-1 player"></div>
                <div className="player-2 player"></div>
                <div className="player-3 player"></div>
            </div>
        </div>
    )
}

export default LoadingPage