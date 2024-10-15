import Popup from "../../../../css/popup.module.css";
import User from "../../../../css/user.module.css"
import {cm, cmc} from "../../../utils/cm";
import {useState} from "react";

export function AddSaleSelectOptionLayer({inputField, itemNames, name, subject}){
    const [selected, setSelected] = useState(0);
    const [active, setActive] = useState(false)

    const open = ()=>{
        // console.log('toggle')
        setActive(true)
    }

    if(subject){
        return (
            <>
                <label htmlFor={name} className={Popup.customer_label}>{subject}</label>
                <div className={Popup.customer_inp_box}>
                    <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                        <input type="hidden" id=""/>
                        <button type="button"
                                className={`select_btn ${cm(Popup.select_btn, User.select_btn)}`} onClick={open}>{itemNames[selected]}</button>
                        <ul className={cmc(Popup.select_layer, `${active && Popup.active}`)}>
                            {
                                itemNames && itemNames.map((v, i) => {
                                    return <li key={i} className={cmc(Popup.select_item)}>
                                        <button type='button'>{v}</button>
                                    </li>

                                })
                            }
                        </ul>
                    </div>
                </div>
            </>
        )
    }else{
        return (
            <div className={`${cm(Popup.select_box, User.select_box)} select_box `}>
                <input type="hidden" id=""/>
                <button type="button"
                        className={`select_btn ${cm(Popup.select_btn, User.select_btn)}`} onClick={open}>{itemNames[selected]}</button>
                <ul className={cmc(Popup.select_layer, `${active && Popup.active}`)}>
                    {
                        itemNames && itemNames.map((v, i) => {
                            return <li key={i} className={cmc(Popup.select_item)}>
                                <button type='button'>{v}</button>
                            </li>

                        })
                    }
                </ul>
            </div>
        )
    }


}