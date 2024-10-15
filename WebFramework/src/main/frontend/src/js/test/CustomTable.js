import {useEffect, useState} from "react";
import * as XLSX from "xlsx";
import useModal from "../hook/useModal";
import DEFAULT_HEADERS from "./DEFAULT_HEADERS";
import {SAMPLE_PHONE_MODEL} from "./SAMPLE_DATA";
import {ModalType} from "../common/modal/ModalType";


const SAMPLE_SALE = [
    [
        'chan',
        '01045240636',
        'male',
        '001104',
        '아이폰 12'
    ],
    [
        'jun',
        '01077280636',
        'male',
        '990223',
        '아이폰 12 pro'
    ]
]

function CustomTable({}){
    const modal = useModal();
    const [header, setHeader] = useState(new Array(DEFAULT_HEADERS.length()).fill('empty'))
    const [data, setData] = useState(Array(20).fill(Array(DEFAULT_HEADERS.length()).fill(null)))
    const [currDrag, setCurrDrag] = useState(null)

    const [selectedCell, setSelectedCell] = useState({
        row: 0,
        col: 0
    })

    const handleCellClick = (r, c)=>{
        setSelectedCell({row: r, col: c})
    }

    // 테이블에 붙여넣기 시 호출
    const handlePaste = e=>{
        e.preventDefault(); // 기본 붙여넣기 방지
        if(selectedCell){
            const clipboardData = e.clipboardData || window.clipboardData; // 클립보드에 복사된 데이터 가져오기
            const pastedText = clipboardData.getData('text');
            const rows = pastedText.split('\n').map(row=>row.trim().split('\t')) // 개행문자와 공백을 기준으로 테이블 형식에 맞게 데이터 변환

            handleInputTable(rows)
        }
    }

    // 테이블에 json형식의 table 데이터를 통째로 입력하는 함수
    const handleInputTable = (table)=>{
        const {row: startRow, col: startCol} = selectedCell;
        // console.table(table)
        setData(prev=>{
            const newData = [...prev];
            const maxColumnSize = Math.max.apply(null, table.map(v=>v.length));

            // 붙여넣기한 데이터가 현재 테이블의 행과 열 수를 넘어갈 경우 행, 열 맞춤 추가
            for(let i=0; i<startRow;++i){
                newData[i] = [...prev[i], ...Array(maxColumnSize - prev[i].length + startCol).fill(null)];
            }

            table.forEach((row,rowIdx)=>{
                const currRow = startRow+rowIdx;
                if(!newData[currRow]){ // 기존 테이블에 해당 행이 없다면, 새로 행을 추가
                    newData[currRow] = new Array(startCol + maxColumnSize).fill(null);
                }else{
                    newData[currRow] = [...prev[currRow], ...Array(maxColumnSize - prev[currRow].length + startCol).fill(null)];
                    // 2차원 배열은 결국 배열을 가지고 있는 배열, 즉 배열이 있는 주소들을 모아놓은 데이터이다.
                    // useState를 통한 상태변화를 사용하려면 변수의 주소값을 바꿔야 한다.
                    // 따라서 해당 행의 배열도 주소가 아닌 값의 형태로 복사해야 한다 (깊은 복사)
                }
                row.forEach((col, colIdx)=>{
                    const currCol = startCol+colIdx;
                    newData[currRow][currCol]= col; // 알맞은 열에 데이터 입력
                })
            })
            setHeader(prev=>{
                if(startRow + maxColumnSize < prev.length){
                    const forward = prev.slice(0, (startRow >= prev.length) ? prev.length -1 : startRow);
                    const backward = prev.slice(startRow, (startRow + maxColumnSize >= prev.length) ? prev.length -1 : startRow + maxColumnSize);
                    return [...forward, ...(new Array(maxColumnSize).fill('empty')) , ...backward]
                }
                return new Array(maxColumnSize).fill('empty');
            })

            return newData;
        });

    }

    // 테이블의 단일 셀의 값을 변경하는 함수
    const handleInputData = (e,i,j)=>{
        const copy = [...data];
        copy[i] = [...data[i]];
        copy[i][j] = e.target.value;
        setData(copy)
    }

    // 시트 파일을 jsonData(=table)로 변환하는 함수
    const handleUploadSheet = async (e)=> {
        const acceptFiles = e.target.files;
        if (acceptFiles.length > 0) {
            const file = acceptFiles[0];

            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {
                    type: 'array',
                    bookVBA: true,
                    // raw: true
                })

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                // console.table(sheet)
                // const jsonData = XLSX.utils.sheet_to_json(sheet);
                const jsonData = [];


                // 불러온 데이터를 행, 열에 맞추기 위해 공백도 빠짐없이 불러온다
                for(let cellAddress in sheet){
                    if(cellAddress[0] === '!'){
                        continue;
                    }
                    const cell = sheet[cellAddress];
                    if(cell.v !== undefined && cell.v !== null && cell.v !== ''){
                        // const d = XLSX.utils.decode_cell(cellAddress);
                        // console.table(d)
                        const {c, r} = XLSX.utils.decode_cell(cellAddress);
                        // console.log(`col: ${c}, row: ${r}`)
                        if(!jsonData[r]){
                            jsonData[r] = [];
                        }
                        jsonData[r][c] = cell.v;
                    }
                }

                handleInputTable(jsonData)
            }

            reader.readAsArrayBuffer(file);
        }
    }


    // 테이블 헤더를 클릭 시 헤더 변경 창 띄우기
    const handleClickHeader = (e, headerIndex)=>{
        const prevHeaderType = header[headerIndex];
        modal.openModal(ModalType.MENU.Select_Table_Header, {
            e, // 마우스 위치를 참조하기 위해 필요
            val: prevHeaderType, // 현재 헤더의 정보(key)
            onSelect: (selected)=>{ // 헤더 변경 시 호출
                // console.log(`select: ${selected}`)
                const copy= [...header];

                // 헤더의 이름은 중복되지 않아야 하기 때문에 변경된 헤더의 값이 이미 존재하다면, 이전 값을 empty로 변경한다
                // empty, 즉 '선택없음'의 경우 여러 개가 존재할 수 있기 때문에 empty가 아닌 경우만 실행하도록 한다
                if(selected !== 'empty'){
                    for(let i=0;i<copy.length;++i){
                        if(copy[i] === selected){
                            copy[i] = 'empty';
                            break;
                        }
                    }
                }
                copy[headerIndex]= selected;
                setHeader(copy);
                modal.closeModal(ModalType.MENU.Select_Table_Header);
                validateTable(headerIndex, selected, prevHeaderType);
            }
        });
    }

    const validateTable = (headerIndex, currHeaderType, prevHeaderType)=>{
        if(currHeaderType === 'empty'){
            return;
        }
        const cols = data.map(row=>row[headerIndex]);
        const fails = new Array(0);
        // console.table(cols)

        switch (currHeaderType){
            case 'cust_nm':
                break;
            case 'cust_gd':
                cols.map((col, index)=>{
                    if(col !== '남' && col !== '여' && col !== '법인'){
                        fails.push(index);
                    }
                })
                break;
            case 'cust_tel':
                cols.map((col,index)=>{
                    if(!/^(0[0-9]{2,3})?[0-9]{3,4}[0-9]{3,4}$/.test(col)){
                        fails.push(index)
                    }
                })
                break;
            case 'cust_cd':
                cols.map((col,index)=>{
                    if(!/^[0-9]{7,11}$/.test(col)){
                        fails.push(index)
                    }
                })
                break;
            case 'ph_md':
                for(let i=0;i<cols.length;++i){
                    fails.push(i);
                }
                break;
            case 'sec_md':
                break;
        }

        if(fails.length > 0){
            modal.openModal(ModalType.LAYER.Table_Validation, {
                headerInex: headerIndex,
                headerType: currHeaderType,
                data: cols,
                fails,
                onCancel: ()=>{
                    setHeader(prev=>{
                        const copy = [...prev];
                        copy[headerIndex] = prevHeaderType
                        return copy;
                    })
                },
                onConfirm: (modifyData = {})=>{
                    // console.table(modifyData)
                    setData(prev=>{
                        const copy = [...prev]
                        for(const key in modifyData){
                            copy[key][headerIndex] = modifyData[key];
                        }
                        return copy;
                    })
                }
            })
        }
    }


    return (
        <div className='mt-3'>
            <div>
                <input type="file" accept=".xlsx, .xls, .csv, .numbers" onChange={handleUploadSheet}/>
            </div>
            <table className='table'>
                <thead>
                <tr>
                    {
                        header && header.map(((h, i) => {
                            return <th onClick={(e)=>{
                                handleClickHeader(e, i)
                            }}>{DEFAULT_HEADERS.get(h)}</th>
                        }))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    data && data.map((r, rowIdx) => {
                        return <tr key={rowIdx}>
                            {
                                r.map((c, colIdx) => {
                                    return <td key={colIdx} onFocus={() => {
                                        handleCellClick(rowIdx, colIdx)
                                    }} onPaste={handlePaste}
                                               style={{
                                                   cursor: 'pointer',
                                                   background: selectedCell && selectedCell.row === rowIdx && selectedCell.col === colIdx ? 'lightblue' : 'white'
                                               }}>
                                        <ValueSelector type={header[colIdx]} col={c} rowIndex={rowIdx} colIndex={colIdx} handleInput={handleInputData}/>
                                        </td>
                                })
                            }
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>

    )
}

function ValueSelector({type, col, rowIndex, colIndex, handleInput}){

    switch (type) {
        case 'ph_md':
            // console.log(`col: ${col}, v: ${SAMPLE_PHONE_MODEL[col]}`)
            return <select className='form-select-sm' value={col} onChange={e=>{
                handleInput(e, rowIndex, colIndex);
            }}>
                {
                    Object.entries(SAMPLE_PHONE_MODEL).map(([key,value])=>{
                        return <option value={key}>{value}</option>
                    })
                }
            </select>
        default:
            return <input
                value={col}
                onChange={(e) => {
                    handleInput(e, rowIndex, colIndex)
                }}/>
    }
}

export default CustomTable;