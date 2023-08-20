import React, { useEffect } from 'react'
import "./LoadingPage.css"
import Header from '../../components/Header/Header'
import { useLocation, useNavigate } from 'react-router-dom'

function LoadingPage() {
    const navigate = useNavigate()
    const location = useLocation();
    let email = location.state.email
    let searchedLine = location.state.searchedLine
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