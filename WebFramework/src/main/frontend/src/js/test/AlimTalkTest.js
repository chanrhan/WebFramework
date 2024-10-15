import useApi from "../hook/useApi";
import useValidateInputField from "../hook/useValidateInputField";
import InputBox from "../common/inputbox/InputBox";

function AlimTalkTest(){
    const {testApi} = useApi();
    const inputField = useValidateInputField([
        {
            key: "corp_name",
            value: "라인탁송"
        },
        {
            key: "name",
            value: "ghost01"
        },
        {
            key: "car_type",
            value: "제네시스 GV80"
        },
        {
            key: "car_no",
            value: "7070"
        },
        {
            key: "d_tel",
            value: "01099360636"
        },
        {
            key: "a_tel",
            value: "01038443140"
        },
        {
            key: "d_addr",
            value: "경기도 부천시 힐스테이트 503-602"
        },
        {
            key: "a_addr",
            value: "충청남도 천안시 병천면 충절로 1600"
        },
        {
            key: "driver_req",
            value: "안전하게 와주세요"
        }
    ]);

    const send = ()=>{
        console.table(JSON.stringify(inputField.input))
        testApi.sendAlimTalk(inputField.input).then(({status,data})=>{
            console.table(data)
        })
    }


    return (
        <div>
            <h3>SENS AlimTalk</h3>
            <h2>T010</h2>
            <div>
                <InputBox subject="수신인" name="to" inputField={inputField}/>
                <InputBox subject="회사명" name="corp_name" inputField={inputField}/>
                <InputBox subject="배송기사명" name="name" inputField={inputField}/>
                <InputBox subject="출발지 차종" name="car_type" inputField={inputField}/>
                <InputBox subject="출발지 차량번호" name="car_no" inputField={inputField}/>
                <InputBox subject="출발지 연락처" name="d_tel" inputField={inputField}/>
                <InputBox subject="도착지 연락처" name="a_tel" inputField={inputField}/>
                <InputBox subject="출발지 주소" name="d_addr" inputField={inputField}/>
                <InputBox subject="도착지 주소" name="a_addr" inputField={inputField}/>
                <InputBox subject="기사 요청사항" name="driver_req" inputField={inputField}/>
            </div>
            <div>
                <button className='btn btn-outline-primary' onClick={send}>전송</button>
            </div>
        </div>
    )
}

export default AlimTalkTest;