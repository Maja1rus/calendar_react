import React from 'react'
import classes from './Navbar.module.css'
import prevImg from '../../assets/prev.png'
import nextImg from '../../assets/next.png'

const Navbar = ({today, prevBtnNavbar, todayBtnNavbar, nextBtnNavbar}) => {
    return (
        <div className={classes.nav__wrapeer}>
            <div className={classes.nav__text}>
                <span className={classes.nav__title}>
                    {today.format('MMMM')}
                </span>
                <span>{today.format('YYYY')}</span>
            </div>
            <div className={classes.btn__wrap}>
                <button onClick={prevBtnNavbar}>
                    <img src={prevImg} alt="prev"/>
                </button>
                <button className={classes.btn__today} onClick={todayBtnNavbar}>
                    Today
                </button>
                <button onClick={nextBtnNavbar}>
                    <img src={nextImg} alt="next"/>
                </button>
            </div>
        </div>
    )
}

export default Navbar
