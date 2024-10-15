import {cm, cmc} from "../../utils/cm";
import Board from "../../../css/board.module.css";

export function BoardTable({caption, colgroup, children, tableRef, style, onScroll}){
    return (
        <div className={`board_body ${Board.sticky}`} style={style} onScroll={onScroll}>
            <table className={Board.td_board} ref={tableRef}>
                <caption>{caption}</caption>
                <colgroup>
                    {colgroup}
                </colgroup>
                {children}
            </table>
        </div>
    )
}

// 보드 테이블 헤더 (thead)
export function Bthead({children}){
    return (
        <thead className={Board.thead}>
            <tr>
                {children}
            </tr>
        </thead>
    )
}

export function Btbody({br, children}){
    return (
        <tbody className={`${Board.tbody} ${!br && Board.br_none}`}>
        {children}
        </tbody>
    )
}

export function Bth({children, className, checked, checkbox, name, sort, onClick, onCheck, onMouseDown}){
    return (
        <th className={`${cm(Board.th)} ${className} ${(sort && !checkbox) && Board.sort} ${checkbox && 'ta_c'}`} scope='col' onClick={onClick}>
            {
                checkbox && (
                    <div className={cmc(Board.check_box)}>
                        <input type="checkbox" id={name}checked={checked} readOnly/>
                        <label htmlFor={name} className={cm(Board.label)} onClick={onCheck}>선택</label>
                    </div>
                )
            }
            {children}
            <div className={Board.resize_handle} onMouseDown={onMouseDown}></div>
        </th>
    )
}

export function Btd({children, className, stopPropagation, checkbox, onCheck, checked, name}) {
    return (
        <td className={`${Board.td} ${checkbox && 'ta_c'} ${className ? className : ''}`}  onClick={e=>{
            if(checkbox || stopPropagation)
            e.stopPropagation();
        }}>
            {
                checkbox && (
                    <div className={cmc(Board.check_box)}>
                        <input type="checkbox" id={name} className={cm(Board.input)} checked={checked} readOnly/>
                        <label htmlFor={name} className={cm(Board.label)} onClick={onCheck}>선택</label>
                    </div>
                )
            }
            {children}
        </td>
    )
}
