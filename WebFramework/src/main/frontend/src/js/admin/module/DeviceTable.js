import {BoardTable, Btbody, Btd, Bth, Bthead} from "../../service/board/BoardTable";
import {ProfileTableColumn} from "../../service/sale/module/ProfileTableColumn";
import profileImg1 from "../../../images/profile_img1.jpg";
import {LMD} from "../../common/LMD";

export function DeviceTable({data}){
    return (
        <BoardTable>
            <Bthead>
                <Bth className="ta_c" checkbox></Bth>
                <Bth>통신사</Bth>
                <Bth>단말기명</Bth>
                <Bth>모델명</Bth>
                {/*<Bth>등록일자</Bth>*/}
            </Bthead>
            <Btbody br>
                {
                    data && data.map((v,i)=> {
                        return <tr key={i}>
                            <Btd checkbox/>
                            <Btd>{LMD.provier[v.provider]}</Btd>
                            <Btd>{v.device_nm}</Btd>
                            <Btd>{v.device_cd}</Btd>
                        </tr>
                    })
                }
            </Btbody>
        </BoardTable>
    )
}