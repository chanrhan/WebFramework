import {fuzzyMatcher} from "./fuzzyMatcher";
import {RegexUtils} from "./regex";
import {SAMPLE_PHONE_MODEL, SAMPLE_TAG} from "../test/SAMPLE_DATA";
import {useEffect} from "react";
import useApi from "../hook/useApi";
import {HttpStatusCode} from "axios";
import {gmdActions} from "../store/slices/gmdSlice";
import {useSelector} from "react-redux";
import {ObjectUtils} from "./objectUtil";

export const useMapper = (type)=> {
    const {gmdApi} = useApi();
    const gmdData = useSelector(state=>state.gmdReducer);

    // useEffect(() => {
    //     console.table(gmdData)
    // }, [gmdData]);
    //
    // useEffect(() => {
    //     gmdApi.getPhoneModel().then(({status,data})=>{
    //         if(status === HttpStatusCode.Ok){
    //             // console.table(data)
    //             gmdActions.setData({
    //                 key: 'phone',
    //                 data: data
    //             });
    //         }
    //     })
    // }, []);

    return {
        matchMap: (data)=>{
            let result;
            switch (type){
                case 'cust_gd':
                    return mappingToGender(data);
                case 'cust_tel':
                    return mappingToTel(data);
                case 'cust_cd':
                    return mappingToIdentifyCode(data);
                case 'ph_md':
                    return matchPhoneModel(data);
                case 'sec_md':
                    return matchSecondModel(data);
            }
        },
        types: (type)=>{
            switch (type){
                case 'cust_gd':
                    return [
                        '법인',
                        '남',
                        '여'
                    ]
                case 'cust_tel':
                    return [
                        '010-0000-0000'
                    ]
                case 'cust_cd':
                    return [
                        '000000000'
                    ]
                case 'ph_md':
                    return [
                        'null'
                    ]
                // case 'sec_md':
                //     return matchSecondModel(data);
            }
        }
    }
}



const mappingToGender = (data)=>{
    if(/^(male|m|남자|남성)$|남/i.test(data)){
        return '남'
    }

    if(/^(female|f|여자|여성)$|여/i.test(data)){
        return '여'
    }

    if(/법/.test(data)){
        return '법인'
    }

    return null;
}

const mappingToTel = (data)=>{
    let str = data.toString();
    if(str.charAt(0) !== '0'){
        str = '0' + str;
    }
    const result = str.replaceAll(/[\s-]/g, '');
    if(/^(0[0-9]{2,3})?[0-9]{3,4}[0-9]{3,4}$/.test(result)){
        return result;
    }

    return null;
}

const mappingToIdentifyCode = (data)=>{
    let str = data.toString();
    const result = str.replaceAll(/[\s-ㄱ-ㅎㅏ-ㅣ가-힣]/g, '')
    if(/^[0-9]{7,11}$/.test(result)){
        return result;
    }

    return null;
}

const matchPhoneModel = (data)=>{
    const target = data.toString().replaceAll(/[\s-()~`!@#$%^&*=]/g, '')
    const result = {
        // '~/t': -999
    };

    const PHONE_MODELS = Object.entries(SAMPLE_PHONE_MODEL);

    // of: 열거 가능한 요소들 그냥 순서대로 반복
    // in: 객체의 열거 가능한 속성을 반복, key를 출력
    for(const [key, value] of PHONE_MODELS){
        const modelName = key.replaceAll(/[\s-]/g, '')
        if(modelName && target.toUpperCase().includes(modelName)){
            return key;
        }
        const tags = value.replaceAll(/[()]/g,'').split(' ');
        tags.map(tag=>{
            const finds = [tag];
            let isFind = false;
            if(SAMPLE_TAG[tag]){
                finds.push(...SAMPLE_TAG[tag])
            }
            for(const i in finds){
                if(target.toUpperCase().includes(finds[i].toString())){
                    // console.log(`found -> ${finds[i]}`)
                    isFind = true;
                    break;
                }
            }
            if(!result[key]){
                result[key] = 0;
            }
            result[key] += (isFind) ? 2 : 0;
        })
    }
    // console.log(`target: ${target}`)
    // console.table(result)

    const resultArray = Object.entries(result);
    const values = resultArray.map(([key, value])=>value);
    const maxCount = Math.max(...values);
    if(maxCount <= 0){
        return null;
    }
    const maxIndex = values.indexOf(maxCount);

    const maxKey = resultArray.map(([key, value])=>key)[maxIndex];

    if(!maxKey) return null;
    return maxKey;
    // const closestValue = SAMPLE_PHONE_MODEL[maxKey];
    // return closestValue ? closestValue : null;
}

const matchSecondModel = (data)=>{

}