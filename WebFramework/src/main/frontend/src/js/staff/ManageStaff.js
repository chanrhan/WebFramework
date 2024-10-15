import Board from "../../css/board.module.css"
import Layout from "../../css/layout.module.css"
import {cm, cmc} from "../utils/cm";
import {StaffTableData} from "../service/sale/module/StaffTableData";
import {BoardTable, Btbody, Bth, Bthead} from "../service/board/BoardTable";
import {useEffect, useState} from "react";
import useApi from "../hook/useApi";


export function ManageStaff(){
    const {userApi} = useApi()
    const [keyword, setKeyword] = useState('')

    const [items, setItems] = useState(null)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        getStaff()
        getInnerStaffTotalCount();
    }, [keyword]);

    const getStaff = async ()=>{
        await userApi.getInnerStaffAll(keyword).then(({status,data})=>{
            if(status === 200 && data){
                if(data.total_cnt){
                    setTotalCount(data.total_cnt)
                }else{
                    setTotalCount(0)
                }

                if(data.list){
                    const parsed = JSON.parse(data.list)
                    console.table(parsed)
                    setItems(parsed)
                }else{
                    setItems(null)
                }
            }
        })
    }

    const getInnerStaffTotalCount = async ()=>{
        await userApi.getInnerStaffTotalCount().then(({status,data})=>{
            if(status === 200 && data){
                setTotalCount(data)
            }
        })
    }

    const updateApprovalState = async (staffId, shopId, state)=>{
        await userApi.updateApprovalState(staffId, shopId,state).then(({status,data})=>{
            if(status === 200 && data){
                getStaff();
                getInnerStaffTotalCount();
            }
        })
    }

    return (
        <div className={cm(Layout.sub)}>
            <div className={cm(Layout.sub_head)}>
                <h2 className={cm(Layout.sub_title)}>직원 현황</h2>
                {/*<button type="button" className={`${cmc(Board.btn, Board.btn_medium)} btn_blue ${Layout.sub_head_btn}`}>저장하기</button>*/}
            </div>

            <div className={cm(Board.board, "board_list")}>
                <div className={cm(Board.board_head)}>
                    <form>
                        <div className={cm(Board.board_head_group)}>
                            <div className={cm(Board.board_count)}>
                                <span className={cm(Board.count_text)}>전체 <em className={cm(Board.em)}>{totalCount}</em>건</span>
                                <span className={cm(Board.count_text)}><em className={cm(Board.em)}>{items ? items.length : 0}</em>건</span>
                            </div>
                        </div>

                        <div className={cm(Board.board_head_group)}>
                            <div className={cm(Board.board_search)}>
                                <input type="search" title="검색" value={keyword}
                                       onChange={e=>{
                                           setKeyword(e.target.value)
                                       }}
                                       placeholder="이름, 전화번호, 식별번호 검색" className={cm(Board.input)}/>
                                <button type="submit" className={cm(Board.button)}>검색</button>
                            </div>
                        </div>
                    </form>
                </div>

                <BoardTable caption='직원 현황 테이블 - 선택, 이름, 소속매장, 권한, 승인요청 정보 제공'
                colgroup={
                    <>
                        {/*<col style={{width: "42px"}}/>*/}
                        <col/>
                        <col/>
                        <col style={{width: "150px"}}/>
                    </>
                }>
                    <Bthead>
                        {/*<Bth checkbox/>*/}
                        <Bth>아이디</Bth>
                        <Bth>이름</Bth>
                        <Bth>이메일</Bth>
                        <Bth>연락처</Bth>
                        <Bth>권한</Bth>
                        <Bth>마지막 로그인</Bth>
                        <Bth>입사일</Bth>
                        <Bth>승인요청</Bth>
                    </Bthead>
                    <Btbody>
                        {
                            items && items.map((v,i)=>{
                                return <StaffTableData key={i} data={v} onChangeState={updateApprovalState}/>
                            })
                        }

                    </Btbody>
                </BoardTable>

                <div className="view_more">
                    <button type="button" className="view_more_btn">더 보기</button>
                </div>
            </div>
        </div>
    )
}