import React, { useContext, useEffect, HumanDate } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from "react-router-dom"
import { EventContext } from "../event/EventProvider.js"
import "./Game.css"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const { getEvents, events } = useContext(EventContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <h1>Level Up Games</h1>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                history.push({ pathname: "/games/new" })}}
                >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.name} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <h4>Upcoming Events</h4>
                        {
                            events.filter(event => event.game.id === game.id)
                                .map(event => {
                                    return <div key={`gameEvent--${event.id}`}>
                                        {event.date} @ {event.time}
                                    </div>
                                })
                        }
                        <div className="game__edit">
                        <button className="btn btn-3"
                                    onClick={e => 
                                    history.push(`/games/${game.id}/edit`)}
                                    >Edit</button>
                        </div>
                    </section>
                })
            }
        </article>
    )
}
