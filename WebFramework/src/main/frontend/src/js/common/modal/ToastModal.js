import {useEffect} from "react";

export const ToastModal = ({children, x, y, width, height, close, timeout})=>{

    useEffect(()=>{
        const timer = setTimeout(close, timeout)
        return ()=>{
            clearTimeout(timer);
        }
    },[])

    return (
        <div className='modal-toast' style={{top: y, left: x, width: width, height: height}}>
            <div>
                <button className='btn btn-outline-danger' onClick={close}>임시 닫기 버튼</button>
            </div>
            {children}
        </div>
    )
}