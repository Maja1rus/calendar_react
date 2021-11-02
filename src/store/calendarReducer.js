import {DateTime} from 'luxon'
import {NEXT_MONTHS, PREV_MONTHS, TODAY_MONTHS} from './calendarActions'

const dateTime = DateTime.local()

export const calendarReducer = (state = { dateTime: dateTime }, action) => {
    switch (action.type) {
        case NEXT_MONTHS:
            return {
                ...state,
                dateTime: state.dateTime.plus({months: action.payload})
            }
        case PREV_MONTHS:
            return {
                ...state,
                dateTime: state.dateTime.minus({months: action.payload})
            }
        case TODAY_MONTHS:
            return {
                ...state,
                dateTime: dateTime
            }

        default:
            return state
    }
}

