import React, {useEffect, useRef} from "react";

export function Scrollable({children, scrollable}){
    const scrollRef = useRef(null);

    useEffect(() => {
        const target = scrollRef.current;
        if(target && target.style){
            if(scrollable === false){
                // target.style.position = 'fixed'
                target.style.pointerEvents = 'none'
            }else if(scrollable === true){
                target.style.pointerEvents = 'auto'
            }
        }
    }, [scrollable]);

    const childrenArray = React.Children.toArray(children);
    let firstChild = childrenArray[0]

    if(React.isValidElement(firstChild)){
        firstChild = React.cloneElement(firstChild, {ref: scrollRef});
    }

    return (
        <>
            {firstChild}
        </>
    )
}