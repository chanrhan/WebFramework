import {BoardTable} from "../board/BoardTable";
import Board from "../../../css/board.module.css"
import {cm, cmc} from "../../utils/cm";
import profileImg1 from "../../../images/profile_img1.jpg"
import {PromiseOptionItem} from "./module/PromiseOptionItem";
import {useEffect, useState} from "react";
import useApi from "../../hook/useApi";
import {useObjectArrayInputField} from "../../hook/useObjectArrayInputField";
import {ObjectUtils} from "../../utils/objectUtil";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";

export function PromiseBoardTable({onLoad, items, onChangeState, onSelectSale}){
    return (
        <div className='board_body'>
            <div className={Board.promise}>
                <form>
                    <ul className={Board.promise_list}>
                        {
                            items && items.map((v,i)=>{
                                return <PromiseItem onLoad={onLoad} key={i} onClick={()=>{
                                    onSelectSale(v.sale_id)
                                }} item={v} onUpdate={onChangeState}/>
                            })
                        }
                    </ul>
                </form>
            </div>

            {/*<div className="view_more">*/}
            {/*    <button type="button" className="view_more_btn">더 보기</button>*/}
            {/*</div>*/}
        </div>
    )
}

function PromiseItem({onLoad, item, onUpdate, onClick}){
    const {saleApi} = useApi()
    const modal = useModal()
    const [content, setContent] = useState('')

    const add = async ()=>{
        if(ObjectUtils.isEmpty(content)){
            return;
        }
        await saleApi.addPromiseContent({
            sale_id: item.sale_id,
            content: content
        }).then(({status,data})=>{
            console.log(`${status} ${data}`)
            if(status === 200 && data){
                // modal.openModal(ModalType.SNACKBAR.Info, {
                //     msg: '추가되었습니다.'
                // })
                setContent('')
                onLoad();
            }
        })

    }

    return (
        <li className={Board.promise_item} onClick={onClick}>
            <div className="promise_box">
                <div className={Board.promise_profile}>
                    <div className={cm(Board.profile_img, Board.div)}>
                        {/*<img className={Board.img} src={img} alt="프로필 이미지"/>*/}
                    </div>
                    <div className={cm(Board.profile_text, Board.div)}>
                        <div className={Board.profile_name}>{item.cust_nm}<span className={Board.span}>{item.cust_cd}</span></div>
                        <ul className={Board.profile_info}>
                            <li className={Board.li}><span className={Board.span}>개통일</span>{item.actv_dt}</li>
                            <li className={Board.li}><span className={Board.span}>연락처</span>{item.cust_tel}</li>
                        </ul>
                    </div>
                </div>
                <div className={Board.promise_option} onClick={e=>{
                    e.stopPropagation()
                }}>
                    <div className={Board.option_scroll}>
                        <ul className="option_list">
                            {
                                item.pm_list && item.pm_list.map((v,i)=> {
                                    return <li key={i} className={Board.option_item} draggable={true}>
                                        <div className={cmc(Board.radio_box)}>
                                            <input type="checkbox" name="radio" id={`pr_${i}`} checked={v.checked       } disabled={v.checked}/>
                                            <label htmlFor={`pr_${i}`} className={Board.form_label}
                                                   onClick={() => {
                                                       onUpdate({
                                                           sale_id: item.sale_id,
                                                           state: (v.checked) ? 0 : 1,
                                                           pm_id: v.pm_id
                                                   })
                                                   }}>{v.content}</label>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className={Board.option_add}>
                        <button type="button" onClick={add} className={Board.add_btn}>추가</button>
                        <input type="text" className={cm(Board.inp)} value={content} onChange={e=>{
                            setContent(e.target.value)
                        }} placeholder="단계 추가"/>
                    </div>
                </div>
                <button type="button" className={`btn_blue ${cm(Board.btn, Board.btn_medium, Board.btn_promise)}`}>완료</button>
            </div>
        </li>
    )
}