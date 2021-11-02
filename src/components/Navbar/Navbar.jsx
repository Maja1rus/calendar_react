import React from 'react'
import classes from './Navbar.module.css'
import prevImg from '../../assets/prev.png'
import nextImg from '../../assets/next.png'
import {useSelector, useDispatch} from 'react-redux'
import { NEXT_MONTHS, PREV_MONTHS, TODAY_MONTHS } from '../../store/calendarActions'

const Navbar = () => {
    const listCalendar = useSelector((state) => state.calendars)
    const dispatch = useDispatch()

    const nextBtnNavbar = () => dispatch({ type: NEXT_MONTHS, payload: 1 })
    const todayBtnNavbar = () => dispatch({type: TODAY_MONTHS})
    const prevBtnNavbar = () => dispatch({type: PREV_MONTHS, payload: 1})

    return (
        <div className={classes.nav__wrapeer}>
            <div className={classes.nav__text}>
                <span className={classes.nav__title}>
                    {listCalendar.dateTime.toFormat('MMMM')}
                </span>
                <span>{listCalendar.dateTime.toFormat('yyyy')}</span>
            </div>
            <div className={classes.btn__wrap}>
                <button onClick={prevBtnNavbar}>
                    <img src={prevImg} alt="prev" />
                </button>
                <button className={classes.btn__today} onClick={todayBtnNavbar}>
                    Today
                </button>
                <button onClick={nextBtnNavbar}>
                    <img src={nextImg} alt="next" />
                </button>
            </div>
        </div>
    )
}

export default Navbar
