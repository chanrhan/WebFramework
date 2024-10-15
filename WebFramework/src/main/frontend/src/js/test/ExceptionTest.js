import userApi from "../api/UserApi";
import useApi from "../hook/useApi";
import {useStore} from "react-redux";
import {useState} from "react";
import useValidateInputField from "../hook/useValidateInputField";
import InputBox from "../common/inputbox/InputBox";

function ExceptionTest(){
    const {testApi} = useApi();
    const inputField = useValidateInputField();

    const [result, setResult] = useState({

    });


    const getException = ()=>{
        testApi.getException(inputField.input).then(({status,data})=>{
            setResult(data);
        })
    }

    return (
        <div className='mt-3'>
            <h3>글로벌 예외처리</h3>
            <div>
                <InputBox subject="에러 코드" inputField={inputField} type='text' name='code'/>
                <InputBox subject="메시지" inputField={inputField} name='reason'/>
            </div>
            <button className='mt-3 btn btn-outline-danger' onClick={getException}>예외 발생시키기</button>
            <div>
                {
                    result ? <div>
                        <h3>{result.status}</h3>
                        <h3>{result.code}</h3>
                        <h3>{result.message}</h3>
                        <h3>{result.reason}</h3>
                        {
                            result.errors && result.errors.map(value=>{
                                return <h4>{value}</h4>
                            })
                        }
                    </div> : null
                }
            </div>
        </div>
    )
}

export default ExceptionTest;