
import './Footer.css'

type Props = {
    logout: ()=>void
}
export default function Footer(props: Readonly<Props>) {
    return (
        <ul className={"footer-ul"}>
            <li className={"footer-li"}><button className={"footer-button"}></button></li>
            <li className={"footer-li"}><button className={"footer-button"}></button></li>
            <li className={"footer-li"} onClick={props.logout}><button className={"footer-button"}>logout</button></li>
        </ul>)

}