import User from "../../../css/user.module.css";

export function UserFormList({children}){
    return (
        <ul className={User.form_list}>
            {children}
        </ul>
    )
}