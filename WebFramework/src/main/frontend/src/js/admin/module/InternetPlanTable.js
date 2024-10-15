import {BoardTable, Btbody, Btd, Bth, Bthead} from "../../service/board/BoardTable";
import {LMD} from "../../common/LMD";

export function InternetPlanTable({data}){
    return (
        <BoardTable>
            <Bthead>
                <Bth className="ta_c" checkbox></Bth>
                <Bth>통신사</Bth>
                <Bth>요금제명</Bth>
                {/*<Bth>등록일자</Bth>*/}
            </Bthead>
            <Btbody br>
                {
                    data && data.map((v,i)=> {
                        return <tr key={i}>
                            <Btd checkbox/>
                            <Btd>{LMD.provier[v.provider]}</Btd>
                            <Btd>{v.name}</Btd>
                        </tr>
                    })
                }
            </Btbody>
        </BoardTable>
    )
}