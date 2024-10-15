import User from "../../../css/user.module.css"
import {cm} from "../../utils/cm";
import {ObjectUtils} from "../../utils/objectUtil";

export function UserFormInput({value, type = 'text', subject, name, inputField, className, style, placeholder,
                                  search, onSearch, bg, readOnly, onChange, errorText, children, autoComplete}){

    const handleChange = e=>{
        if(inputField !== null && inputField !== undefined){
            inputField.handleInput(e);
        }
    }

    if(typeof inputField !== 'object' && ObjectUtils.isEmpty(value)){
        return null;
    }

    return (
        <>
            {
                subject && <label htmlFor={name} className={User.form_label}>{subject}</label>
            }
            <div className={`${User.form_inp} ${User.div} ${className} ${search && User.form_search}`}>
                <input type={type} name={name} value={value ?? inputField.get(name)} className={`inp ${User.inp} ${bg && `${User.bg} bg`}`} placeholder={placeholder} readOnly={(readOnly)}
                        onChange={onChange ? onChange : handleChange} autoComplete={autoComplete}/>
                {
                    search && <button type="button" className={User.form_search_btn} onClick={onSearch}>검색</button>
                }
                {children}
            </div>
            {
                errorText && <>
                    <p className={User.error_text} style={{marginBottom: '15px'}}>{errorText}</p>
                </>
            }

        </>
    )
}