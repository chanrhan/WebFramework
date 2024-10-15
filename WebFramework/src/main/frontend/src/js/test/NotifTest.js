import {useState} from "react";
import {useSelector} from "react-redux";
import useApi from "../hook/useApi";
import {HttpStatusCode} from "axios";

function NotifTest(){
    const {sse} = useSelector(state=>state.sseReducer);
    const {testApi} = useApi();

    const [input, setInput] = useState({
        notif_tp: 'message',
        content: null,
        receiver_id: null
    })

    const [serverError, setServerError] = useState(null)

    const handleInput = e=>{
        // console.log(`${e.target.name} ${e.target.value}`)
        setInput(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const send = ()=>{
        testApi.note(input).then(({status,data})=>{
            if(status === HttpStatusCode.Ok){
                alert("알림이 전송되었습니다.")
                setServerError(null)
            }else{
                setServerError("에러가 발생했습니다");
            }
        }).catch((e)=>{
            setServerError(`알 수 없는 에러가 발생하였습니다: ${e}`)
        })
    }


    return (
        <div className='mt-4'>
            <div>
                <h4>알림 타입</h4>
                <select name='notif_tp' onChange={handleInput}>
                    <option value="message">message</option>
                    <option value="approval">approval</option>
                </select>
            </div>
            <div className='mt-4 d-flex justify-content-center'>
                <input name='content' type="text" placeholder='알림 내용' onChange={handleInput}/>
                <input name='receiver_id' className='ms-2' type="text" placeholder='수신인' onChange={handleInput}/>
                <button className='btn btn-outline-primary ms-3' onClick={send}>알림 보내기</button>
            </div>
            {
                serverError && <p className='text-danger'>{serverError}</p>
            }
        </div>
    )
}

export default NotifTest;