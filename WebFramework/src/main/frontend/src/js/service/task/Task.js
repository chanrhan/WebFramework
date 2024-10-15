import Board from "../../../css/board.module.css"
import Layout from "../../../css/layout.module.css"
import {cm} from "../../utils/cm";
import {TaskUsedDeviceBoardTable} from "./module/TaskUsedDeviceBoardTable";
import {PromiseBoardTable} from "./PromiseBoardTable";
import {TabList} from "../../common/module/TabList";
import {useObjectInputField} from "../../hook/useObjectInputField";
import useApi from "../../hook/useApi";
import {useEffect, useState} from "react";
import {TaskCardBoardTable} from "./module/TaskCardBoardTable";
import {TaskCombBoardTable} from "./module/TaskCombBoardTable";
import {TaskSupportBoardTable} from "./module/TaskSupportBoardTable";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import {useFileLoader} from "../../hook/useFileLoader";
import {useLocation} from "react-router-dom";

export function Task(){
    const modal = useModal();
    const fileLoader = useFileLoader();
    const {saleApi} = useApi();

    const pathname = window.location.pathname;
    let init_cat = 0;
    switch (pathname){
        case '/service/task/used-device':
            init_cat = 0;
            break
        case '/service/task/card':
            init_cat = 1;
            break
        case '/service/task/comb':
            init_cat = 2;
            break
        case '/service/task/support':
            init_cat = 3;
            break
        case '/service/task/promise':
            init_cat = 4;
            break
        default:
            break;
    }
    const [category, setCategory] = useState(init_cat)

    useEffect(() => {
        let moveUrl = 'used-device'
        switch (category){
            case 0:
                moveUrl = 'used-device'
                break
            case 1:
                moveUrl = 'card'
                break
            case 2:
                moveUrl = 'comb'
                break
            case 3:
                moveUrl = 'support'
                break
            case 4:
                moveUrl = 'promise'
            default:
                break;
        }
        window.history.pushState("",'test',`/service/task/${moveUrl}`)
    }, [category]);

    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0)
    const inputField = useObjectInputField({
        completed: false,
        keyword: '',
        order: null,
        asc: false
    });

    const [profileImages, setProfileImages] = useState(null)

    const [allChecked, setAllChecked] = useState(false)
    const [checkedSale, setCheckedSale] = useState([])

    useEffect(() => {
        getSaleByCategory()
        // getSaleTotalCountByCategory();
    }, [inputField.input]);

    useEffect(() => {
        refresh()
    }, [category]);

    const checkSale = index=>{
        const copy = [...checkedSale]
        copy[index] = !copy[index]
        setCheckedSale(copy)
    }

    const checkAll = ()=>{
        setCheckedSale(new Array(checkedSale.length).fill(!allChecked))
        setAllChecked(!allChecked)
    }

    const deleteSale = async ()=>{
        const body = checkedSale.map((v,i)=>{
            if(v){
                return items[i].sale_id;
            }
        }).filter(v=>v);

        if(body && body.length > 0){
            await saleApi.deleteSales(body).then(({status,data})=>{
                if(status === 200 && data){
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: '판매일보가 삭제되었습니다.'
                    })
                    getSaleByCategory();
                    // getSaleTotalCount()
                }
            })
        }
    }

    const getSaleByCategory = async ()=>{
        await saleApi.getSaleByCategory({
            category: category,
            ...inputField.input
        }).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                if(data.total_cnt){
                    setTotalCount(data.total_cnt)
                }else{
                    setTotalCount(0)
                }
                if(data.list){
                    const parsed = JSON.parse(data.list)
                    // console.table(parsed)
                    setItems(parsed)
                    setCheckedSale(new Array(parsed.length).fill(false))

                    getProfimeImages(parsed).then(data=>{
                        if(data){
                            setProfileImages(data)
                        }
                    })
                }else{
                    setItems([])
                    // setProfileImages(null)
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

    const refresh = ()=>{
        inputField.clearOf({
            completed: false,
            keyword: '',
            order: null,
            asc: false
        });
    }

    const onChangeState = async (body)=>{
        // console.log(`change state: ${saleId} | ${state}`)
        await saleApi.changeSaleState({
            category: category,
            ...body
        }).then(({status,data})=>{
            // console.log(`res: ${status} ${data}`)
            if(status === 200 && data){
                getSaleByCategory();
            }
        })
    }

    const openSaleDetailModal = (sale_id)=>{
        modal.openModal(ModalType.LAYER.Sale_Detail, {
            sale_id: sale_id,
            onSubmit: refresh
        })
    }

    return (
        <div className={Layout.sub}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>고객관리</h2>
            </div>

            <div className={Layout.sub_tab}>
                <TabList value={category} onChange={setCategory} theme={Layout} values={
                    ['중고폰','카드','결합','지원','고객약속']
                }/>
            </div>

            <div className={`${Board.board} board_list`}>
                <div className={Board.board_head}>
                    <form>
                        <div className={Board.board_head_group}>
                                <span className="switch">
                                    <input type="checkbox" name='not_done' className="switch_inp"
                                           checked={inputField.get('not_done')} readOnly/>
                                    <label htmlFor="not_done" onClick={()=>{
                                        inputField.put('not_done', !inputField.get('not_done'))
                                    }}><span>on/off</span></label>
                                </span>
                            <span className="switch_text">{inputField.get('not_done') === true ? '완료 고객 보기' : '미완료 고객 보기'}</span>
                            <button type="button" className="btn_all" onClick={refresh}>전체 보기</button>
                        </div>
                        <div className={Board.board_head_group}>
                        <div className={Board.board_count}>
                                <span className={Board.count_text}>전체 <em className={Board.em}>{totalCount}</em>건</span>
                                <span className={Board.count_text}><em className={Board.em}>{items.length}</em>건</span>
                            </div>

                            <div className={Board.board_search}>
                                <input type="search" className={Board.input} title="검색" name='keyword' onChange={inputField.handleInput}
                                       value={inputField.get('keyword')}
                                       placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button type="submit" className={Board.button}>검색</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="board_body">
                    <CategorySelector allChecked={allChecked}
                                      onLoad={getSaleByCategory}
                                      checkAll={checkAll}
                                      checkedSale={checkedSale}
                                      onCheck={checkSale}
                                      profileImages={profileImages}
                                      onSelectSale={openSaleDetailModal}
                                      category={category}
                                      items={items}
                                      onChangeState={onChangeState}/>
                    <div className="view_more">
                        <button type="button" className="view_more_btn">더 보기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CategorySelector({checkAll, allChecked, checkedSale, onCheck, onLoad, profileImages, category, items, onChangeState, onSelectSale}){
    switch (category){
        case 0:
            return <TaskUsedDeviceBoardTable checkAll={checkAll} allChecked={allChecked} checkedSale={checkedSale} onCheck={onCheck} profileImages={profileImages} onSelectSale={onSelectSale} items={items} onChangeState={onChangeState}/>
        case 1:
            return <TaskCardBoardTable checkAll={checkAll} allChecked={allChecked} checkedSale={checkedSale} onCheck={onCheck} profileImages={profileImages} onSelectSale={onSelectSale} items={items} onChangeState={onChangeState}/>
        case 2:
            return <TaskCombBoardTable checkAll={checkAll} allChecked={allChecked} checkedSale={checkedSale} onCheck={onCheck} profileImages={profileImages} onSelectSale={onSelectSale} items={items} onChangeState={onChangeState}/>
        case 3:
            return <TaskSupportBoardTable checkAll={checkAll} allChecked={allChecked} checkedSale={checkedSale} onCheck={onCheck} profileImages={profileImages} onSelectSale={onSelectSale} items={items} onChangeState={onChangeState}/>
        case 4:
            return <PromiseBoardTable onLoad={onLoad} checkAll={checkAll} allChecked={allChecked} checkedSale={checkedSale} onCheck={onCheck} onSelectSale={onSelectSale} items={items} onChangeState={onChangeState}/>
    }
    return null;
}