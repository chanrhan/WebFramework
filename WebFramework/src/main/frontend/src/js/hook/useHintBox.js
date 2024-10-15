import {useEffect, useRef, useState} from "react";
import {MouseEventUtils} from "../utils/MouseEventUtils";

export function useHintBox(content) {
    const componentRef = useRef(null)
    const [active, setActive] = useState(false)
    const [pos, setPos] = useState({
        top: 0,
        left: 0
    })

    useEffect(() => {
        const onMouseOverEvent = (e: MouseEvent<HTMLParagraphElement>) => {
            if (componentRef.current && !componentRef.current.contains(e.target)) {
                setActive(false)
                window.removeEventListener('mouseover', onMouseOverEvent)
            }
        }

        if (active) {
            window.addEventListener('mouseover', onMouseOverEvent);
        }
        return () => {
            window.removeEventListener('mouseover', onMouseOverEvent)
        }
    }, [active]);

    const COMPONENT = <HintBox active={active} top={pos.top} componentRef={componentRef}>
        {content}
    </HintBox>

    const open = (e: MouseEvent)=>{
        const {top, left} = MouseEventUtils.getAbsolutePos(e)
        setPos({
            top: top-80
        })
        setActive(true)
    }

    const close = ()=>{
        setActive(false)
    }

    return {
        component: COMPONENT,
        ref: componentRef,
        open,
        close
    }
}

function HintBox({active, top, left, width, height, children, componentRef}){
    return (
        <div className={`hint_box ${!active && 'disabled'}`} style={{
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
        }} ref={componentRef}>
            {children}
        </div>
    )
}
