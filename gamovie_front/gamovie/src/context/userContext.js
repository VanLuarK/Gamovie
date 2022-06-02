import React, { useEffect, useState } from "react";
import getGameVotes from "services/getGameVotes";
import getMovieVotes from "services/getMovieVotes";

const Context = React.createContext();

export function UserContextProvider({ children }) {
    const [movieVotes, setMovieVotes] = useState([]);
    const [gameVotes, setGameVotes] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    const [currentUser, setCurrentUser] = useState(
        () => {
            const theUser = JSON.parse(window.localStorage.getItem('currentUser'));
            if (theUser) {
                theUser.accessToken = window.atob(theUser.accessToken)
                if (theUser.roles.includes('ROLE_ADMIN')) setIsAdmin(true)
                if (theUser.roles.includes('ROLE_PREMIUM')) setIsPremium(true)
            }
            return theUser;
        });

    useEffect(() => {
        if (!currentUser) { setGameVotes([]); setMovieVotes([]); return }
        if (currentUser.roles.includes('ROLE_ADMIN')) return setIsAdmin(true)
        getGameVotes({ currentUser }).then(setGameVotes);
        getMovieVotes({ currentUser }).then(setMovieVotes);
        if (currentUser.roles.includes('ROLE_PREMIUM')) setIsPremium(true)

    }, [currentUser])

    return <Context.Provider value={{ isAdmin, currentUser, movieVotes, gameVotes, isPremium, setMovieVotes, setGameVotes, setCurrentUser, setIsAdmin }}>
        {children}
    </Context.Provider>
}

export default Context;