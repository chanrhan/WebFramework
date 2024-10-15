import useApi from "../hook/useApi";
import {useState} from "react";

function ApiTest(){
    const {userApi} = useApi();
    const [input, setInput] = useState("5218702490");
    const [result, setResult] = useState(null)

    const handleInput = (e)=>{
        setInput(e.target.value)
    }

    const status = async ()=>{
        userApi.checkBrNoStatus(input).then(({status,data})=>{
            if(status === 200){
                console.log(data);
                setResult(data)
            }
        })
    }

    return (
        <div className='mt-4'>
            <h3>각종 API 테스트</h3>

            <div>
                <h4>사업자번호 인증</h4>
                <input className='input-mini' type="text" value={input} onChange={handleInput} placeholder='사업자번호 입력'/>
                <button className='btn btn-outline-primary ms-3' onClick={status}>확인</button>
            </div>
            <div>
                {
                    result ? (
                        result.matched ? <h4 className='text-success'>유효한 사업자 번호입니다.</h4> :
                            <h4 className='text-danger'>
                                {
                                    result.id == null ? "유효하지 않은 사업자 번호입니다." : `${result.id}(으) 대표 아이디가 이미 가입되어 있습니다.`
                                }
                            </h4>
                    ) : <h3>요청이 존재하지 않습니다.</h3>
                }
            </div>
        </div>
    )
}

export default ApiTest;