import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider.js"
import { GameContext } from "../game/GameProvider.js"
import { GamerContext } from "../user/GamerProvider.js"


export const EventForm = () => {
    const history = useHistory()
    const { getGames, games } = useContext(GameContext)
    const { createEvent } = useContext(EventContext)
    const { gamers, getGamers } = useContext(GamerContext)
    const [eventGamers, setEventGamers] = useState([])

    const [currentEvent, setEvent] = useState({
        gameId: 0,
        date: "",
        time: "",
        description: "",
        title: "",
        attendees: []
    })

    useEffect(() => {
       getGames()
       getGamers()
    }, [])

    const handleControlledInputChange = (event) => {
        const newEventState = { ...currentEvent }
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ handleControlledInputChange }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id}>{game.name}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Event Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Event Start Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Event Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Event Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentEvent.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    {gamers.map(gamer => (
                        <>
                        <input type="checkbox" key={gamer.id} value={gamer.id} onClick={event => {
                        const copyEventGamers = [...eventGamers]
                        const idPosition = copyEventGamers.indexOf(gamer.id)
                        if (idPosition >= 0) {
                            copyEventGamers.splice(idPosition, 1)
                        }
                        else {
                            copyEventGamers.push(gamer.id)
                        }
                        setEventGamers(copyEventGamers)
                        }}/>{gamer.user.first_name} {gamer.user.last_name}</>))}
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        gameId: parseInt(currentEvent.gameId),
                        date: currentEvent.date,
                        time: currentEvent.time,
                        description: currentEvent.description,
                        title: currentEvent.title,
                        attendees: eventGamers
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
