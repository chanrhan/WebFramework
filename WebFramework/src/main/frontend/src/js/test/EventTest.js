import {useEffect, useRef, useState} from "react";

export function EventTest(){
    const parentRef = useRef(null)
    const childRef = useRef(null)
    const [count, setCount] = useState(0)

    useEffect(()=>{
        const onClickCaptureEvent = (e)=>{
            console.log(`onclick capture: ${count}`)
            window.removeEventListener("click", onClickCaptureEvent, true)
        }
        const onClickBubbleEvent = (e)=>{
            console.log(`onclick bubble: ${count}`)
            window.removeEventListener("click", onClickBubbleEvent, false)
        }

        const onKeydownCaptureEvent = (e)=>{
            console.log(`onkeydown capture: ${count}`)
            window.removeEventListener("keydown", onKeydownCaptureEvent, true)
        }

        window.addEventListener('click', onClickCaptureEvent, true);
        window.addEventListener('keydown', onKeydownCaptureEvent, true);

        let timer = setTimeout(()=>{
            window.addEventListener('click', onClickBubbleEvent, false);
        }, 10)

        return ()=>{
            clearTimeout(timer);
        }
    }, [count])

    return (
        <div>
            <h1>버블링 / 캡처링 이벤트 테스트</h1>

            <button onClick>Re-Rendering</button>

            <div onClick={()=>{
                setCount(count+1)
            }} style={{
                backgroundColor: "yellow",
                width: '500px',
                height: '500px'
            }}>
                <div style={{
                    backgroundColor: "blue",
                    width: '300px',
                    height: '300px'
                }}>

                </div>
            </div>
        </div>
    )
}