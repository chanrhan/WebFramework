import Landing from "../../../css/landing.module.css";
import {Link} from "react-router-dom";
import profileImg1 from "../../../images/profile_img1.jpg";

export function LandingReviewCard({active}){
    return (
        <li className={`${Landing.review_item} ${active && 'active'}`}>
            <Link className={Landing.a} to=''>
                <div className={Landing.review_profile}>
                    <div className={Landing.profile_img}><img src={profileImg1} alt="프로필 이미지"/></div>
                    <div className={Landing.profile_name}>김모모</div>
                    <div className={Landing.profile_info}>
                        <span className={Landing.span}>울타리평촌역점</span>
                        <span className={Landing.span}>대표</span>
                    </div>
                </div>
                <div className={Landing.review_text}>테스트 리뷰 텍스트
                </div>
                <div className={Landing.review_writer}>fds****님의 후기</div>
            </Link>
        </li>
    )
}