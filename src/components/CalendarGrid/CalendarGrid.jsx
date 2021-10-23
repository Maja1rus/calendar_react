import React from 'react'
import styled from 'styled-components';
import { DateTime } from 'luxon';

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

const DayWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 33px;
    width: 33px;
    margin: 3px;
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


const CalendarGrid = ({ startDay, today}) => {
    const isCurrentToday = (day) => DateTime.local().hasSame(day, 'day')
    const isCurrentMouth = (day) => today.hasSame(day, 'month')
    const totalDays = 42;
    const dayArr = startDay;
    const daysArray = []
    for (let i = 0; i < totalDays; i++){
        daysArray.push(dayArr.plus({days: i}))
    }

    return (
        <>
            <GridWrapper isHeader>
                {[...Array(totalDays / 6)].map((_, i) => (
                    <CellWrapper isHeader isCurrentMouth key={i}>
                        <RowInCell justifyContent={'flex-end'} isHeader>
                            {DateTime.local(i).toFormat('EEE')}
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
            <GridWrapper>
                {daysArray.map((dayItem) => (
                    <CellWrapper
                        key={dayItem}
                        isWeekend={dayItem.toFormat('c') === '6' || dayItem.toFormat('c') === '7'}
                        isCurrentMouth={isCurrentMouth(dayItem)}
                    >
                        <RowInCell justifyContent={'flex-end'}>
                            <DayWrapper>
                                {!isCurrentToday(dayItem) ? dayItem.toFormat('d') : <CurrentToday>{dayItem.toFormat('d')}</CurrentToday>}
                            </DayWrapper>
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
        </>
    )
}

export default CalendarGrid
