import React, {useMemo} from 'react'
import styled from 'styled-components'
import {DateTime, Interval} from 'luxon'
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
`

const CalendarGrid = () => {

    const listCalendar = useSelector((state) => state.calendars)
    const today = listCalendar.dateTime
    
    const calendarWeek = useMemo(() => {
        const weekDay = []
        for (let i = 1; i < 8; ++i) {
            weekDay.push(DateTime.local(2021, 2, i))
        }
        return weekDay
    }, [])

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
                        key={dayItem}
                        isWeekend={
                            dayItem.weekday === 6 || dayItem.weekday === 7
                        }
                    >
                        <RowInCell>
                            <DayWrapper dayItem={dayItem} today={today} />
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
        </>
    )
}

export default CalendarGrid
