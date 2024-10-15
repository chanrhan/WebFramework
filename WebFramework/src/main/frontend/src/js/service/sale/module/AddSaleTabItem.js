import Popup from "../../../../css/popup.module.css";
import {cmc} from "../../../utils/cm";
import {useState} from "react";
import {TabList} from "../../../common/module/TabList";

export function AddSaleTabItem({inputField, depth, name, subject, values}){
    // const [selected, setSelected] = useState(0);
    //
    // const select = (i)=>{
    //     setSelected(i)
    //     inputField.put(name, values[i])
    // }

    if(typeof inputField !== "object"){
        return null;
    }

    return (
        <li className={Popup.customer_item}>
            <label htmlFor={name} className={Popup.customer_label}>{subject}</label>
            <div className={Popup.customer_inp_box}>
                <div className={Popup.popup_tab}>
                    <TabList inputField={inputField} className={Popup[`depth${depth}`]} name={name} theme={Popup} values={values}/>
                </div>
            </div>
        </li>
    )
}