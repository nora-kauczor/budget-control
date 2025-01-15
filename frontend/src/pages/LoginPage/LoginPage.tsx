import './LoginPage.css'
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

type Props = {
    user: string
    login: () => void
}
export default function LoginPage(props: Readonly<Props>) {
    const navigate = useNavigate()
    useEffect(() => {
        if (props.user) {
            navigate("/")
        }
    }, [props.user]);

    return (<main id={"login-page"}>
        <article>
        <p>Please login to start</p>
        <button onClick={props.login}>login</button>
        </article>
    </main>)
}