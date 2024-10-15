import User from "../../css/user.module.css"
import {UserFormBox} from "../account/module/UserFormBox";
import {UserCompanyItem} from "./module/UserCompanyItem";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import useApi from "../hook/useApi";
import {useSelector} from "react-redux";
import {shopItemReducer} from "../store/slices/shopItemSlice";
import useValidateInputField from "../hook/useValidateInputField";
import {bpNoRegex, telRegex} from "../utils/regex";
import {ComponentStepper} from "../utils/ComponentStepper";
import useModal from "../hook/useModal";
import {ObjectUtils} from "../utils/objectUtil";
import {ModalType} from "../common/modal/ModalType";
import {UserFormList} from "../account/module/UserFormList";
import {UserFormItem} from "../account/module/UserFormItem";
import {UserFormInput} from "../account/module/UserFormInput";
import {cmc} from "../utils/cm";
import useUserInfo from "../hook/useUserInfo";

// 일단 보류
export function RegisterShop(){
    const {shopApi} = useApi();
    const inputField = useValidateInputField([
        {
            key: 'provider',
            name: '통신사',
            value: 0
        },
        {
            key: 'shop_nm',
            name: '매장명'
        },
        {
            key: 'shop_tel',
            name: '매장 전화번호',
            regex: telRegex,
            msg: '전화번호 규격에 알맞게 입력해주세요'
        },
        {
            key: 'shop_addr',
            name: '매장 주소'
        }
    ]);

    const nav = useNavigate()

    const submit = async () => {
        if (inputField.validateAll()) {
            await shopApi.addShop({
                ...inputField.input,
                'shop_addr': inputField.get('shop_addr') + ' ' + inputField.get('shop_addr_detail')
            }).then(({status,data})=>{
                console.log(`${status} ${data}`)
                if(status === 200 && data){
                    nav('/service')
                }
            })
        }
    }

    return (
        <main>
            <div >
                <UserFormBox title='매장 등록하기'>
                    <div className={User.form_company}>
                        <ul className={User.company_list}>
                            <UserCompanyItem inputField={inputField}/>
                        </ul>

                        {/*<button type="button" className={`btn btn_sky btn_add_icon ${User.btn}`} onClick={addShopItem}>매장 추가</button>*/}
                    </div>

                    <div className={User.form_btn_box}>
                        <Link className={`btn btn_grey ${User.btn} ${User.w30}`} to='/service'>이전</Link>
                        <button type="button" className={`btn btn_blue ${User.btn}`} onClick={submit}>등록완료</button>
                    </div>
                </UserFormBox>
            </div>
        </main>
    )
}