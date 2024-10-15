import {cmc} from "../../utils/cm";
import Dashboard from "../../../css/dashboard.module.css";
import {ObjectUtils} from "../../utils/objectUtil";
import {useEffect, useMemo, useRef, useState} from "react";
import {useRenderlessModal} from "../../hook/useRenderlessModal";

export function ChangeNicknameLayer({initValue, value, values, onChange}){

    const [custom, setCustom] = useState('')
    const [isCustomSelected, setCustomSelected] = useState(false)

    const renderlessModal = useRenderlessModal("RDL_CHANGENICKNAME")

    const [selectedIndex, setSelectedIndex] = useState(-2)

    useMemo(() => {
        if(renderlessModal.active){
            for(const i in values){
                if(value === values[i]){
                    setSelectedIndex(Number(i))
                    return
                }
            }
            setSelectedIndex(-1)
            setCustom(value)
        }
    }, [renderlessModal.active]);

    useEffect(() => {
        console.log(selectedIndex)
    }, [selectedIndex]);

    const submit = ()=>{
        if(onChange){
            let value = null;
            if(selectedIndex === -1){
                value = custom;
            }else if(selectedIndex !== -2){
                value = values[selectedIndex]
            }
            onChange(value);
            setCustom('')
            renderlessModal.close()
        }
    }

    const handleChange = i=>{
        // if(onChange){
        // }
        // onChange(values[i]);
        setSelectedIndex(i)
        setCustomSelected(false)
    }

    const handleCustomChange = e=>{
        setCustom(e.target.value);
        setSelectedIndex(-1)
        setCustomSelected(true)
    }

    const getButtonName = ()=>{
        if(!ObjectUtils.isEmpty(value)){
            return value;
        }
        return initValue ?? values[0]
    }

    if(ObjectUtils.isEmpty(values)){
        return null;
    }

    return (
        <>
            <button type="button" className={cmc(Dashboard.select_btn)}
                    onClick={renderlessModal.clickToOpen}>{getButtonName()}</button>
            <ul ref={renderlessModal.ref} className={`select_layer ${Dashboard.select_layer} ${renderlessModal.active && cmc(Dashboard.active)}`}>
                {
                    values && values.map((v, i) => {
                        return <li key={i} className={`select_item ${i === selectedIndex && Dashboard.active}`}>
                            <button type="button" onClick={() => {
                                handleChange(i);
                            }}>{v}</button>
                        </li>
                    })
                }
                <input type="text" className="select_inp" value={custom}
                       onChange={handleCustomChange}
                       placeholder="직접 입력" style={{
                           marginBottom: '5px'
                }}/>
                <button className={`${Dashboard.confirm_btn}`} onClick={submit}>적용</button>
            </ul>
        </>
    )
}