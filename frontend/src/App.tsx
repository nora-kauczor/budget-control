import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import HomePage from "./pages/HomePage/HomePage.tsx";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";


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

    function login(): void {
        const host = window.location.host === "localhost:5173" ?
            "http://localhost:8080" : window.location.origin
        window.open(host + "/oauth2/authorization/github", "_self")
    }

    function logout(): void {
        const host = window.location.host === 'localhost:5173' ?
            'http://localhost:8080' : window.location.origin
        window.open(host + '/api/auth/logout', '_self')
    }

    // function updateMonthPlan():void{ axios.get("/api/auth")
    //     .then(response => setUser(response.data))
    //     .catch((error) => {
    //         console.error("Error fetching data:", error);
    //     })}

    return (<div>
    <Header/>
    <HomePage/>
        <p>current user:{user}</p>
        <button onClick={logout}>logout</button>
        <button onClick={login}>login</button>
    <Footer/>
    </div>)
}

export default App


