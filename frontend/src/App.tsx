import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [user, setUser] = useState("")

    useEffect(() => {
        updateUser()
    }, []);

    function updateUser(): void {
        axios.get("/api/auth")
            .then(response => setUser(response.data))
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
    }

    function login():void {
        const host = window.location.host === "localhost:5173" ?
            "http://localhost:8080" : window.location.origin
        window.open(host + "/oauth2/authorization/github", "_self")
    }

    function logout():void {
        const host = window.location.host === 'localhost:5173' ?
            'http://localhost:8080' : window.location.origin
        window.open(host + '/api/auth/logout', '_self')
    }

    return (<>
        <p>current user:{user}</p>
        <button onClick={logout}>logout</button>
        <button onClick={login}>login</button>
    </>)
}

export default App
