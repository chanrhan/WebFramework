import {BoardTable, Btbody, Btd, Bth, Bthead} from "../../board/BoardTable";
import {TaskTableData} from "./TaskTableData";
import {SelectBox} from "../../board/SelectBox";
import {ProfileTableColumn} from "../../sale/module/ProfileTableColumn";
import profileImg1 from "../../../../images/profile_img1.jpg";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {LMD} from "../../../common/LMD";
import Board from "../../../../css/board.module.css";
import {useRef} from "react";

export function TaskSupportBoardTable({allChecked, checkAll, checkedSale, onCheck,profileImages, items, onChangeState, onSelectSale}){
    const tableRef = useRef()

    const resizeColumn = (e, index) => {
        const startX = e.clientX;
        const table = tableRef.current;
        const th = table.querySelectorAll('th')[index];
        const startWidth = th.offsetWidth;

        const onMouseMove = (e) => {
            const newWidth = startWidth + (e.clientX - startX);
            if (newWidth > 50) {  // 최소 너비 설정
                th.style.width = `${newWidth}px`;
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <BoardTable tableRef={tableRef} caption='고객관리 테이블 - 선택, 진행 사항, 개통날짜, 이름, 휴대폰 번호, 식별 번호, 중고폰, 판매 금액, 총 이익, 담당자, 전송 정보 제공'>
            <Bthead>
                <Bth checked={allChecked} onCheck={checkAll} checkbox onMouseDown={e=>{
                    resizeColumn(e, 0)
                }}/>
                <Bth onMouseDown={e=>{
                    resizeColumn(e, 1)
                }}>진행 사항</Bth>
                <Bth onMouseDown={e=>{
                    resizeColumn(e, 2)
                }} sort>개통날짜</Bth>
                <Bth onMouseDown={e=>{
                    resizeColumn(e, 3)
                }}>이름</Bth>
                <Bth onMouseDown={e=>{
                    resizeColumn(e, 4)
                }} className="ta_c">휴대폰 번호</Bth>
                <Bth onMouseDown={e=>{
                    resizeColumn(e, 5)
                }} className="ta_r">식별 번호</Bth>
                <Bth onMouseDown={e=>{
                    resizeColumn(e, 6)
                }} className="ta_r">지원 구분</Bth>
                <Bth onMouseDown={e=>{
                    resizeColumn(e, 7)
                }} className="ta_r">지원 금액</Bth>
                <Bth onMouseDown={e=>{
                    resizeColumn(e, 8)
                }} className="ta_r">담당자</Bth>
                <Bth onMouseDown={e=>{
                    resizeColumn(e, 9)
                }} className="ta_c">전송</Bth>
            </Bthead>
            <Btbody br>
                {
                    items && items.map((v, i)=>{
                        return <tr key={i} onClick={()=>{
                            onSelectSale(v.sale_id)
                        }}>
                            <Btd name={`check_${v.sale_id}`} checked={checkedSale[i]} onCheck={()=>{
                                onCheck(i)
                            }} checkbox/>
                            <Btd stopPropagation>
                                <div className="select_box">
                                    <SelectIndexLayer value={LMD.sup_st[v.sup_st]} cssModule={Board}
                                                      onChange={state => {
                                                          if(v.sup_st === state) {
                                                              return;
                                                          }
                                                          onChangeState(v.sale_id, state, v.sup_id);
                                                          onChangeState({
                                                              sale_id: v.sale_id,
                                                              sup_id: v.sup_id,
                                                              state: state
                                                          });
                                                      }} values={LMD.sup_st}/>
                                </div>
                            </Btd>
                            <Btd>{v.actv_dt}</Btd>
                            <Btd className="ta_r">{v.cust_nm}</Btd>
                            <Btd className="ta_c">{v.cust_tel}</Btd>
                            <Btd className="ta_r">{v.cust_cd}</Btd>
                            <Btd className="ta_r">{v.sup_div}</Btd>
                            <Btd className="ta_r">{v.sup_amount}</Btd>
                            <ProfileTableColumn name={v.seller_nm} src={profileImages ? profileImages[i] : profileImg1}/>
                            <Btd className="ta_c">
                                <button type="button" className="btn_kakao">전송</button>
                            </Btd>
                        </tr>
                    })
                }
            </Btbody>
        </BoardTable>
    )
}