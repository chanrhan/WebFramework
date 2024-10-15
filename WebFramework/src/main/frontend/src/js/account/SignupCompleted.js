export function SignupCompleted(){
    return (
        <main>
            <div id="contents">
                <div className="user_box user_complete">
                    <h2 className="user_title">환영합니다,박상인 님</h2>

                    <p className="form_text">회원가입이 완료되었습니다.</p>

                    <a href="#" className="btn btn_blue">로그인 하러가기</a>

                    <ul className="user_link link_find">
                        <li><a href="#">회원가입</a></li>
                        <li><a href="#">아이디 찾기</a></li>
                        <li><a href="#">비밀번호 찾기</a></li>
                    </ul>
                </div>
            </div>
        </main>
    )
}