import React from 'react'
import styled from 'styled-components';
import moment from 'moment';

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 2px;
    background-color: #52616b;
`

const CellWrapper = styled.div`
    min-width: 140px;
    min-height: 80px;
    background-color: ${(props) => (props.isWeekend ? '#F4F9F4' : '#F9F7F7')};
`

const RowInCell = styled.div`
    display: flex;
    justify-content: ${props => props.justifyContent ? props.justifyContent: 'flex-start'};
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

const isCurrentToday = (day) => moment().isSame(day, 'day')

const CalendarGrid = ({ startDay }) => {
    const totalDays = 42;
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone())
    return (
        <GridWrapper>
            {daysArray.map((dayItem) => (
                <CellWrapper
                    key={dayItem.unix()}
                    isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                >
                    <RowInCell justifyContent={'flex-end'}>
                        <DayWrapper>
                            {!isCurrentToday(dayItem) ? dayItem.format('D') : <CurrentToday>{dayItem.format('D')}</CurrentToday>}
                        </DayWrapper>
                    </RowInCell>
                </CellWrapper>
            ))}
        </GridWrapper>
    )
}

export default CalendarGrid
