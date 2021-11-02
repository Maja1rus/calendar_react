import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {rootReducer} from './store/reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const enhancer = composeWithDevTools()

const store = createStore(rootReducer, {}, enhancer)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
