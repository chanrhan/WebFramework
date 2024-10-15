import {useState} from "react";
import {RegexUtils} from "../utils/regex";
import useModal from "../hook/useModal";
import ModalTest from "./ModalTest";
import {ModalType} from "../common/modal/ModalType";

export const RegexTest = ()=>{
    const modal = useModal()
    const regexes = RegexUtils.getRegexes();
    const [regex, setRegex] = useState(null);
    const [input, setInput] = useState('')

    const handleRegexChange = e=>{
        setRegex(e.target.value);
    }

    const handleInputChange = e=>{
        setInput(e.target.value)
    }

    const submit = ()=>{
        const result = regexes[regex].test(input);
        modal.openModal(ModalType.SNACKBAR.Alert, {
            msg: (result) ? <h3 className='text-success'>SUCCESS</h3> : <h3 className='text-danger'>FAILED</h3>
        })
    }

    return (
        <div className='mt-5'>
        <select className='form-select-lg' onChange={handleRegexChange}>
                <option selected value="email">이메일</option>
                <option value="tel">전화번호1</option>
                <option value="telCommon">전화번호2</option>
                <option value="date">날짜</option>
                <option value="korean">한글</option>
                <option value="sc">특수문자</option>
                <option value="id">아이디</option>
                <option value="pwd">비밀번호</option>
            </select>
            <input type="text" onChange={handleInputChange}/>
            <button className='btn btn-outline-primary' onClick={submit}>검사</button>
        </div>
    )
}