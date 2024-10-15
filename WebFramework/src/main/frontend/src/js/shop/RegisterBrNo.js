import useModal from "../hook/useModal";
import {useNavigate} from "react-router-dom";
import useApi from "../hook/useApi";
import useUserInfo from "../hook/useUserInfo";
import React, {useState} from "react";
import {ModalType} from "../common/modal/ModalType";
import {UserFormBox} from "../account/module/UserFormBox";
import {UserFormList} from "../account/module/UserFormList";
import {UserFormItem} from "../account/module/UserFormItem";
import {UserFormInput} from "../account/module/UserFormInput";
import User from "../../css/user.module.css";
import {cmc} from "../utils/cm";
import {useObjectInputField} from "../hook/useObjectInputField";
import {bpNoRegex} from "../utils/regex";

export function RegisterBrNo(){
    const modal = useModal();
    const nav = useNavigate();
    const {userApi, shopApi} = useApi();
    const userInfo = useUserInfo();
    const [bpNoChecked, setBpNoChecked] = useState(false)
    const inputField = useObjectInputField([
        {
            key: 'br_nm',
            name: '상호명',
            // msg: '상호명을 입력해주세요'
        },
        {
            key: 'br_no',
            name: '사업자번호',
            regex: bpNoRegex,
            msg: '사업자번호를 정확하게 입력해주세요',
        }
        ]
    );

    const checkBrNoStatus = async ()=>{
        if(inputField.validateOne('br_no')){
            await userApi.checkBrNoStatus(inputField.get('br_no')).then(({status,data})=>{
                if(status === 200){
                    let msg = null;
                    // console.table(data)
                    if(data === true){
                        msg = '사업자번호 인증에 성공하였습니다.'
                        setBpNoChecked(true)
                    }
                        // else if(!ObjectUtils.isEmpty(data.id)){
                        //     msg = '동일한 사업자번호로 가입된 계정이 존재합니다.'
                    // }
                    else{
                        msg = '존재하지 않는 사업자번호입니다.'
                    }
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: msg
                    })
                }
            })
        }
    }

    const submit = async()=>{
        if(!bpNoChecked){
            inputField.handleError('br_no','사업자번호를 인증해야 합니다.');
        }else if(inputField.validateOne('br_nm')){
            nav('/shop/register')
        }
    }

    return (
        <main>
            <div>
                <UserFormBox title='사업자 등록하기'>
                    <UserFormList>
                        <UserFormItem errorText={inputField.error.br_nm}>
                            <UserFormInput name='br_nm' inputField={inputField} subject='사업자 등록'
                                           placeholder='상호명을 입력하세요.'/>
                        </UserFormItem>
                        <UserFormItem style={{marginTop: 10}} errorText={inputField.error.br_no}>
                            <UserFormInput readOnly={bpNoChecked} name='br_no' inputField={inputField}
                                           placeholder='-을 제외한 사업자등록번호 10자리를 입력하세요.'>
                                <button type="button" className={User.form_btn} onClick={checkBrNoStatus}>인증하기</button>
                            </UserFormInput>
                        </UserFormItem>
                    </UserFormList>

                    <div className={User.form_btn_box}>
                        <button type="button" className={`btn_grey ${cmc(User.btn)} ${User.w50}`} onClick={() => {
                            nav('/service')
                        }}>이전
                        </button>
                        <button type="button" className={`btn_blue ${cmc(User.btn)}`} onClick={submit}>다음</button>
                    </div>
                    {/*<div className={User.form_btn_box}>*/}
                    {/*    /!*<Link className={`btn_grey ${User.w30} ${cmc(User.btn)}`} to='/shop/list'>이전</Link>*!/*/}
                    {/*    <button type="button" className={`btn_blue ${cmc(User.btn)}`} onClick={submit}>다음</button>*/}
                    {/*</div>*/}
                </UserFormBox>
            </div>
        </main>
    )
}