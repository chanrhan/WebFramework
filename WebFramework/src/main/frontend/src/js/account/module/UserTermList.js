import User from "../../../css/user.module.css"

export function UserTermList({index, subject, value, onClick, required=true}){

    return (
        <li className={User.agree_item}>
            <input type="checkbox" name={`term${index}`} checked={value} className={User.input} />
            <label htmlFor={`term${index}`} className={User.label} onClick={()=>{
                onClick(index)
            }}>{required ? '[필수]' : '[선택]'} {subject}</label>
        </li>
    )
}