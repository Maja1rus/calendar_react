import React, {useState} from 'react'
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import CalendarGrid from './components/CalendarGrid/CalendarGrid'
import ShowForm from './components/ShowForm/ShowForm'

function App() {
    const [isShowForm, setIsShowForm] = useState(false)
    const [daySelected, setDaySelected] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState(null)

    return (
        <div className="calendar-wrapper">
            <ShowForm
                isShowForm={isShowForm}
                setIsShowForm={setIsShowForm}
                daySelected={daySelected}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
            />
            <Header />
            <Navbar />
            <CalendarGrid
                setDaySelected={setDaySelected}
                setSelectedEvent={setSelectedEvent}
                setIsShowForm={setIsShowForm}
            />
        </div>
    )
}

export default App
