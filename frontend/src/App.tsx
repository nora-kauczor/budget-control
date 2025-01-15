import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import HomePage from "./pages/HomePage/HomePage.tsx";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import {MonthPlan} from "./types/MonthPlan.ts";
import FormPage from "./pages/FormPage/FormPage.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import CreateForm from "./components/CreateForm/CreateForm.tsx";
import EditForm from "./components/EditForm/EditForm.tsx";


function App() {
    const [user, setUser] = useState<string>("")
    const [monthPlan, setMonthPlan] = useState<MonthPlan>()
    const navigate = useNavigate()

    useEffect(() => {
        updateUser()
    }, []);

    useEffect(() => {
        if (user) {
            updateMonthPlan()
        }
    }, [user]);

    useEffect(() => {
        if (!user) {navigate("/login")}
    }, [user]);


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

    function updateMonthPlan(): void {
        axios.get("/api/budget")
            .then(response => setMonthPlan(response.data))
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
    }

    return (<div id={"app"}>
        <Header/>
        <Routes>
            <Route path={"/login"}
                   element={<LoginPage
                       user={user}
                       login={login}
                   />}/>
            <Route path={"/"} element={<HomePage
                monthPlan={monthPlan ? monthPlan : undefined}/>}/>
            {/*<Route path={"/form"} element={<FormPage monthPlan={monthPlan}*/}
            {/*                                         setMonthPlan={setMonthPlan}/>}/>*/}
            <Route path={"/create"} element={<CreateForm monthPlan={monthPlan}
                                                     setMonthPlan={setMonthPlan}/>}/>
            <Route path={"/edit"} element={<EditForm monthPlan={monthPlan}
                                                     setMonthPlan={setMonthPlan}/>}/>
        </Routes>
        <Footer logout={logout}/>
    </div>)
}

export default App


