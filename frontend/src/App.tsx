import './App.css'
import axios from "axios";

function App() {

    function getUser(): void {
        axios.get("/api/auth")
            .then(response => console.log(response.data))
                .catch((error) => {
                    console.error("Error fetching data:", error);
                })
    }

    getUser()

    return (<>
        <p>hi</p>
    </>)
}

export default App
