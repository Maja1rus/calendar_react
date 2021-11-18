import React, {useState} from 'react'
import classes from './ShowForm.module.css'
import {useSelector} from 'react-redux'
import {IoReorderTwo, IoClose, IoTimeOutline, IoText, IoTrashOutline} from 'react-icons/io5'

const ShowForm = ({isShowForm, setIsShowForm, daySelected, selectedEvent, setSelectedEvent}) => {
    const listCalendar = useSelector((state) => state.calendars)
    const today = listCalendar.dateTime
    const dayItem = daySelected ? daySelected : today

    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '')
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '')


    const clearCalendarEvent = () => {
        setTitle('')
        setDescription('')
        setSelectedEvent(null)
    }
    
    const handleSubmit = (e) => {
        const calendarEvents = {
            title,
            description,
            date: dayItem.toSeconds()
        }
        e.preventDefault()
        let eventsArr = JSON.parse(localStorage.getItem('calendarEvents')) || []
        if (selectedEvent) {
            console.log('update')
            const id = selectedEvent.id
            let eventUp = eventsArr.find(item => item.id === id)
            eventUp.title = title ? title : selectedEvent.title
            eventUp.description = description ? description : selectedEvent.description
        } else {
            console.log('create')
            eventsArr.push(calendarEvents)
            eventsArr.forEach((n, i) => (n.id = i + 1))

        }
        localStorage.setItem('calendarEvents', JSON.stringify(eventsArr))
        setIsShowForm(false)
        clearCalendarEvent()
    }
    
    const deleteEvent = () => {
        let eventsArr = JSON.parse(localStorage.getItem('calendarEvents'))
        const id = selectedEvent.id
        let eventDel = eventsArr.findIndex((item) => item.id === id)
        console.log('splice', eventsArr.splice(eventDel, 1))
        localStorage.setItem('calendarEvents', JSON.stringify(eventsArr))
        setIsShowForm(false)
        clearCalendarEvent()
    }

    console.log('selectedEvent', selectedEvent)
    const cancelButtonHandler = () => {
        clearCalendarEvent()
        setIsShowForm(false)
    }

    return (
        <>
            {isShowForm ? (
                <div className={classes.form__show_wrapper}>
                    <div className={classes.form}>
                        <div className={classes.form__header}>
                            <span>
                                <IoReorderTwo className={classes.svg} />
                            </span>
                            <div className={classes.button__wrapper_header}>
                                {selectedEvent ? (
                                    <button>
                                        <IoTrashOutline
                                            className={classes.svg}
                                            onClick={deleteEvent}
                                        />
                                    </button>
                                ) : (
                                    ''
                                )}

                                <button>
                                    <IoClose
                                        className={classes.svg}
                                        onClick={cancelButtonHandler}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className={classes.form__body}>
                            <div className={classes.form__body_item}>
                                <span>
                                    <IoText className={classes.svg} />
                                </span>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    className={classes.form__input}
                                    defaultValue={
                                        selectedEvent
                                            ? selectedEvent.title
                                            : title
                                    }
                                    placeholder="Add title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className={classes.form__body_item}>
                                <span>
                                    <IoTimeOutline className={classes.svg} />
                                </span>
                                <p className={classes.form__data}>
                                    {dayItem.toFormat('DDDD')}
                                </p>
                            </div>
                            <div className={classes.form__body_item}>
                                <span>
                                    <IoText className={classes.svg} />
                                </span>
                                <input
                                    className={classes.form__input}
                                    type="text"
                                    placeholder="Add a description"
                                    name="description"
                                    defaultValue={
                                        selectedEvent
                                            ? selectedEvent.description
                                            : description
                                    }
                                    required
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className={classes.form__footer}>
                            <div className={classes.button__wrapper}>
                                <button onClick={cancelButtonHandler}>
                                    Cancel
                                </button>
                                <button type="submit" onClick={handleSubmit}>
                                    {selectedEvent ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default ShowForm
