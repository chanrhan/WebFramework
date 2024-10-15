import User from "../../css/user.module.css"
import {UserFormFindBox} from "./module/UserFormFindBox";
import {UserFormBox} from "./module/UserFormBox";
import {UserFormBtnBox} from "./module/UserFormBtnBox";
import {useEffect, useState} from "react";
import {cm, cmc} from "../utils/cm";
import useValidateInputField from "../hook/useValidateInputField";
import {ObjectUtils} from "../utils/objectUtil";
import useApi from "../hook/useApi";
import {Link, useNavigate} from "react-router-dom";
import useModal from "../hook/useModal";
import {FindAccountBox} from "./module/FindAccountBox";


export function FindUsername(){
    const {publicApi} = useApi();
    const modal = useModal();
    const nav = useNavigate()

    const inputField = useValidateInputField([{key:'tel'},{key:'email'}]);
    const [foundUsers, setFoundUsers] = useState(null)
    const [selected, setSelected] = useState(0)


    const submit = async(by)=>{
        await publicApi.findUser(by, inputField.input[by]).then(({status,data})=>{
            if(status === 200){
                setFoundUsers(data)
            }
        })
    }

    if(foundUsers){
        return (
            <UserFormBox title='아이디 찾기' find>
                <p className={`ta_c ${User.form_text}`}>회원님의 정보와 일치하는 아이디입니다.</p>

                <ul className={cm(User.form_list,User.form_confirm)}>
                    {
                        foundUsers.map((v,i)=> {
                            return <li className={cm(User.form_item)}>
                                <div className={cmc(User.radio_box)}>
                                    <input type="radio" name={`radio_${i}`} className={cm(User.input)} checked={i === selected}/>
                                    <label htmlFor={`radio_${i}`} className={User.form_label}
                                           onClick={()=>{
                                               setSelected(i)
                                           }}><span
                                        className={User.span}>{v.id}</span>(가입일 : {v.regi_dt})</label>
                                </div>
                            </li>
                        })
                    }
                </ul>

                <div className={User.form_btn_box}>
                    <Link to='/account/login' className={`btn_blue ${cmc(User.btn, User.w50)}`}>로그인</Link>
                    <button type="submit" className={`btn_grey ${cmc(User.btn, User.w50)}`}>
                        <Link to='/account/find-password'>
                            비밀번호 찾기
                        </Link>
                    </button>

                </div>
            </UserFormBox>
        )
    }

    return (
        <UserFormBox title='아이디 찾기' find={true}>
            <FindAccountBox inputField={inputField} onSubmit={submit} onPrev={()=>{
                nav('/account/login')
            }}/>
            {/*<UserFormBtnBox value='다음' onClick={submit}/>*/}
        </UserFormBox>
    )
}