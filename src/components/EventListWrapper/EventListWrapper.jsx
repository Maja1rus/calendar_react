import React from 'react'
import classes from './EventListWrapper.module.css'

const EventListWrapper = ({setSelectedEvent, dayItem}) => {
    const calendarEvents = localStorage.getItem('calendarEvents')
        ? JSON.parse(localStorage.getItem('calendarEvents'))
        : []

    return (
        <>            
            <ul className={classes.event__wrapper}>
                {calendarEvents
                    .filter(
                        (eventItem) =>
                            eventItem.date >= dayItem.toSeconds() &&
                            eventItem.date <= dayItem.endOf('day').toSeconds()
                    )
                    .map((eventItem) => (
                        <li key={eventItem.id}>
                            <button className={classes.event__item}
                                onClick={() => {setSelectedEvent(eventItem)}}
                            >
                                {eventItem.title}
                            </button>
                        </li>
                    ))}
            </ul>
        </>
    )
}

export default EventListWrapper
