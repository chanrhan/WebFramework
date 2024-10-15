import useModal from "./useModal";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {useLoggingRef} from "./useLoggingRef";

export function useRenderlessModal(modalName){
    const modal = useModal();
    const {lock} : Object<string> = useSelector(s=>s.modalReducer)
    const [active, setActive] = useState(false)

    const componentRef = useRef(null)

    useEffect(() => {
        // console.log(`active: ${active}`)
        if(active){
            modal.openRenderlessModal(modalName, ()=>{}, ()=>{
                // console.log('onclose')
                setActive(false)
            }, {
                ref: componentRef.current
            })
        }
    }, [active]);

    const clickToOpen = (e: MouseEvent)=>{
        if(!active && componentRef.current && !componentRef.current.contains(e.target)){
            open()
        }
    }

    const open = ()=>{
        const keyname = modalName.split('__')[0];
        if(lock && lock.startsWith(keyname)){
           return;
        }
        setActive(true)
    }

    const close = ()=>{
        setActive(false)
        modal.closeModal(modalName)
    }

    return {
        active,
        setActive,
        ref: componentRef,
        clickToOpen,
        open,
        close
    }
}