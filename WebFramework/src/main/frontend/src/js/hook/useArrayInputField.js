import {useState} from "react";
import {ObjectUtils} from "../utils/objectUtil";

export function useArrayInputField(init){
    const [input, setInput] = useState(!ObjectUtils.isEmptyArray(init) ? init : null);

    const length = ()=>{
        return input.length;
    }

    const get = (index)=>{
        if(!input || !input[index] || index >= input.length){
            return ''
        }
        return input[index] ?? ''
    }

    const putAll = (arr)=>{
        setInput(arr)
    }

    const put = (index, value)=>{
        const copy = [...input];
        copy[index] = value;
        setInput(copy);
    }

    const addItem = ()=>{
        if(!input){
            setInput([])
            return;
        }
        const copy = [...input]
        copy.push(null)
        setInput(copy)
    }

    const removeItem = (index)=>{
        const copy = [...input]
        copy.splice(index,1)
        setInput(copy)
    }

    return {
        input,
        setInput,
        length,
        get,
        put,
        putAll,
        addItem,
        removeItem
    }
}