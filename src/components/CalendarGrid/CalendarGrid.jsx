import React from 'react'
import styled from 'styled-components';
import moment from 'moment';

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


const CalendarGrid = ({ startDay, today }) => {
    const isCurrentToday = (day) => moment().isSame(day, 'day');
    const isCurrentMouth = (day) => today.isSame(day, 'month')
    const totalDays = 42;
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone())
    return (
        <>
            <GridWrapper isHeader>
                {[...Array(totalDays/6)].map((_, i) => (
                    <CellWrapper isHeader isCurrentMouth>
                        <RowInCell justifyContent={'flex-end'} isHeader>
                            {moment()
                                .day(i + 1)
                                .format('ddd')}
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
            <GridWrapper>
                {daysArray.map((dayItem) => (
                    <CellWrapper
                        key={dayItem.unix()}
                        isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                        isCurrentMouth={isCurrentMouth(dayItem)}
                    >
                        <RowInCell justifyContent={'flex-end'}>
                            <DayWrapper>
                                {!isCurrentToday(dayItem) ? (
                                    dayItem.format('D')
                                ) : (
                                    <CurrentToday>
                                        {dayItem.format('D')}
                                    </CurrentToday>
                                )}
                            </DayWrapper>
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
        </>
    )
}

export default CalendarGrid
