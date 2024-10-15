import {NumberInput} from "./NumberInput";

export function CustomerCodeInput({id, name, className, value, readOnly, placeholder, onChange, children}){
    const regex = /^[0-9\b -]{0,13}$/

    const handlePress = e=>{
        if(!Number.isNaN(Number(e.target.value))){
            onChange(e)
        }
    }

    return (
        <NumberInput id={id} name={name}
               className={className}
               maxLength={6}
               value={value} onChange={handlePress}
               readOnly={readOnly}
               placeholder={placeholder}/>
    )
}