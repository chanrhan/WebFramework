import {Link, Outlet} from "react-router-dom";


function TestHeader(){
    return (
        <div>
            <Link to='/test'>
                <button className='btn btn-outline-light text-success-emphasis' style={{fontSize: '40px'}}>테스트 페이지
                </button>
            </Link>
            <div className='mt-3 d-flex flex-row justify-content-center'>
                <Link to='notify'>
                    <button className='btn btn-outline-success ms-1'>알림 테스트</button>
                </Link>
                <Link to='modal'>
                    <button className='btn btn-outline-success ms-1'>모달창 테스트</button>
                </Link>
                <Link to='ref'>
                    <button className='btn btn-outline-success ms-1'>Ref 테스트</button>
                </Link>
                <Link to='multipart'>
                    <button className='btn btn-outline-success ms-1'>Multipart 테스트</button>
                </Link>
                <Link to='calendar'>
                    <button className='btn btn-outline-success ms-1'>달력 테스트</button>
                </Link>
                <Link to='graph'>
                    <button className='btn btn-outline-success ms-1'>그래프 테스트</button>
                </Link>
            </div>
            <div className='mt-3 d-flex flex-row justify-content-center'>
                <Link to='excel'>
                    <button className='btn btn-outline-success ms-1'>엑셀 다운로드 테스트</button>
                </Link>
                <Link to='bulk'>
                    <button className='btn btn-outline-success ms-1'>대량 업로드 테스트</button>
                </Link>
                <Link to='regex'>
                    <button className='btn btn-outline-success ms-1'>정규식 테스트</button>
                </Link>
                <Link to='api'>
                    <button className='btn btn-outline-success ms-1'>API 테스트</button>
                </Link>
                <Link to='exception'>
                    <button className='btn btn-outline-success ms-1'>예외 테스트</button>
                </Link>
            </div>
            <div className='mt-3 d-flex flex-row justify-content-center'>
                <Link to='file'>
                    <button className='btn btn-outline-success ms-1'>파일 업로드 테스트</button>
                </Link>
                <Link to='alimtalk'>
                    <button className='btn btn-outline-success ms-1'>알림톡 테스트</button>
                </Link>
                <Link to='css'>
                    <button className='btn btn-outline-success ms-1'>CSS 테스트</button>
                </Link>
                <Link to='async'>
                    <button className='btn btn-outline-success ms-1'>비동기 테스트</button>
                </Link>
                <Link to='vo'>
                    <button className='btn btn-outline-success ms-1'>VO 테스트</button>
                </Link>
                <Link to='event'>
                    <button className='btn btn-outline-success ms-1'>Event 테스트</button>
                </Link>
            </div>
            <div className='mt-3 d-flex flex-row justify-content-center'>
                <Link to='component'>
                    <button className='btn btn-outline-success ms-1'>Component 테스트</button>
                </Link>
            </div>
            <Outlet/>
        </div>
    )
}

export default TestHeader;