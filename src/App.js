import React, { useState } from 'react'
import './App.css'
import {DateTime} from 'luxon'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import CalendarGrid from './components/CalendarGrid/CalendarGrid'

function App() {
    
    // переменные по дате
    const [listCalendar, setListCalendar] = useState(DateTime.local())
    const startDay = listCalendar.startOf('month').startOf('week')

    //логика Navbar
    const prevBtnNavbar = () => setListCalendar((prev) => prev.minus({months: 1}))
    const todayBtnNavbar = () => setListCalendar(DateTime.local())
    const nextBtnNavbar = () => setListCalendar((prev) =>  prev.plus({months: 1}))

    return (
        <div className="calendar-wrapper">
            <Header />
            <Navbar
                today={listCalendar}
                prevBtnNavbar={prevBtnNavbar}
                todayBtnNavbar={todayBtnNavbar}
                nextBtnNavbar={nextBtnNavbar}
            />
            <CalendarGrid
                startDay={startDay}
                today={listCalendar}
            />
        </div>
    )
}

export default App

