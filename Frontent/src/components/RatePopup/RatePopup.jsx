import React, { useEffect, useState } from 'react'
import "./RatePopup.css"
import SlideBar from '../RateSlideBar/SlideBar'

function RatePopup(props) {
    const [percent1, setPercent1] = useState(props.rating?.rates[4]*100/Number(props.rating?.totalRatings))
    const [percent2, setPercent2] = useState(props.rating?.rates[3]*100/Number(props.rating?.totalRatings))
    const [percent3, setPercent3] = useState(props.rating?.rates[2]*100/Number(props.rating?.totalRatings))
    const [percent4, setPercent4] = useState(props.rating?.rates[1]*100/Number(props.rating?.totalRatings))
    const [percent5, setPercent5] = useState(props.rating?.rates[0]*100/Number(props.rating?.totalRatings))
    useEffect(() => {
        setPercent1(props.rating?.rates[4]*100/Number(props.rating?.totalRatings))
        setPercent2(props.rating?.rates[3]*100/Number(props.rating?.totalRatings))
        setPercent3(props.rating?.rates[2]*100/Number(props.rating?.totalRatings))
        setPercent4(props.rating?.rates[1]*100/Number(props.rating?.totalRatings))
        setPercent5(props.rating?.rates[0]*100/Number(props.rating?.totalRatings))
    })
    return (
        <div className='RatePopup' onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
            <div className="rates">
                <h6 className='rate-star-h6' >5
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="rate-star bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                </h6>
                <SlideBar percent={isNaN(percent5)?0: percent5} width="12rem" />
                <h6 className='rate-percent-h6'>{isNaN(percent5)?0: percent5?.toFixed()}%</h6>
            </div>
            <div className="rates">
                <h6 className='rate-star-h6' >4
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="rate-star bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                </h6>
                <SlideBar percent={isNaN(percent4)?0:percent4} width="12rem" />
                <h6 className='rate-percent-h6'>{isNaN(percent4)?0:percent4?.toFixed()}%</h6>
            </div>
            <div className="rates">
                <h6 className='rate-star-h6' >3
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="rate-star bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                </h6>
                <SlideBar percent={isNaN(percent3)?0:percent3} width="12rem" />
                <h6 className='rate-percent-h6'>{isNaN(percent3)?0:percent3?.toFixed()}%</h6>
            </div>
            <div className="rates">
                <h6 className='rate-star-h6' >2
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="rate-star bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                </h6>
                <SlideBar percent={isNaN(percent2)?0:percent2} width="12rem" />
                <h6 className='rate-percent-h6'>{isNaN(percent2)?0:percent2?.toFixed()}%</h6>
            </div>
            <div className="rates">
                <h6 className='rate-star-h6' >1
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="rate-star bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                </h6>
                <SlideBar percent={isNaN(percent1)?0:percent1} width="12rem" />
                <h6 className='rate-percent-h6'>{isNaN(percent1)?0:percent1?.toFixed()}%</h6>
            </div>
        </div>
    )
}

export default RatePopup
