import React, { useEffect } from 'react'
import "./LoadingPage.css"
import Header from '../../components/Header/Header'
import { useLocation, useNavigate } from 'react-router-dom'

function LoadingPage() {
    const navigate = useNavigate()
    const location = useLocation();
    console.log(location.state)
    let searchedLine = location.state.searchedLine
    let email = location.state.email
    useEffect(()=>{ navigate("/search", { state: { searchedLine, email } })},[])
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