import {Btd} from "../../board/BoardTable";
import {SelectBox} from "../../board/SelectBox";
import Board from "../../../../css/board.module.css"
import {cm} from "../../../utils/cm";
import {ProfileTableColumn} from "../../sale/module/ProfileTableColumn";
import profileImg1 from "../../../../images/profile_img1.jpg"

export function TaskTableData({key, data, img}){
    return (
        <tr key={key}>
            <Btd checkbox/>
            <Btd>
                <SelectBox items={['판매 완료','판매 중']}/>
            </Btd>
            <Btd>2024.04.01</Btd>
            <ProfileTableColumn name='나모모' src={profileImg1}/>
            <Btd className="ta_c">010-1234-5678</Btd>
            <Btd className="ta_r">971213</Btd>
            <Btd className="ta_r">S24U</Btd>
            <Btd className="ta_r">320,000원</Btd>
            <Btd className="ta_r">320,000원</Btd>
            <Btd className="ta_r">다모모</Btd>
            <Btd className="ta_c">
                <button type="button" className="btn_kakao">전송</button>
            </Btd>
        </tr>
    )
}