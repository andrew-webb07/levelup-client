import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = (props) => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, editGame, getGame } = useContext(GameContext)

    const {gameId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        name: "",
        gameTypeId: 0,
        description: "",
        numberOfPlayers: 0,
        maker: ""
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(() => {
        if(gameId) {
            getGame(gameId).then(game => {
                console.log(game)
                setCurrentGame({
                    name: game.name,
                    gameTypeId: game.game_type.id,
                    description: game.description,
                    numberOfPlayers: game.number_of_players,
                    maker: game.maker
                })
            })
        }
    }, [gameId])

    const handleControlledInputChange = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" required autoFocus className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={handleControlledInputChange}>
                        <option value="0">Select a game type</option>
                        {gameTypes.map(gt => (
                            <option key={gt.id} value={gt.id}>
                                {gt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            {
                (gameId)
                ? <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    editGame({
                        id: gameId,
                        name: currentGame.name,
                        gameTypeId: parseInt(currentGame.gameTypeId),
                        description: currentGame.description,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        maker: currentGame.maker
                    })
                    .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Edit</button>
                : <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        name: currentGame.name,
                        gameTypeId: parseInt(currentGame.gameTypeId),
                        description: currentGame.description,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        maker: currentGame.maker
                        // gamer: parseInt(localStorage.getItem("lu_token"))
                    }
                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
            }
            
        </form>
    )
}
