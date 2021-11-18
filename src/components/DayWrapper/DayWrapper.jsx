import React from 'react'
import styled from 'styled-components'
import {DateTime} from 'luxon'

const Day = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 33px;
    width: 33px;
    margin: 3px;
    color: ${(props) => (props.isCurrentMouth ? '#393E46' : '#BAD7DF')};
`
const CurrentToday = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    color: ${(props) => (props.isCurrent ? '#f6f6f6' : '')};
    background: ${(props) => (props.isCurrent ? '#e84545' : '')};
`

const DayWrapper = ({dayItem, today}) => {
    
    const isCurrentToday = (day) => DateTime.now().hasSame(day, 'day')
    const isCurrentMouth = (day) => today.hasSame(day, 'month')

    return (
        <>
            <Day isCurrentMouth={isCurrentMouth(dayItem)}>
                <CurrentToday isCurrent={isCurrentToday(dayItem)}>
                    {dayItem.toFormat('d')}
                </CurrentToday>
            </Day>
        </>
    )
}

export default DayWrapper
