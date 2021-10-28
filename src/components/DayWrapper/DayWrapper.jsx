import React from 'react'
import styled from 'styled-components'

const Day= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 33px;
    width: 33px;
    margin: 3px;
`

const DayWrapper = ({isCurrentToday, dayItem, CurrentToday}) => {
    return (
        <>
            <Day>
                {!isCurrentToday(dayItem) ? (
                    dayItem.toFormat('d')
                ) : (
                    <CurrentToday>
                        {dayItem.toFormat('d')}
                    </CurrentToday>
                )}
            </Day>
        </>
    )
}

export default DayWrapper
