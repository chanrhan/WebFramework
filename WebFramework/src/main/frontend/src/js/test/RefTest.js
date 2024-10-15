import {useEffect, useRef} from "react";

function RefTest(){

    const ref = useRef(null)

    useEffect(()=>{
        console.table(ref.current)
    },[])

    return (
        <div>
            <MyComponent refs={ref}/>
        </div>
    )
}

function MyComponent({refs}){
    return (
        <div ref={refs}>
            <p>My Component</p>
        </div>
    )
}

export default RefTest;