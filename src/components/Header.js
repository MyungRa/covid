import React from 'react'
import Moment from 'react-moment'

const Header = () => {
    const nowDate = new Date();
    return (
        <header className="header">
            <h1>
                코로나바이러스감염증-19(COVID-19) 
                <span style={{fontSize: 18}}>(2020/01/01 ~ <Moment format='YYYY/MM/DD'>{nowDate}</Moment>)</span>
            </h1>
        </header>
    )
}

export default Header
