import'./Header.css'
import {useNavigate} from "react-router-dom";
export default function Header() {
    const navigate = useNavigate()
    return (
        <ul id={"header"}>
            <li className={"header-item"}>
                <button className={"header-item-button"}
                onClick={()=>navigate("/transactions")}
                >transactions</button>
            </li>
            <li className={"header-item"}>
                <button className={"header-item-button"}
                        onClick={()=>navigate("/")}>home</button>
            </li>
            <li className={"header-item"} >
                <button className={"header-item-button"}
                        onClick={()=>navigate("/create")}>create</button>
            </li>
        </ul>
   )
}