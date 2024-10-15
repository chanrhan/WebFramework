import {cm, cmc} from "../../../utils/cm";
import Board from "../../../../css/board.module.css";
import {LMD} from "../../../common/LMD";
import {useEffect, useRef, useState} from "react";
import {useRenderlessModal} from "../../../hook/useRenderlessModal";

export function ColumnSelectLayer({columns}){
    const renderlessModal = useRenderlessModal(`RDL_COLUMNSELECT_${Date.now()}`)
    const [keyword, setKeyword] = useState('')

    return (
        <>
            <button type="button" className={cm(Board.board_btn, Board.board_filter)}
                    onClick={renderlessModal.clickToOpen}>
                컬럼 선택
            </button>
            <div className={cm(Board.filter_layer, `${renderlessModal.active && Board.active}`)} ref={renderlessModal.ref}>
                {/*활성화시 active 추가 -->*/}
                <input type="text" className={`${cmc(Board.inp)} ${cm(Board.filter_inp)}`} value={keyword}
                       onChange={e=>{
                           setKeyword(e.target.value)
                       }}
                       placeholder="검색"/>
                <div className={Board.filter_scroll}>
                    <ul className='filter_list'>
                        {
                            LMD.sale_column_names.map((v, i) => {
                                if (!v.includes(keyword)) {
                                    return null;
                                }
                                return <li key={i} className={cm(Board.filter_item)}>
                                    <div className={cmc(Board.check_box)}>
                                        <input type="checkbox" id={`filter_${i}`} checked={columns.get(i)} readOnly/>
                                        <label className={Board.label} htmlFor={`filter_${i}`}
                                               onClick={() => {
                                                   columns.toggle(i)
                                               }}>{v}</label>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}