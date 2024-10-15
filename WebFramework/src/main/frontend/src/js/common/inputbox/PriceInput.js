import {useEffect} from "react";
import {ObjectUtils} from "../../utils/objectUtil";
import {NumberInput} from "./NumberInput";

export function PriceInput({id, className, name, value, onChange, readOnly, placeholder}){

    const addComma = ()=>{
        if(ObjectUtils.isEmpty(value)){
            return null
        }
        return Number(value)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const explicitComma = (e)=>{
        const v = e.target.value;
        e.target.value = v.replaceAll(",","")
        return e;
    }

    return (
        <NumberInput id={id} name={name}
               className={`ta_r ${className}`}
               maxLength={20}
               value={addComma() ?? ''} preprocess={e=>explicitComma(e)} onChange={onChange}
               readOnly={readOnly}
               placeholder={placeholder}/>
    )
}