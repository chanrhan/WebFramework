import {cm} from "../../utils/cm";
import Landing from "../../../css/landing.module.css";
import sectionImg4 from "../../../images/landing/section_img4.png";

export function LandingSectionWrap({num, children}){
    return (
        <section className={cm(Landing.section, Landing[`section${num}`])}>
            <div className={Landing.wrap}>
                {children}
            </div>
        </section>
    )
}