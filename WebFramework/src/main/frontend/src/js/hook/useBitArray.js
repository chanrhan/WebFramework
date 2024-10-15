import {useState} from "react";

export function useBitArray(init){
    const [bit, setBit] = useState(init ?? 0);

    const setAll = (bit: number)=>{
        setBit(bit)
    }

    const on = index=>{
        console.log(`on, ${index} before: ${bit} | after: ${bit | (1 << index)}`)
        setBit(bit | (1 << index))
    }

    const off = index=>{
        console.log(`off, ${index} before: ${bit} | after: ${bit & ~(1 << index)}`)
        setBit(bit & ~(1 << index))
    }

    const set = (index, value: boolean)=>{

        if(value){
            on(index)
        }else{
            off(index)
        }
    }

    const toggle = index=>{
        setBit(bit ^ (1 << index))
    }

    const get = index=>{
        return (bit >> index) & 1;
    }

    const toArray = ()=>{
        let value = bit;
        let arr = []
        let i = 0;
        while(value > 0){
            if((value & 1) === 1){
                // console.log(i)
                arr.push(i)
            }

            value = value >> 1
            // console.log(`v: ${value}`)
            ++i;
        }
        return arr;
    }

    const is = (index)=>{
        return !!get(index)
    }

    return {
        bit,
        get,
        set,
        on,
        off,
        is,
        toggle,
        setAll,
        toArray
    }
}