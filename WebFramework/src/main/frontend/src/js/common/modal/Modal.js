import {useEffect, useRef} from "react";

export function Modal({scrollable, children}){
    const modalRef = useRef(null)

    useEffect(() => {

    }, []);

    return (
        <div ref={modalRef}>
            {children}
        </div>
    )
}