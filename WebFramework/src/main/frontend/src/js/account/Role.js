import {Link} from "react-router-dom";
import StaffImg from "../../images/profile_img1.jpg"
import BMImg from "../../images/profile_img2.jpg"
import RepsImg from "../../images/profile_img3.jpg"
import User from "../../css/user.module.css"

export function Role(){
    return (
        <div className={User.user}>

            <div className={`container ${User.container}`}>

                <main>
                    <div>
                        <form className={`${User.user_form} ${User.user_permission}`}>
                            <h2 className={User.user_title}>권한 신청하기</h2>

                            <p className={User.form_label}>권한 선택</p>

                            <ul className={User.permission_list}>
                                <li className={User.li}>
                                    <Link to='staff' className={User.a}>
                                        <span className={User.permission_img}><img src={StaffImg} alt="팀원"/></span>
                                        <span className={User.permission_text}>팀원</span>
                                        <button type="button" className={User.permission_btn}>권한 보기</button>
                                    </Link>
                                </li>
                                <li className={User.li}>
                                    <Link to='staff' className={User.a}>
                                        <span className={User.permission_img}><img src={BMImg} alt="점장"/></span>
                                        <span className={User.permission_text}>점장</span>
                                        <button type="button" className={User.permission_btn}>권한 보기</button>
                                    </Link>
                                </li>
                                <li className={User.li}>
                                    <Link to='reps' className={User.a}>
                                        <span className={User.permission_img}><img src={RepsImg} alt="대표"/></span>
                                        <span className={User.permission_text}>대표</span>
                                        <button type="button" className={User.permission_btn}>권한 보기</button>
                                    </Link>
                                </li>
                            </ul>
                        </form>
                    </div>
                </main>


            </div>
        </div>
    )
}