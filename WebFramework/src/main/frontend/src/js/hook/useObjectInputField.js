import {useState} from "react";

export function useObjectInputField(init){
    const [input, setInput] = useState(init ?? {})

    const handleInput = e=>{
        const key = e.target.name;
        const value = e.target.value;
        put(key, value);
    }

    const get = (key)=>{
        return input[key] ?? ''
    }

    const put = (key, value)=>{
        setInput(prev=>({
            ...prev,
            [key]: value
        }))
    }

    const putAll = (arr)=>{
        setInput(arr)
    }

    const clear = ()=>{
        setInput({});
    }

    const clearOf = (value)=>{
        setInput(value)
    }

    return {
        input,
        setInput,
        get,
        put,
        putAll,
        handleInput,
        clear,
        clearOf
    }
}