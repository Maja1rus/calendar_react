import React from 'react'
import classes from './ShowForm.module.css'

const ShowForm = ({
    setEvents,
    eventUp,
    setEventUp,
    isShowForm,
    setIsShowForm,
    method,
    url
}) => {
    const cancelButtonHandler = () => {
        setIsShowForm(false)
        setEventUp(null)
    }

    const changeEventHandler = (text, field) => {
        setEventUp((prevState) => ({
            ...prevState,
            [field]: text
        }))
    }

    const eventFetchHandler = () => {
        const fetchUrl = method === 'Update' ? `${url}/events/${eventUp.id}` : `${url}/events`
        const httpMethod = method === 'Update' ? 'PATCH' : 'POST'

        fetch(fetchUrl, {
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventUp)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (method === 'Update') {
                    setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl))
                } else {
                    setEvents(prevState => [...prevState, res])
                }
                cancelButtonHandler()
            })
    }

    return (
        <>
            {isShowForm ? (
                <div className={classes.form__show_wrapper} onClick={cancelButtonHandler}>
                    <div className={classes.form} onClick={e => e.stopPropagation()}>
                        <div className={classes.form__header}>
                            <span>----</span>
                            <button onClick={cancelButtonHandler}>X</button>
                        </div>
                        <div className={classes.form__body}>
                            <div className={classes.form__body_item}>
                                <span>icon</span>
                                <input
                                    className={classes.form__input}
                                    type="text"
                                    placeholder="Add title"
                                    value={eventUp.title}
                                    onChange={e => changeEventHandler(e.target.value, 'title')}
                                />
                            </div>
                            <div className={classes.form__body_item}>
                                <span>icon</span>
                                <p className={classes.form__data}>
                                    
                                </p>
                            </div>
                            <div className={classes.form__body_item}>
                                <span>icon</span>
                                <input
                                    className={classes.form__input}
                                    type="text"
                                    placeholder="Add a description"
                                    value={eventUp.description}
                                    onChange={e => changeEventHandler(e.target.value,'description')}
                                />
                            </div>
                            <div className={classes.form__body_item}>
                                <span>icon</span>
                                <p className={classes.form__data}>цвета</p>
                            </div>
                        </div>
                        <div className={classes.form__footer}>
                            <div className={classes.button__wrapper}>
                                <button onClick={cancelButtonHandler}>Cancel</button>
                                <button onClick={eventFetchHandler}>{method}</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default ShowForm
