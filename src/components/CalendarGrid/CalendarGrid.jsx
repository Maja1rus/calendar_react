import React, {useMemo} from 'react'
import styled from 'styled-components';
import { DateTime, Interval } from 'luxon';
import DayWrapper from '../DayWrapper/DayWrapper';

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 2px;
    background-color: ${(props) => (props.isHeader ? '#F9F7F7' : '#52616b')};
    ${(props) => props.isHeader && 'border-bottom: 2px solid #52616b'}
`

const CellWrapper = styled.div`
    min-width: 140px;
    min-height: ${(props) => (props.isHeader ? 24 : 80)}px;
    background-color: ${(props) => (props.isWeekend ? '#F4F9F4' : '#F9F7F7')};
    color: ${(props) => (props.isCurrentMouth ? '#393E46' : '#BAD7DF')};
`

const RowInCell = styled.div`
    display: flex;
    justify-content: ${(props) => props.justifyContent ? props.justifyContent : 'flex-start'};
    padding-right: ${(props) => (props.isHeader ? 8 : 0)}px;
`

const CurrentToday = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #e84545;
    color: #f6f6f6;
    border-radius: 50%;
`

const CalendarGrid = ({startDay, endDay, today}) => {
    const isCurrentToday = (day) => DateTime.local().hasSame(day, 'day')
    const isCurrentMouth = (day) => today.hasSame(day, 'month')
    const intervalDays = Interval.fromDateTimes(startDay, endDay)
    
    const dayArray = startDay
    const totalDays = Math.ceil(intervalDays.length('days'))
    const totalWeek = Math.ceil(intervalDays.length('week'))
    
    const calendarList = useMemo(() => {
        const daysArray = []
        for (let i = 0; i < totalDays; i++) {
            daysArray.push(dayArray.plus({days: i}))
        }
        return daysArray
    }, [dayArray, totalDays])

    return (
        <>
            <GridWrapper isHeader>
                {[...Array(totalDays / totalWeek)].map((_, i) => (
                    <CellWrapper isHeader isCurrentMouth key={i}>
                        <RowInCell justifyContent={'flex-end'} isHeader>
                            {DateTime.local(i).weekday}

                            {DateTime.local(i).toFormat('EEE')}
                        </RowInCell>
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
                        isCurrentMouth={isCurrentMouth(dayItem)}
                    >
                        <RowInCell justifyContent={'flex-end'}>
                            <DayWrapper
                                isCurrentToday={isCurrentToday}
                                dayItem={dayItem}
                                CurrentToday={CurrentToday}
                            />
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
        </>
    )
}

export default CalendarGrid
