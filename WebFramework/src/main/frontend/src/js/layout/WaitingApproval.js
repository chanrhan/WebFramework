import User from "../../css/user.module.css"
import {cm} from "../utils/cm";

export function WaitingApproval(){
    return (
        <>
            <div className={cm(User.approval)}>
                <h2 className={cm(User.approval_title)}>내 정보 설정</h2>
                <p className={cm(User.approval_text)}>승인이 늦어지는 경우 대표님에게 직접 문의해주세요.</p>
                <span className={cm(User.approval_stat)}>승인 대기중</span>
            </div>

            {/*<a href="#" className="back_btn">이전 페이지</a>*/}
        </>
    )
}