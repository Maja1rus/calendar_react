import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import CalendarGrid from './components/CalendarGrid/CalendarGrid'

function App() {
    return (
        <div className="calendar-wrapper">
            <Header />
            <Navbar/>
            <CalendarGrid/>
        </div>
    )
}

export default App
