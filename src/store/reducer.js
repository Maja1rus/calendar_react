import { combineReducers } from "redux";
import { calendarReducer } from './calendarReducer'
import { dataLocalReducer } from './dataLocalReducer'

export const rootReducer = combineReducers({
    calendars: calendarReducer
    // dataLocals: dataLocalReducer
})