import {forwardRef, useState} from "react";

export const PasswordInput = forwardRef(({id, name, placeholder,
                                             className, value, onChange, onKeyDown,
                                             readOnly, autoComplete}, ref)=>{
    const [visible, setVisible] = useState(false)

    return (
        <>
            <input type={visible ? 'text':'password'}
                   ref={ref}
                   id={id}
                   name={name}
                   onKeyDown={onKeyDown}
                   placeholder={placeholder}
                   readOnly={readOnly}
                   className={`${className}`}
                   onChange={onChange}
                   value={value} autoComplete={autoComplete}/>
            {
                value && <button type='button' className={`visible ${visible && 'active'}`} onClick={() => {
                    setVisible(!visible)
                }}>비밀번호 표시</button>
            }

        </>
    )
});