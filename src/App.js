import React, { useState } from 'react'
import './App.css'
import moment from 'moment'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import CalendarGrid from './components/CalendarGrid/CalendarGrid'


function App() {
    
    // переменные по дате
    moment.updateLocale('en', { week: { dow: 1 } })
    // const listCalendar = moment();
    const [listCalendar, setListCalendar] = useState(moment())
    const startDay = listCalendar.clone().startOf('month').startOf('week')
    // window.moment = moment
    
    const prevBtnNavbar = () => setListCalendar(prev => prev.clone().subtract(1, 'month'))
    const todayBtnNavbar = () => setListCalendar(moment())
    const nextBtnNavbar = () => setListCalendar((prev) => prev.clone().add(1, 'month'))

    return (
        <div className="calendar-wrapper">
            <Header />
            <Navbar
                today = {listCalendar}
                prevBtnNavbar={prevBtnNavbar}
                todayBtnNavbar={todayBtnNavbar}
                nextBtnNavbar={nextBtnNavbar}
            />
            <CalendarGrid startDay={startDay} />
        </div>
    )
}

export default App

