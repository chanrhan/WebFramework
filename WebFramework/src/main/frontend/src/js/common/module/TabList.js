import {cmc} from "../../utils/cm";
import Graph from "../../../css/graph.module.css";
import {useEffect, useMemo, useState} from "react";
import Layout from "../../../css/layout.module.css";
import {Link} from "react-router-dom";
import {ObjectUtils} from "../../utils/objectUtil";

export function TabList({name, inputField, className, value, onChange, theme, values}){
    // const [selected, setSelected] = useState(0);
    useEffect(() => {
        if(inputField && ObjectUtils.isEmpty(inputField.get(name))){
            inputField.put(name, 0);
        }
    }, []);

    const select = (i)=>{
        if(onChange){
            onChange(i)
        }else if(inputField){
            inputField.put(name, i);
        }
        // setSelected(i);
    }

    const getSelectedItem = ()=>{
        if(inputField){
            const v = inputField.get(name);
            return ObjectUtils.isEmpty(v) ? 1 : v;
        }
        return value ?? 0;
    }

    // if(ObjectUtils.isEmptyArray(values)){
    //     return null;
    // }

    return (
        <ul className={`tab_list ${theme && theme['tab_list']} ${className}`}>
            {
                values && values.map((v,i)=> {
                    return <li key={i} className={`tab_item ${theme && theme['tab_item']} ${getSelectedItem() === i && `active ${theme && theme['active']}`}`}>
                        <button type="button" className={`tab_btn ${theme && theme['tab_btn']}`} onClick={()=>{
                            select(i)
                        }}>{v}</button>
                    </li>
                })
            }
        </ul>
    )
}
