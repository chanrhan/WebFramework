import {ObjectUtils} from "./objectUtil";

export const KoreanUtils = {
    gwa_wa,
    eun_neun
}

function gwa_wa(value){
    if(ObjectUtils.isEmpty(value)){
        return null;
    }
    const lastChar = value.charCodeAt(value.length - 1)
    const isThereLastChar = (lastChar - 0xac00) % 28
    if (isThereLastChar) {
        return '과'
    }
    return '와'
}

function eun_neun(value){
    if(ObjectUtils.isEmpty(value)){
        return null;
    }
    const charCode = value.charCodeAt(value.length - 1);

    const consonantCode = (charCode - 44032) % 28;

    if(consonantCode === 0){
        return `를`;
    }
    return `을`;
}