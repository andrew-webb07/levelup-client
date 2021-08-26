import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ gameTypes, setTypes ] = useState([])


    const getGames = () => {
        return fetch("https://ajw-levelup.herokuapp.com/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const getGame = (gameId) => {
        return fetch(`https://ajw-levelup.herokuapp.com/games/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
    }

    const createGame = (game) => {
        return fetch("https://ajw-levelup.herokuapp.com/games", { 
            method: "POST",
            headers: {"Authorization": `Token ${localStorage.getItem("lu_token")}`,
                      "Content-Type": "application/json"               
            },
            body: JSON.stringify(game)
        }).then(getGames)
    }

    const editGame = (game) => {
        return fetch(`https://ajw-levelup.herokuapp.com/games/${game.id}`, { 
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"               
            },
            body: JSON.stringify(game)
        }).then(getGames)
    }
    
    const getGameTypes = () => {
        return fetch("https://ajw-levelup.herokuapp.com/gametypes", { 
            headers: {"Authorization": `Token ${localStorage.getItem("lu_token")}`}})
            .then(response => response.json())
            .then(setTypes)
    }

    const getGamers = () => {
        return fetch("https://ajw-levelup.herokuapp.com/gametypes", { 
            headers: {"Authorization": `Token ${localStorage.getItem("lu_token")}`}})
            .then(response => response.json())
            .then(setTypes)
    }
    

    return (
        <GameContext.Provider value={{ games, getGames, gameTypes, createGame, getGameTypes, getGamers, editGame, getGame }} >
            { props.children }
        </GameContext.Provider>
    )
}
