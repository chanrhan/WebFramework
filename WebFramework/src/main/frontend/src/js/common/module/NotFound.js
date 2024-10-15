import {Link} from "react-router-dom";

function NotFound(){
    return (
        <div>
            <h2>404 NOT FOUND</h2>
            <h4>페이지를 찾을 수 없습니다</h4>
            <Link to='/service'>
                <button className='btn btn-outline-danger'>홈으로 이동</button>
            </Link>
        </div>
    )
}

export default NotFound;