import React, {useState} from "react"

export const GamerContext = React.createContext()

export const GamerProvider = (props) => {
    const [gamers, setGamers] = useState([])

    const getGamers = () => {
        return fetch("http://localhost:8000/gamers", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
            .then(setGamers)
    }

    return (
        <GamerContext.Provider value={{ gamers, getGamers }} >
            { props.children }
        </GamerContext.Provider>
    )
}