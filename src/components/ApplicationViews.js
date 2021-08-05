import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { GameForm} from "./game/GameForm.js"
import { EventProvider } from "./event/EventProvider.js"
import { EventList } from "./event/EventList.js"
import { EventForm} from "./event/EventForm.js"
import { GamerProvider } from "./gamer/GamerProvider.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <EventProvider>
                    <GamerProvider>
                    <Route exact path="/">
                        <h1>LevelUp</h1>
                    </Route>
                    <Route exact path="/games">
                        <GameList />
                    </Route>
                    <Route exact path="/games/new">
                        <GameForm />
                    </Route>
                    <Route exact path="/events">
                        <EventList />
                    </Route>
                    <Route exact path="/events/new">
                        <EventForm />
                    </Route>
                    </GamerProvider>
                </EventProvider>
            </GameProvider>
        </main>
    </>
}
