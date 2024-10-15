import Board from "../../css/board.module.css"
import Layout from "../../css/layout.module.css"
import {TabList} from "../common/module/TabList";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../service/board/BoardTable";
import useValidateInputField from "../hook/useValidateInputField";
import {useEffect, useState} from "react";
import {DeviceTable} from "./module/DeviceTable";
import {CtPlanTable} from "./module/CtPlanTable";
import {InternetPlanTable} from "./module/InternetPlanTable";
import {ExsvcTable} from "./module/ExsvcTable";
import useApi from "../hook/useApi";
import {TvPlanTable} from "./module/TvPlanTable";
import {cmc} from "../utils/cm";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";
import {useNavigate} from "react-router-dom";
import {LMD} from "../common/LMD";
import {NumberUtils} from "../utils/NumberUtils";
import {ProfileTableColumn} from "../service/sale/module/ProfileTableColumn";
import profileImg1 from "../../images/profile_img1.jpg";
import {useFileLoader} from "../hook/useFileLoader";

const PROVIDER = [
    true,true,true,true,true,true,false,false,false
]
const NAME = [
    '기기명','기기명','요금제명','요금제명','요금제','요금제명','부가서비스명','지원명','추가명','결합명'
]
const CODE = [
    true,true,false,false,false,false,false,false,false
]

export function MasterShop(){
    const fileLoader = useFileLoader()
    const {shopApi} = useApi();
    const [tab, setTab] = useState(0)
    const [keywowrd, setKeyword] = useState('')

    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(20)

    const [items, setItems] = useState(null)
    const [totalCount, setTotalCount] = useState(0)

    const [profileImages, setProfileImages] = useState(null)

    useEffect(() => {
        getItems()
    }, [tab, keywowrd]);

    const getItems = async ()=>{
        const body = {
            keyword: keywowrd,
            limit: limit
        }
        await shopApi.getShopAdmin(body).then(({status,data})=>{
            if(status === 200 && data){
                console.table(data)
                if(data.total_cnt){
                    setTotalCount(data.total_cnt)
                }
                if(data.list){
                    const parsed = JSON.parse(data.list);
                    setItems(parsed)

                    getProfimeImages(parsed).then((data)=>{
                        if(data){
                            // console.table(data)
                            setProfileImages(data)
                        }
                    })
                }else{
                    setItems(null)
                    setProfileImages(null)
                }
            }
        })
    }

    const getProfimeImages = async (list)=>{
        if(list){
            const copy = new Array(list.length)
            for(let i=0;i<list.length; ++i){
                await fileLoader.pfp(list[i].pfp).then(d=>{
                    copy[i] = d;
                })
            }
            return copy;
        }
        return null;
    }

    return (
        <div className={Layout.sub} style={{
            paddingLeft: '10px'
        }}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>매장 관리</h2>
            </div>

            {/*<div className={Layout.sub_tab}>*/}
            {/*    <TabList name='user_st' value={tab} onChange={setTab} theme={Layout} values={*/}
            {/*        ['디바이스','세컨 디바이스','무선요금제','인터넷요금제','TV요금제','부가서비스','지원구분','추가구분','결합유형']*/}
            {/*    }/>*/}
            {/*</div>*/}

            <div className={`${Board.board} board_list`}>
                <div className={Board.board_head}>
                    <form>
                        <div className={Board.board_head_group}>
                            {/*<input type="text" className="inp date entered" placeholder="날짜 선택" value="최근 30일"/>*/}
                            {/*/!*입력시 entered 추가-->*!/*/}
                            {/*<button type="button" className="btn_all">전체 보기</button>*/}
                            {/*<button onClick={openBulkUploadModal} type="button"*/}
                            {/*        className={`btn_blue ${cmc(Board.btn, Board.btn_medium)}`}>데이터 추가*/}
                            {/*</button>*/}
                        </div>
                        <div className={Board.board_head_group}>
                            <div className={Board.board_count}>
                            <span className={Board.count_text}>전체 <em className={Board.em}>{totalCount}</em>건</span>
                                <span className={Board.count_text}><em className={Board.em}>{items ? items.length : 0}</em>건</span>
                            </div>

                            <div className={Board.board_search}>
                                <input className={Board.input} type="search" value={keywowrd} onChange={e=>{
                                    setKeyword(e.target.value)
                                }} title="검색" id="board_search"
                                       placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button className={Board.button} type="submit">검색</button>
                            </div>

                        </div>
                    </form>
                </div>

                <BoardTable style={{
                    width: '1400px'
                }}>
                    <Bthead>
                        {/*<Bth className="ta_c" checkbox></Bth>*/}
                        <Bth>No.</Bth>
                        <Bth>매장명</Bth>
                        <Bth>대표 아이디</Bth>
                        <Bth>대표명</Bth>
                        <Bth>사업자번호</Bth>
                        <Bth>주소</Bth>
                        <Bth>연락처</Bth>
                        <Bth>총 실적</Bth>
                        <Bth>마지막 판매일보</Bth>
                        <Bth>가입일</Bth>
                        <Bth>관리</Bth>
                    </Bthead>
                    <Btbody br>
                        {
                            items && items.map((v,i)=> {
                                return <tr className={Board.tr} key={i}>
                                    {/*<Btd checkbox/>*/}
                                    <Btd>{i+1}</Btd>
                                    <Btd>{v.shop_nm}</Btd>
                                    <Btd>{v.id}</Btd>
                                    <ProfileTableColumn name={v.reps_nm} src={profileImages ? profileImages[i] : profileImg1}/>
                                    <Btd>{v.br_no}</Btd>
                                    <Btd>{v.shop_addr}</Btd>
                                    <Btd>{v.shop_tel}</Btd>
                                    <Btd>{NumberUtils.toPrice(v.total_cms)}원</Btd>
                                    <Btd>{v.last_sale_dt}</Btd>
                                    <Btd>{v.regi_dt}</Btd>
                                    <Btd className="ta_c">
                                        <a href="#" className="btn btn_grey btn_small btn_line">관리</a>
                                    </Btd>
                                </tr>
                            })
                        }
                    </Btbody>
                </BoardTable>
                {/*<BoardTableSelector tab={tab} items={items}/>*/}
            </div>
        </div>
    )
}

function BoardTableSelector({tab, items}){
    switch (tab){
        case 0:
            return <DeviceTable data={items}/>
        case 1:
            return <CtPlanTable data={items}/>
        case 2:
            return <InternetPlanTable data={items}/>
        case 3:
            return <TvPlanTable data={items}/>
        case 4:
            return <ExsvcTable data={items}/>
    }
    return null
}