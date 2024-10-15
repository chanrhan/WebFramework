import {useEffect, useState} from "react";

export function ComponentStepper({initStep=1, components=[], inputField}){
    const [step, setStep] = useState(initStep);

    const COMPONENT = components[step-1]

    const next = ()=>{
        if(step < components.length + 1){
            setStep(step+1)
        }
    }

    const prev = ()=>{
        if(step > 1){
            setStep(step-1)
        }
    }

    return <COMPONENT next={next} prev={prev}  inputField={inputField}/>
}