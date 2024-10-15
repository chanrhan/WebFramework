import {Link, useNavigate} from "react-router-dom";
import User from "../../css/user.module.css"
import {ComponentStepper} from "../utils/ComponentStepper";
import {UserFormBox} from "./module/UserFormBox";
import {UserFormItem} from "./module/UserFormItem";
import {UserFormList} from "./module/UserFormList";
import {UserFormInput} from "./module/UserFormInput";
import {cm, cmc} from "../utils/cm";
import useValidateInputField from "../hook/useValidateInputField";
import useApi from "../hook/useApi";
import {ObjectUtils} from "../utils/objectUtil";
import {useEffect, useState} from "react";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";
import {TelePhoneInput} from "../common/inputbox/TelePhoneInput";
import {FindAccountBox} from "./module/FindAccountBox";

export function FindPassword(){
    const inputField = useValidateInputField();

    return (
        <ComponentStepper inputField={inputField} components={[
            FindPasswordStep1,
            FindPasswordStep2,
            FindPasswordStep3
        ]}/>
    )
}


function FindPasswordStep1({next, prev, inputField}){
    const {publicApi} = useApi();
    const nav = useNavigate()

    const submit = async ()=>{
        if(ObjectUtils.isEmpty(inputField.input.findId)){
           inputField.handleError('findId','아이디를 입력해 주세요');
           return;
        }

        await publicApi.existUserId(inputField.input.findId).then(({status,data})=>{
            if(status === 200){
                console.log(data)
                if(data === true){
                    publicApi.getProtectedTelAndEmail(inputField.input.findId).then(({status,data})=>{
                        if(status === 200){
                            const {tel, email} = data;
                            if(tel && email){
                                inputField.setInput({
                                    ...inputField.input,
                                    'telHint': tel,
                                    'emailHint': email
                                })
                                next();
                            }
                        }
                    })
                }else{
                    inputField.handleError('findId','존재하지 않는 아이디입니다.')
                }
            }
        })
    }

    return (
        <UserFormBox title='비밀번호 찾기' find>
            <p className={`ta_c ${User.form_text} `}>회원님의 정보와 일치하는 아이디입니다.</p>

            <UserFormList>
                <UserFormItem errorText={inputField.error.findId}>
                    <UserFormInput name='findId' inputField={inputField} placeholder='아이디를 입력해주세요.'/>
                </UserFormItem>
                <p className={User.link_text}>아이디가 기억나지 않는다면? <Link className={User.a}
                                                                    to='/account/find-username'>아이디
                    찾기</Link></p>
            </UserFormList>

            <div className={User.form_btn_box}>
                <button type="button" className={`btn_grey ${cmc(User.btn)} ${User.w50}`} onClick={()=>{
                    nav('/account/login')
                }}>이전</button>
                <button type="button" className={`btn_blue ${cmc(User.btn)}`} onClick={submit}>다음</button>
            </div>
        </UserFormBox>
    )
}

function FindPasswordStep2({next, prev, inputField}) {
    const {publicApi} = useApi();
    const modal = useModal();


    useEffect(() => {
        inputField.clearError();
        inputField.clearOf('auth_code')
    }, []);


    const submit = async (by) => {
        await publicApi.matchUserId(inputField.input.findId, by, inputField.input[by]).then(({status,data})=>{
            if(status === 200){
                if(data === true){
                    next();
                }else{
                    modal.openModal(ModalType.SNACKBAR.Alert, {
                        msg: '정보가 일치하지 않습니다'
                    })
                }
            }
        })
    }


    return (
        <UserFormBox title='비밀번호 찾기' find={true}>
            <FindAccountBox inputField={inputField} onSubmit={submit} onPrev={prev}/>
        </UserFormBox>
    )
}

function FindPasswordStep3({prev, inputField}) {
    const {publicApi} = useApi()


    const submit = async () => {
        if (inputField.validateAll() && inputField.matchPassword()) {
            await publicApi.getResetToken({
                id: inputField.input.findId
            }).then(({status,data})=>{
                if(status === 200){
                    publicApi.resetPassword({
                        id: inputField.input.findId,
                        pwd: inputField.input.pwd
                    }, data).then(({status,data})=>{
                        if(status === 200){
                            alert(`비밀번호가 변경되었습니다. ${data}`)
                        }
                    })
                }
            })

        }
    }

    return (
        <UserFormBox title='비밀변호 변경하기'>
            <p className={`ta_c ${User.form_text}`}>보안을 위해 비밀번호를 변경해주세요.</p>

            <ul className={`${User.form_list} ${User.form_select}`}>
                <UserFormItem errorText={inputField.error.pwd}>
                    <UserFormInput type='password' name='pwd' inputField={inputField} subject='새 비밀번호 (숫자, 영문, 특수문자 조합 8글자 이상)' varName='pwd' onChange={inputField.handlePassword}/>
                </UserFormItem>
                <UserFormItem errorText={inputField.error.pwd2}>
                    <UserFormInput type='password' name='pwd2' inputField={inputField} subject='새 비밀번호 확인' varName='comfirmed_pwd' onChange={inputField.handleConfirmPassword}/>
                </UserFormItem>
            </ul>

            <div className={User.form_btn_box}>
                <button type="button" className={`btn_grey ${cmc(User.btn)} ${User.w50}`} onClick={prev}>이전</button>
                <button type="button" className={`btn_blue ${cmc(User.btn)}`} onClick={submit}>완료</button>
            </div>
        </UserFormBox>
    )
}

