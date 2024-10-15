import useApi from "../hook/useApi";

export function VOTest(){
    const {testApi} = useApi()

    const submit = async ()=>{
        const body = {
            limit: 10,
            order: 1
        }
        await testApi.voTest(body);
    }

    return (
        <div style={{
            padding: '10px'
        }}>
            <h1>VO 테스트</h1>
            <button type='button' onClick={submit} style={{
                backgroundColor: '#6e9be0',
                padding: '15px',
                borderRadius: '5px',
                fontSize: '21px',
                fontWeight: '800px'
            }}>VO 보내기</button>
        </div>
    )
}