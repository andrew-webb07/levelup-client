import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <h1>Level Up Games</h1>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.name} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                    </section>
                })
            }
        </article>
    )
}
