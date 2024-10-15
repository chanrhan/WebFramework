import {cm} from "../../utils/cm";
import Landing from "../../../css/landing.module.css";

export function LandingVocItem({n, text, per}) {
    return (
        <li className={cm(Landing.voc_item, Landing[`n${n}`])}>
            {text}
            <span className={Landing.span}>
                ({per}%)
            </span>
        </li>
    )
}