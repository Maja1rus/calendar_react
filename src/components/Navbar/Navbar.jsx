import React from 'react'
import classes from './Navbar.module.css'

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
                <button onClick={prevBtnNavbar}>&lt;</button>
                <button
                    onClick={todayBtnNavbar}
                    className={classes.btn__today}
                >
                    Today
                </button>
                <button onClick={nextBtnNavbar}>&gt;</button>
            </div>
        </div>
    )
}

export default Navbar
