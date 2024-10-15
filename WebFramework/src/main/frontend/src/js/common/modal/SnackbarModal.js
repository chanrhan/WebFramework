import {useEffect, useState} from "react";
import Modal from "../../../css/modal.module.css"


export const SnackbarModal = ({children, x, y, width, height, className, close, timeout})=>{

    const [fadeout, setFadeOut] = useState(null)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setFadeOut(Modal.fade_out)
        }, timeout)

        return ()=>{
            clearTimeout(timer);
        }
    },[])

    useEffect(()=>{
        let timer;
        if(fadeout !== null){
            timer = setTimeout(close, 400)
        }
        return ()=>{
            clearTimeout(timer);
        }
    },[fadeout])

    return (
        <div >
            <div className={`${Modal.modal_snakbar} ${className} ${Modal.active} ${fadeout}`} style={{top: y, left: x, width: width, height: height}}>
                {children}
            </div>
        </div>

    )
}