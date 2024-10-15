import profileImg1 from "../../../../images/profile_img1.jpg";
import {Btd} from "../../board/BoardTable";
import {cm} from "../../../utils/cm";
import Board from "../../../../css/board.module.css";

export function ProfileTableColumn({src, name, active}){
    return (
        <Btd>
            <div className={`${Board.board_profile} select_box`}>
                <button type="button" className={cm(Board.profile_name)}><span
                    className={cm(Board.profile_img)}><img
                    src={src} alt="프로필 이미지"/></span>{name}
                </button>
                <ul className={`${cm("select_layer", "profile_list", "add_icon")} ${active && Board.active}`}>
                    {/*활성화시 active 추가 -->*/}
                    <li className='profile_item graph'>
                        <button type="button">그래프 보기</button>
                    </li>
                    <li className="profile_item secession">
                        <button type="button">탈퇴 하기</button>
                    </li>
                </ul>
            </div>
        </Btd>
    )
}