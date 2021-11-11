import React, {useMemo} from 'react'
import styled from 'styled-components'
import {Interval} from 'luxon'
import DayWrapper from '../DayWrapper/DayWrapper'
import {useSelector} from 'react-redux'

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 2px;
    background-color: ${(props) => (props.isHeader ? '#F9F7F7' : '#52616b')};
    ${(props) => props.isHeader && 'border-bottom: 2px solid #52616b'};
`

const CellWrapper = styled.div`
    min-width: 140px;
    min-height: ${(props) => (props.isHeader ? 24 : 80)}px;
    background-color: ${(props) => (props.isWeekend ? '#F4F9F4' : '#F9F7F7')};
`

const RowInCell = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: ${(props) => (props.isHeader ? 5 : 0)}px;
    margin-right: 3px;
    cursor: ${(props) => (props.isHeader ? 'default' : 'pointer')};
`

const EventListWrapper = styled.ul`
    margin: unset;
    list-style-position: inside;
    padding-left: 2px;
`

const EventItemWrapper = styled.button`
    position: relative;
    left: -14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 114px;
    border: unset;
    background: unset;
    color: #1B262C;
    cursor: pointer;
    margin: 0;
    padding: 0;
    text-align: left;
`


const CalendarGrid = ({ openFormHandler, events }) => {

    const listCalendar = useSelector((state) => state.calendars)
    const today = listCalendar.dateTime

    
    const calendarWeek = useMemo(() => {
        const weekDay = []
        for (let i = 1; i < 8; ++i) {
            weekDay.push(today.set({weekday: i}))
        }
        return weekDay
    }, [today])
    
    const calendarList = useMemo(() => {
        const startDay = today.startOf('month').startOf('week')
        const endDay = today.endOf('month').endOf('week')
        const intervalDays = Interval.fromDateTimes(startDay, endDay)
        const totalDays = Math.ceil(intervalDays.length('days'))
        const daysArray = []
        for (let i = 0; i < totalDays; i++) {
            daysArray.push(startDay.plus({days: i}))
        }
        return daysArray
    }, [today])


    return (
        <>
            <GridWrapper isHeader>
                {calendarWeek.map((i) => (
                    <CellWrapper isHeader key={i.weekday}>
                        <RowInCell isHeader>{i.toFormat('EEE')}</RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
            <GridWrapper>
                {calendarList.map((dayItem) => (
                    <CellWrapper
                        key={dayItem.toSeconds()}
                        isWeekend={dayItem.weekday === 6 || dayItem.weekday === 7}
                    >
                        <RowInCell onClick={() => openFormHandler('Create')}>
                            <DayWrapper dayItem={dayItem} today={today} />
                        </RowInCell>
                        <EventListWrapper>
                            {events
                                .filter(
                                    (event) =>
                                        event.date >= dayItem.toSeconds() &&
                                        event.date <= dayItem.endOf('day').toSeconds()
                                )
                                .map((event) => (
                                    <li key={event.id}>
                                        <EventItemWrapper
                                            onClick={() =>openFormHandler('Update', event)}
                                        >
                                            {event.title}
                                        </EventItemWrapper>
                                    </li>
                                ))}
                        </EventListWrapper>
                    </CellWrapper>
                ))}
            </GridWrapper>
        </>
    )
}

export default CalendarGrid
