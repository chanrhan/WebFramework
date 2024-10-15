import "../../css/user.module.css"

export function Support(){
    return (
        <main>
            <div id="contents">
                <form className="user_box user_form">
                    <h2 className="user_title">서비스 문의</h2>

                    <ul className="form_list">
                        <li className="form_item">
                            <label htmlFor="company" className="form_label">업체명 혹은 단체명</label>
                            <div className="form_inp">
                                <input type="text" id="company" className="inp" value="kimmomo"/>
                            </div>
                        </li>
                        <li className="form_item">
                            <label htmlFor="name" className="form_label">이름</label>
                            <div className="form_inp">
                                <input type="text" id="name" className="inp"/>
                            </div>
                        </li>
                        <li className="form_item">
                            <label htmlFor="tel" className="form_label">연락처</label>
                            <div className="form_inp">
                                <input type="text" id="tel" className="inp"/>
                            </div>
                        </li>
                        <li className="form_item">
                            <label htmlFor="email" className="form_label">이메일</label>
                            <div className="form_inp">
                                <input type="email" id="email" className="inp"/>
                            </div>
                        </li>
                        <li className="form_item">
                            <label htmlFor="inquiry" className="form_label">문의 내용</label>
                            <div className="form_inp">
                                <textarea id="inquiry" className="form_textarea" style={{height: "440px"}}></textarea>
                            </div>
                        </li>
                    </ul>

                    <div className="form_btn_box">
                        <button type="submit" className="btn btn_blue">문의하기</button>
                    </div>

                </form>
            </div>
        </main>
    )
}