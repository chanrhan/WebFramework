import Popup from "../../../../css/popup.module.css";
import {cm} from "../../../utils/cm";

export function AddSaleNumberInput({name, subject, search, className, readOnly, inputField, children}){

    const handleNumberInput = e=>{
        const value = Number(e.target.value)
        if(!Number.isNaN(value)){
            inputField.put(name, value)
        }
    }

    const toNumber = (value)=>{
        const num = Number(value)
        return !Number.isNaN(num) ? num : value;
    }

    if(typeof inputField !== 'object'){
        return null;
    }

    return (
        <>
            <label htmlFor={name} className={Popup.customer_label}>{subject}</label>
            <div className={Popup.customer_inp_box}>
                <input type="text" name={name}
                       value={toNumber(inputField.get(name))}
                       className={cm(Popup.customer_inp, `${search && Popup.inp_search}`, className)}
                       readOnly={readOnly}
                       onChange={handleNumberInput}/>
                {children}
            </div>
        </>
    )
}