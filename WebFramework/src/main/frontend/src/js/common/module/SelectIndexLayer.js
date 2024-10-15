import {ObjectUtils} from "../../utils/objectUtil";
import {useRenderlessModal} from "../../hook/useRenderlessModal";
import {useEffect, useState} from "react";
import {ScrollUtils} from "../../utils/ScrollUtils";

export function SelectIndexLayer({initValue, inputField, cssModule, cssModules=[], buttonClassName,
                                     className, name, value, onChange, values, error, children, buttonStyle}){
    const renderlessModal = useRenderlessModal(`RDL_SELECT_INDEX_${name}_${value}_${onChange}`)

    const handleChange = i=>{
        if(onChange){
            onChange(i);
        }else{
            if(error){
                inputField.handleError(name, null);
            }
            inputField.put(name, i);
        }
        renderlessModal.close()
    }

    const fromCssModule = key=>{
        if(!ObjectUtils.isEmpty(cssModule)){
            return cssModule[key]
        }
        if(ObjectUtils.isEmpty(cssModules)){
            return ''
        }
        if(cssModules && !Array.isArray(cssModules)){
            return cssModules[key];
        }
        if(cssModules.length === 1){
            return cssModules[0][key];
        }

        return cssModules.map(cm=>cm[key]).join(' ');
    }

    const getButtonName = ()=>{
        if(!ObjectUtils.isEmpty(value)){
            return value;
        }else if(!ObjectUtils.isEmpty(inputField)) {
            const getValue = inputField.get(name);
            if(!ObjectUtils.isEmpty(getValue)) {
                return values[getValue]
            }
            return initValue ?? null
        }
    }

    const buttonName = getButtonName();

    if(ObjectUtils.isEmpty(values)){
        return null;
    }

    return (
        <>
            <button type="button" className={`select_btn ${error && 'error'} ${!buttonName && 'empty_value'} ${buttonClassName} ${fromCssModule('select_btn')} `}
                    onClick={renderlessModal.clickToOpen} style={{
                        pointerEvents: "auto"
            }}>{buttonName ?? '선택하세요'}</button>
            <ul ref={renderlessModal.ref}
                className={`select_layer ${fromCssModule('select_layer')} ${className} ${renderlessModal.active && `active ${fromCssModule('active')}`}`}
                onClick={()=>{
                    console.log('ul')
                }} onScroll={e=>{
                    e.preventDefault()
            }} style={{
                    pointerEvents: "auto"
            }}>
                {
                    values && values.map((v, i) => {
                        return <li key={i} className={`select_item ${fromCssModule('select_item')}`}>
                            <button type="button" onClick={(e) => {
                                handleChange(i);
                            }}>{v}</button>
                        </li>
                    })
                }
            </ul>
        </>
    )
}