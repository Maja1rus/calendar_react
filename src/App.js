import React, {useState, useEffect} from 'react'
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import CalendarGrid from './components/CalendarGrid/CalendarGrid'
import ShowForm from './components/ShowForm/ShowForm'
import { useSelector } from 'react-redux'

const url = 'http://localhost:3004'

function App() {
    const listCalendar = useSelector((state) => state.calendars)
    const today = listCalendar.dateTime

    const defaultEvent = {
        title: '',
        description: ''
    }

    const [method, setMethod] = useState(null)
    const [isShowForm, setIsShowForm] = useState(false)
    const [eventUp, setEventUp] = useState(null)
    
    const [events, setEvents] = useState([])
    const openFormHandler = (methodName, eventForUpdate) => {
        console.log('onClick', methodName);
        setIsShowForm(true)
        setEventUp(eventForUpdate || defaultEvent)
        setMethod(methodName)
    }

    
    
    useEffect(() => {
        const startDay = today.startOf('month').startOf('week')
        const endDay = today.endOf('month').endOf('week')
        fetch(
            `${url}/events?date_gte=${startDay.toSeconds()}&date_lte=${endDay.toSeconds()}`
        )
            .then((res) => res.json())
            .then((res) => {
                console.log('Response', res)
                setEvents(res)
            })
    }, [today])

    console.log(today.toFormat('EEE'))

    return (
        <>
            <ShowForm
                setEvents={setEvents}
                eventUp={eventUp}
                setEventUp={setEventUp}
                isShowForm={isShowForm}
                setIsShowForm={setIsShowForm}
                method={method}
                url={url}
                today={today}
            />
            <div className="calendar-wrapper">
                <Header />
                <Navbar />
                <CalendarGrid
                    openFormHandler={openFormHandler}
                    events={events}
                    setEvents={setEvents}
                    eventUp={eventUp}
                />
            </div>
        </>
    )
}

export default App
