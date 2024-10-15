import {useEffect, useRef, useState} from "react";
import {ObjectUtils} from "../../utils/objectUtil";
import {useRenderlessModal} from "../../hook/useRenderlessModal";

export function MoreOptionLayer({className, children, cssModule, cssModules}) {
    const renderlessModal = useRenderlessModal(`RDL_MOREOPTION_${Date.now()}`)

    const fromCssModule = key => {
        if (!ObjectUtils.isEmpty(cssModule)) {
            return cssModule[key]
        }
        if (ObjectUtils.isEmpty(cssModules)) {
            return ''
        }
        if (cssModules && !Array.isArray(cssModules)) {
            return cssModules[key];
        }
        if (cssModules.length === 1) {
            return cssModules[0][key];
        }

        return cssModules.map(cm => cm[key]).join(' ');
    }

    return (
        <>
            <button type="button" className='btn_more' onClick={renderlessModal.clickToOpen}>더보기
            </button>
            <ul ref={renderlessModal.ref}
                className={`select_layer add_icon left ${renderlessModal.active && `active ${fromCssModule('active')}`}`}
                onClick={()=>{
                    renderlessModal.close()
                }}>
                {children}
            </ul>
        </>
    )
}