import User from "../../../css/user.module.css";
import {Link} from "react-router-dom";

export function UserFormBox({title, find, children}){
    return (
        <main>
            <div id='contents'>
                <form className={`${User.user_box} ${User.user_form} ${find && User.user_find}`}>
                    {
                        title && <h2 className={User.user_title}>{title}</h2>
                    }
                    {children}
                </form>
            </div>
        </main>
    )
}