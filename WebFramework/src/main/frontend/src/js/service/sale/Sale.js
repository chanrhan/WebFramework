import Board from "../../../css/board.module.css"
import Layout from "../../../css/layout.module.css"
import {cm, cmc} from "../../utils/cm";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../board/BoardTable";
import {useEffect, useRef, useState} from "react";
import useApi from "../../hook/useApi";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import {useSelector} from "react-redux";
import {MonthSelectModal} from "../../common/modal/menu/MonthSelectModal";
import {DateUtils} from "../../utils/DateUtils";
import {MoreOptionLayer} from "../../common/module/MoreOptionLayer";
import {SelectItem} from "../../common/module/SelectLayer";
import {useFileLoader} from "../../hook/useFileLoader";
import {LMD} from "../../common/LMD";
import {useBitArray} from "../../hook/useBitArray";
import {ColumnSelectLayer} from "./module/ColumnSelectLayer";
import {NumberUtils} from "../../utils/NumberUtils";
import {ProfileTableColumn} from "./module/ProfileTableColumn";
import {FILTER_INPUT_TYPE} from "./modal/SaleFilterModal";
import {useObjectInputField} from "../../hook/useObjectInputField";
import {ScrollUtils} from "../../utils/ScrollUtils";
import {useObjectArrayInputField} from "../../hook/useObjectArrayInputField";

const COLUMNS_SORT = [
    false,true,false,false,false,true,true,true
]

const COLUMN_MAX_SIZE = Math.pow(2, (LMD.sale_column_vars.length))-1;

const INIT_LIMIT = 30;

export function Sale(){
    const modal = useModal();
    const {saleApi} = useApi();
    const inputField = useObjectInputField({
        order: 1,
        // limit: 30
    });

    const [limit, setLimit ] = useState(INIT_LIMIT)

    const filterInputField = useObjectArrayInputField()

    const fileLoader = useFileLoader();
    const [totalCount, setTotalCount] = useState(0)
    const [asc, setAsc] = useState(new Array(10).fill(false))

    const user = useSelector(state=>state.userReducer)

    const [saleItems, setSaleItems] = useState(null)
    const [allChecked, setAllChecked] = useState(false)
    const [checkedSale, setCheckedSale] = useState([])

    const [profileImages, setProfileImages] = useState([])

    const columns = useBitArray(COLUMN_MAX_SIZE);

    const tableRef = useRef()

    const [prevScrollY, setPrevScrollY] = useState(null)

    useEffect(() => {
       setPrevScrollY( ScrollUtils.preventScroll(document.body))
        return ()=>{
            ScrollUtils.allowScroll(document.body, prevScrollY)
        }
    }, []);

    const getSale = async (limit)=>{
        // console.table(inputField.input)
        // return;
        await saleApi.getSaleAll({
            ...inputField.input,
            limit: limit ?? 30,
            filters: filterInputField.input
        }).then(async ({status,data})=>{
            if(status === 200 && data){
                // console.log(data)
                if(data.total_cnt){
                    setTotalCount(data.total_cnt)
                }else{
                    setTotalCount(0)
                }

                if(data.list){
                    const parsed = JSON.parse(data.list)
                    // console.table(parsed)
                    setSaleItems(parsed)
                    setCheckedSale(new Array(parsed.length).fill(false))

                    getProfimeImages(parsed).then((data)=>{
                        if(data){
                            setProfileImages(data)
                        }
                    })
                }else{
                    setSaleItems(null)
                    setCheckedSale(null)
                    setProfileImages(null)
                }

            }
        })
    }

    const getProfimeImages = async (list)=>{
        if(list){
            const copy = new Array(list.length)
            for(let i=0;i<list.length; ++i){
               await fileLoader.pfp(list[i].seller_pfp).then(d=>{
                    copy[i] = d;
                })
            }
            return copy;
        }
        return null;
    }


    useEffect(() => {
        getSale(INIT_LIMIT);
        setLimit(INIT_LIMIT)
        if(tableRef.current){
            tableRef.current.scrollTop = 200;
            console.table(tableRef.current.scrollTop)
        }
        // getSaleTotalCount()
    }, [inputField.input, filterInputField.input]);

    // const getSaleCount = ()=>{
    //     return saleItems ? saleItems.length : 0;
    //

    const addSale = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Detail, {
            user: user,
            onSubmit: refresh
        });
    }

    const openSaleDetail = (saleId)=>{
        modal.openModal(ModalType.LAYER.Sale_Detail, {
            sale_id: saleId,
            user: user,
            onSubmit: refresh
        });
    }

    const setMonth = (year, month)=>{
        inputField.put('keydate',DateUtils.formatYYMM(year,month))
    }

    const search = async ()=>{
        await getSale();
    }

    const refresh = async()=>{
        // console.log('refresh')
        inputField.clearOf({
            order: 1
        })
        columns.setAll(COLUMN_MAX_SIZE)
        filterInputField.clear()
    }

    const setOrder = async (idx)=>{
        inputField.put('order',idx);
        const nextAsc = !asc[idx];
        // console.log(`asc: ${nextAsc ? 1 : 0}`)
        inputField.put('asc',nextAsc);

        const copy = [...asc]
        copy[idx] = nextAsc
        setAsc(copy)
    }

    const checkAll = ()=>{
        setCheckedSale(new Array(checkedSale.length).fill(!allChecked))
        setAllChecked(!allChecked)
    }

    const checkSale = index=>{
        const copy = [...checkedSale]
        copy[index] = !copy[index]
        setCheckedSale(copy)
    }

    const deleteSale = async ()=>{
        const body = checkedSale.map((v,i)=>{
            if(v){
                return saleItems[i].sale_id;
            }
        }).filter(v=>v);

        if(body && body.length > 0){
            await saleApi.deleteSales(body).then(({status,data})=>{
                if(status === 200 && data){
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: '판매일보가 삭제되었습니다.'
                    })
                    getSale();
                    // getSaleTotalCount()
                }
            })
        }
    }

    const openFilterModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Filter, {
            // top: '220px',
            data: filterInputField.input,
            onSubmit: (data)=>{
                // console.table(data)
                filterInputField.putAll(data)
                // inputField.put('filters', data);
            }
        })
    }

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

    const handleScroll = (e: UIEvent)=>{
        const target = e.target;

        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;

        if(scrollTop + clientHeight >= scrollHeight){
            // const scrollPos = scrollTop + clientHeight;
            const _limit = (limit ?? 0) + 30;
            getSale(_limit)
            setLimit(_limit)
        }
    }


    return (
        <div className={cm(Layout.sub)}>
            <div className={cm(Layout.sub_head)}>
                <h2 className={cm(Layout.sub_title)}>판매일보</h2>
            </div>

            <div className={cm(Board.board, "board_list")}>
                <div className={cm(Board.board_head)}>
                    <form>
                        <div className={cm(Board.board_head_group)}>
                            <MonthSelectModal onSelect={setMonth}>
                                <input type="text" className="inp date" value={inputField.get('keydate')}
                                       placeholder="날짜 선택"
                                       readOnly/>
                            </MonthSelectModal>
                            <button type="button" className="btn_all" onClick={refresh}>전체 보기</button>
                        </div>
                        <div className={cm(Board.board_head_group)}>
                            <div className={cm(Board.board_count)}>
                                <span className={cm(Board.count_text)}>전체 <em
                                    className={cm(Board.em)}>{totalCount}</em>건</span>
                                <span className={cm(Board.count_text)}><em
                                    className={cm(Board.em)}>{saleItems ? saleItems.length : 0}</em>건</span>
                            </div>

                            <button type="button"
                                    className={cm(Board.board_filter_btn, `${inputField.input.filters && Board.active}`)}
                                    onClick={openFilterModal}>필터
                            </button>

                            <div className={cm(Board.board_search)}>
                                <input type="search" name='keyword' onChange={inputField.handleInput}
                                       value={inputField.get('keyword')} className={cm(Board.input)}
                                       placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button type="button" className={cm(Board.button)} onClick={search}>검색</button>
                            </div>

                            <div className={cm(Board.board_btn_box)}>
                                <ColumnSelectLayer columns={columns}/>
                            </div>

                            <div className={`select_box ${cm(Board.board_btn_box)}`}>
                                <MoreOptionLayer cssModule={Board}>
                                    <SelectItem onClick={deleteSale}>판매일보 삭제</SelectItem>
                                    <SelectItem>검색 결과 다운로드</SelectItem>
                                </MoreOptionLayer>
                                {/*<button type="button" className={cm(Board.board_btn, Board.board_more)}>더보기</button>*/}
                            </div>

                            <button onClick={addSale} type="button"
                                    className={`btn_blue ${cmc(Board.btn, Board.btn_medium)}`}>판매일보 추가
                            </button>
                        </div>
                        {
                            filterInputField.input && filterInputField.length() > 0 && <div className={Board.board_head_filter}>
                                <button type="button" className={Board.board_filter_refresh}>필터 초기화</button>
                                <ul className={Board.board_filter_list}>
                                    {
                                        filterInputField.input && filterInputField.input.map((v, i) => {
                                            return <li>{LMD.filter_and[v.and]} {LMD.filter_type[v.type]}:{LMD.filter_option[v.option]}: <span>[{
                                                !FILTER_INPUT_TYPE[v.type] ? v.target : FILTER_INPUT_TYPE[v.type][v.target]
                                            }]</span>
                                                <button type="button" className={Board.board_filter_del} onClick={()=>{
                                                    filterInputField.removeItem(i)
                                                }}>삭제</button>
                                            </li>
                                        })
                                    }

                                </ul>
                            </div>
                        }

                    </form>
                </div>

                <BoardTable caption='판매일보 테이블 - 선택, 메인 구분, 개통날짜, 이름, 휴대폰 번호, 식별 번호, 모델명, 총 이익, 담당자, 예약 정보 제공'
                            colgroup={
                                <>
                                    {/*<col style={{width: "42px"}}/>*/}
                                    {/*<col span="8"/>*/}
                                    {/*<col style={{width: "90px"}}/>*/}
                                </>
                            } tableRef={tableRef} style={{
                                height: '620px'
                }} onScroll={handleScroll}>
                    <Bthead>
                        <Bth name='check_all' onCheck={checkAll} checked={allChecked} checkbox onMouseDown={e => {
                            resizeColumn(e, 0)
                        }}/>
                        {
                            columns && columns.toArray().map((v, i) => {
                                // const sort =
                                return <Bth key={i} name={LMD.sale_column_vars[v]} sort={COLUMNS_SORT[v]}
                                            onClick={()=>{
                                                if(COLUMNS_SORT[v]){
                                                    setOrder(v)
                                                }
                                            }} onMouseDown={e=>{
                                        resizeColumn(e, i+1)
                                }}>{LMD.sale_column_names[v]}</Bth>
                            })
                        }
                        <Bth>예약</Bth>
                    </Bthead>
                    <Btbody br>
                        {
                            saleItems && saleItems.map((v1, i) => {
                                // console.table(v1)
                                return <tr key={i} onClick={(e) => {
                                    openSaleDetail(v1.sale_id)
                                }}>
                                    <Btd name={`check${v1.sale_id}`} checked={checkedSale[i]} onCheck={(e) => {
                                        checkSale(i)
                                    }} checkbox/>
                                    {
                                        columns.toArray() && columns.toArray().map((v2, j)=>{
                                            return <TdChoice key={j} image={profileImages && profileImages[i]} column_index={v2} data={v1}/>
                                        })
                                    }
                                    <Btd className="ta_r" stopPropagation>
                                        <button type="button" className={`btn_grey btn_small btn_line ${cmc(Board.btn)}`}>예약 확인</button>
                                    </Btd>
                                </tr>
                            })
                        }
                    </Btbody>
                    {/*<Scrollable scrollable={!modal.hasModal()}>*/}
                    {/*</Scrollable>*/}
                </BoardTable>

                {/*<div className="view_more">*/}
                {/*    <button type="button" className="view_more_btn">더 보기</button>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

function TdChoice({column_index, data, image}){
    switch (column_index) {
        case 0:
            return <Btd>
                {
                    data.ct === 1 && <span className={`${Board.td_type} ${Board.blue}`}>무선</span>
                }
                {
                    data.wt === 1 && <span className={`${Board.td_type} ${Board.orange}`}>유선</span>
                }
                {
                    data.sd === 1 && <span className={`${Board.td_type} ${Board.pink}`}>세컨</span>
                }
            </Btd>
        case 1:
            return <Btd>{data.actv_dt}</Btd>
        case 2:
            return <Btd>
                <span className={cm(Board.td_num)}>1</span>{data.cust_nm}
            </Btd>
        case 3:
            return <Btd className="ta_c">{data.cust_tel}</Btd>;
        case 4:
            return <Btd className="ta_r">{data.cust_cd}</Btd>
        case 5:
            return <Btd className="ta_r">{data.device_nm}</Btd>;
        case 6:
            return <Btd className="ta_r">{NumberUtils.toPrice(data.total_cms)} 원</Btd>;
        case 7:
            return <ProfileTableColumn src={image} name={data.seller_nm}/>;
        // case 8:
        //     return
        // case 9:
        //     return null;
    }
}