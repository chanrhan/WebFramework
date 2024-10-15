import {useEffect, useState} from "react";
import {ObjectUtils} from "../utils/objectUtil";
import {emailRegex, idRegex, pwdRegex, scRegex, telRegex} from "../utils/regex";
import {KoreanUtils} from "../utils/KoreanUtils";

function useValidateInputField(initialState) {
    const init = {};
    const errorInfo = {...commonErrorInfo};
    // const errorInfo = {...commonErrorInfo, initialState};
    //
    // for(const key in initialState){
    //     init[key] = initialState[key]['value'] ?? null;
    // }

    for (const i in initialState) {
        const prop = initialState[i];
        init[prop.key] = prop.value ?? null;
        // console.log(`${prop.key}: ${init[prop.key]}`)
        if(prop.name || prop.msg || prop.required){
            errorInfo[prop.key] = {
                name: prop.name,
                regex: prop.regex,
                msg: prop.msg,
                required: prop.required,
                validateError: prop.validateError
            }
        }
    }

    const [input, setInput] = useState(init);
    const [error, setError] = useState({});

    const putAll = (map)=>{
        setInput(map)
    }

    const setValues = (values)=>{
        setInput(prev=>({
            ...prev,
            ...values
        }))
    }


    const get = (key)=>{
        return input[key] ?? ''
    }

    const put = (key, value)=>{
        setInput(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleInput = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        // console.log(`key: ${key} value: ${value}`)
        if (ObjectUtils.isEmpty(value)) {
            handleError(key, null);
        }else{
            validate(key, value)
        }

        setInput(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleError = (key, msg) => {
        // console.log(`error: ${msg}`)
        setError(prev => ({
            ...prev,
            [key]: msg
        }))
    }

    const handlePassword = (e) => {
        setInput(prev => ({
            ...prev,
            'pwd2': ''
        }))
        setError(prev => ({
            ...prev,
            'pwd2': null
        }))
        handleInput(e);
    }

    const handleConfirmPassword = (e) => {
        handleInput(e);
        matchPassword(e.target.value);
    }

    const matchPassword = (pwd2) => {
        if(ObjectUtils.isEmpty(pwd2)){
            pwd2 = input.pwd2;
        }
        const {pwd} = input;

        if (!ObjectUtils.isEmpty(input['pwd']) && ObjectUtils.isEmpty(pwd2)) {
            handleError('pwd2', '비밀번호를 다시 입력해 주세요')
            return false;
        }

        if (ObjectUtils.isEmpty(pwd)) {
            return false;
        }

        if (pwd !== pwd2) {
            handleError('pwd2', '비밀번호가 일치하지 않습니다');
            return false;
        } else {
            handleError('pwd2', null);
            return true;
        }
    }

    const matchAuthNumber = (auth, by='tel') => {
        const {auth_code} = input;
        // console.log(`auth: ${auth}, auth_code: ${auth_code}`)
        if (ObjectUtils.isEmpty(auth)) {
            handleError(by, '먼저 인증번호를 발송해야 합니다')
            return false;
        }

        if (ObjectUtils.isEmpty(auth_code)) {
            handleError(by, '인증번호를 입력해 주세요')
            return false;
        }

        if (auth != auth_code) {
            handleError(by, '인증번호가 일치하지 않습니다');
            return false;
        } else {
            handleError(by, null);
            return true;
        }
    }

    const validateAll = () => {
        let result = true;
        // console.table(input)
        for (const key in input) {
            // console.log(`val: k(${key}) v(${input[key]})`)
            if (!validate(key, input[key])) {
                result = false;
            }
        }
        const {pwd, pwd2} = input;
        // console.log(`${pwd} ${pwd2} res: ${result}`)
        if (pwd !== undefined && pwd2 !== undefined) {
            if (!matchPassword(input.pwd2)) {
                return false;
            }
        }

        return result;
    }

    const validateOne = (key)=>{
        return validate(key, input[key])
    }

    const validate = (key, value) => {
        // console.log(`validate: ${key} ${value}`)
        if (!errorInfo[key]) {
            return true;
        }
        // console.table(errorInfo[key])
        const {name, regex, msg, required, validateError} = errorInfo[key];
        // console.log(`validate: ${name} ${regex} ${msg} ${required}`)
        if(required !== false){
            if (ObjectUtils.isEmpty(value)) {
                if(validateError !== false){
                    handleError(key, `${name}${KoreanUtils.eun_neun(name)} 입력해주세요`);
                }
            } else {
                // console.log(`${value} ${regex} ${ObjectUtils.isEmpty(regex)} test: ${regex.test(value)}`)
                if(regex === null || regex === undefined || regex.test(value)){
                    if(validateError !== false) handleError(key, null);
                    return true;
                } else {
                    if(validateError !== false) handleError(key, msg);
                }
            }
        }else{
            return true;
        }

        return false;
    }

    const clearInput = () => {
        setInput(init);
    }

    const clearError = () => {
        setError(init)
    }

    const clearErrorOf = (...values)=>{
        const arr = {...error}
        for (const j in values) {
            arr[values[j]] = null;
        }
        setError(arr)
    }

    const clear = () => {
        setInput(init)
        setError(init)
    }

    const clearOf = (...values) => {
        const init2 = {...input}
        for (const j in values) {
            init2[values[j]] = init[values[j]] ?? '';
        }
        // console.table(init2)
        // console.table(input)
        setInput(init2)
    }



    return {
        input,
        error,
        setInput,
        setError,
        putAll,
        setValues,
        get,
        put,
        matchPassword,
        matchAuthNumber,
        handleInput,
        handleError,
        handlePassword,
        handleConfirmPassword,
        validateOne,
        validateAll,
        clearInput,
        clearError,
        clearErrorOf,
        clear,
        clearOf
    }
}

const commonErrorInfo = {
    name: {
        name: '이름',
        regex: scRegex,
        msg: '이름에 특수문자는 포함될 수 없습니다',
        required: true
    },
    tel: {
        name: '전화번호',
        regex: telRegex,
        msg: '전화번호를 정확히 입력해주세요',
        required: true
    },
    email: {
        name: '이메일',
        regex: emailRegex,
        msg: '유효한 이메일 주소를 입력해 주세요',
        required: true
    },
    id: {
        name: '아이디',
        regex: idRegex,
        msg: '5~32자리의 영문 소문자, 숫자만 입력해 주세요',
        required: true
    },
    pwd: {
        name: '비밀번호',
        regex: pwdRegex,
        msg: '영문, 숫자, 특수문자가 적어도 1개씩 포함된 8~32자리를 입력해 주세요',
        required: true
    }
}


export default useValidateInputField;