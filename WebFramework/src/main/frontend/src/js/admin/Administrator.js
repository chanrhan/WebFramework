import Board from "../../css/board.module.css"
import Layout from "../../css/layout.module.css"
import {TabList} from "../common/module/TabList";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../service/board/BoardTable";
import useValidateInputField from "../hook/useValidateInputField";
import {useEffect, useState} from "react";
import {ProfileTableColumn} from "../service/sale/module/ProfileTableColumn";
import profileImg1 from "../../images/profile_img1.jpg";
import useApi from "../hook/useApi";
import {useObjectInputField} from "../hook/useObjectInputField";
import {LMD} from "../common/LMD";
import {cm, cmc} from "../utils/cm";
import {useNavigate} from "react-router-dom";
import {useFileLoader} from "../hook/useFileLoader";

export function Administrator(){
    const {userApi} = useApi();
    const inputField = useObjectInputField({
        user_st: 0,
        keyword: ''
    });
    const nav = useNavigate();
    const fileLoader = useFileLoader();

    const [totalCount, setTotalCount] = useState(0)
    const [items, setItems] = useState(null)

    const [profileImages, setProfileImages] = useState(null)

    useEffect(() => {
        getUserAll()
    }, [inputField.input]);

    const getUserAll = async ()=>{
        await userApi.getUserAll(inputField.input).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
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

    const refresh = ()=>{
        inputField.put('keyword','')
    }

    const changeState = async (id, shopId, state)=>{
        await userApi.updateApprovalState(id, shopId, state).then(({status,data})=>{
            if(status === 200 && data){
                getUserAll();
            }
        })
    }

    return (
        <div className={Layout.sub}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>관리자 페이지</h2>
                {/*<button type='button' className={cmc(Layout.sub_head_btn)} onClick={()=>{*/}
                {/*    nav('/admin/gmd')*/}
                {/*}}>동적 데이터 관리</button>*/}
            </div>


            <div className={Layout.sub_tab}>
                <TabList name='user_st' inputField={inputField} theme={Layout} values={
                    ['일반회원','휴면회원','탈퇴회원']
                }/>
            </div>

            <div className={`${Board.board} board_list`}>
                <div className={Board.board_head}>
                    <form>
                        <div className={Board.board_head_group}>
                            {/*<input type="text" className="inp date entered" placeholder="날짜 선택" value="최근 30일"/>*/}
                            {/*입력시 entered 추가-->*/}
                        </div>
                        <div className={Board.board_head_group}>
                            <button type="button" className="btn_all" onClick={refresh}>전체 보기</button>
                            <div className={Board.board_count}>
                                <span className={Board.count_text}>전체 <em className={Board.em}>{totalCount}</em>건</span>
                                <span className={Board.count_text}><em className={Board.em}>{items?.length ?? 0}</em>건</span>
                            </div>

                            <div className={Board.board_search}>
                                <input className={Board.input} type="search" title="검색"
                                       name='keyword'
                                       value={inputField.get('keyword')}
                                       onChange={inputField.handleInput}
                                       placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button className={Board.button} type="submit">검색</button>
                            </div>
                        </div>
                    </form>
                </div>

                <BoardTable>
                    <Bthead>
                        {/*<Bth className="ta_c" checkbox></Bth>*/}
                        <Bth>No</Bth>
                        <Bth>아이디</Bth>
                        <Bth>이름</Bth>
                        <Bth className="ta_c">소속 매장</Bth>
                        <Bth className="ta_c">직급</Bth>
                        <Bth className="ta_c">이메일</Bth>
                        <Bth className="ta_c">휴대폰 번호</Bth>
                        <Bth className="ta_c">사업자번호</Bth>
                        <Bth className="ta_c">가입일</Bth>
                        <Bth className="ta_c">최근 로그인</Bth>
                        <Bth className="ta_c">승인 여부</Bth>
                        <Bth className="ta_c">관리</Bth>
                    </Bthead>
                    <Btbody br>
                        {
                            items && items.map((v,i)=> {
                                const state = v.approval_st;

                                return <tr key={i} onClick={()=>{
                                    console.log(state)
                                }}>
                                    {/*<Btd checkbox/>*/}
                                    <Btd>{i+1}</Btd>
                                    <Btd className="ta_c">{v.id}</Btd>
                                    <ProfileTableColumn src={profileImages ? profileImages[i] : profileImg1} name={v.name}/>
                                    <Btd className="ta_c">{v.shop_nm}</Btd>
                                    <Btd className="ta_c">{LMD.role[v.role]}</Btd>
                                    <Btd className="ta_c">{v.email}</Btd>
                                    <Btd className="ta_c">{v.tel}</Btd>
                                    <Btd className="ta_c">{v.br_no}</Btd>
                                    <Btd className="ta_c">{v.regi_dt}</Btd>
                                    <Btd className="ta_c">{v.last_login_dt}</Btd>
                                    <Btd>
                                        {
                                            state === 0 ?
                                                (
                                                    v.role === 1 ? (
                                                        <>
                                                            <button type="button" className="btn btn_grey btn_small btn_line" onClick={()=>{
                                                                changeState(v.id, v.shop_id, 1);
                                                            }}>승인</button>
                                                            <button type="button" className="btn btn_red btn_small btn_line" onClick={()=>{
                                                                changeState(v.id, v.shop_id, 2);
                                                            }}>거절</button>
                                                        </>
                                                    ) : (
                                                        <button type="button" className={`btn btn_green btn_small btn_line`}>
                                                            승인대기중
                                                        </button>
                                                    )
                                                ) :
                                                <button type="button"
                                                        className={`btn ${state === 1 ? 'btn_blue' : 'btn_red'} btn_small btn_line`}>
                                                    {state === 1 ? '승인완료': (state === 2 ? '승인거절':'관리자')}
                                                </button>
                                        }

                                    </Btd>
                                    <Btd className="ta_c">
                                        <a href="#" className="btn btn_grey btn_small btn_line">관리</a>
                                    </Btd>
                                </tr>
                            })
                        }
                    </Btbody>
                </BoardTable>
            </div>
        </div>
    )
}