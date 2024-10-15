import {LayerModal} from "../../common/modal/LayerModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import Popup from "../../../css/popup.module.css";
import {useEffect, useState} from "react";
import * as XLSX from "xlsx";
import {cm, cmc} from "../../utils/cm";
import {TabList} from "../../common/module/TabList";
import {ObjectUtils} from "../../utils/objectUtil";
import useApi from "../../hook/useApi";
import {LMD} from "../../common/LMD";

const HEADERS = [
    ['기기명','모델명'], // device
    ['기기명','모델명'], // sec device
    ['무선 요금제명'], // plan
    ['인터넷 요금제명'], // plan
    ['TV 요금제명'], // plan
    ['부가서비스명'], // plan
    ['지원명'], // plan
    ['추기명'], // plan
    ['결합명'], // plan
]

const displayProvider = [
    0,0,1,1,1,1,0,0,0
]


export function BulkUploadModal(props){
    const {gmdApi} = useApi();
    const modal = useModal()
    // const [header, setHeader] = useState(new Array(DEFAULT_HEADERS.length()).fill('empty'))
    const [dataType, setDataType] = useState(props.type ?? 0)
    const [provider, setProvider] = useState(0)

    const [data, setData] = useState(Array(20).fill(Array(HEADERS[dataType].length).fill(null)))

    // useEffect(() => {
    //     console.table(data)
    // }, [data]);

    // useEffect(() => {
    //     setData(Array(20).fill(Array(HEADERS[dataType].length).fill(null)))
    // }, [dataType]);

    const submit = async ()=>{
        let res = null;
        const body = data.map((v,i)=>{
            return {
                provider: provider,
                name: v[0],
                code: v[1],
            }
        }).filter(v=>{
            if(dataType < 2){
                return v.name && v.code
            }
            return v.name
        })

        if(ObjectUtils.isEmptyArray(body)){
            return;
        }
        await gmdApi.insertAll(dataType, body).then(({status,data})=>{
            if(status === 200 && data){
                setData(Array(20).fill(Array(HEADERS[dataType].length).fill('')))
                modal.openModal(ModalType.SNACKBAR.Info, {
                    msg: '추가되었습니다'
                })
            }
        })
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Bulk_Upload)
    }

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

            handleInputTable(rows, selectedCell)
        }
    }

    // 테이블에 json형식의 table 데이터를 통째로 입력하는 함수
    const handleInputTable = (table, startPoint={
        row: 0,
        col: 0
    })=>{
        if(ObjectUtils.isEmpty(startPoint)){
            return;
        }
        const {row: startRow, col: startCol} = startPoint;
        // console.table(table)
        setData(prev=>{
            const newData = [...prev];

            table.forEach((row,rowIdx)=>{
                const currRow = startRow+rowIdx;
                if(!newData[currRow]){ // 기존 테이블에 해당 행이 없다면, 새로 행을 추가
                    newData[currRow] = new Array(HEADERS[dataType].length).fill(null);
                }else{
                    // newData[currRow] = [...prev[currRow], ...Array(maxColumnSize - prev[currRow].length + startCol).fill(null)];
                    newData[currRow] = [...prev[currRow]];
                    // 2차원 배열은 결국 배열을 가지고 있는 배열, 즉 배열이 있는 주소들을 모아놓은 데이터이다.
                    // useState를 통한 상태변화를 사용하려면 변수의 주소값을 바꿔야 한다.
                    // 따라서 해당 행의 배열도 주소가 아닌 값의 형태로 복사해야 한다 (깊은 복사)
                }
                row.forEach((col, colIdx)=>{
                    const currCol = startCol+colIdx;
                    if(currCol < HEADERS[dataType].length){
                        newData[currRow][currCol]= col; // 알맞은 열에 데이터 입력
                    }
                })
            })

            return newData;
        });

    }

    // 테이블의 단일 셀의 값을 변경하는 함수
    const handleChange = (e,i,j)=>{
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

    return (
        <LayerModal maxWidth={1060} top={-45}>
            <div className={Popup.popup_title}>데이터 추가</div>
            <div className={Popup.bulk_upload_box}>
                <div className={Popup.bulk_upload_header_group}>
                    <input type="file" accept=".xlsx, .xls, .csv, .numbers" onChange={handleUploadSheet}/>
                    <div className={Popup.bulk_upload_tab}>
                        <TabList value={dataType} onChange={setDataType} theme={Popup}
                                 values={['디바이스', '세컨디바이스', '무선요금제', '인터넷 요금제', 'TV 요금제','부가서비스','지원구분','추가구분','결합유형']}/>
                    </div>
                </div>
                <div>
                    <div className={cmc(Popup.tab, Popup.type2)}>
                        {
                            displayProvider[dataType] ? <TabList name='provider' value={provider} onChange={setProvider} theme={Popup} values={
                                LMD.provier
                            }/> : null
                        }

                    </div>
                    <table className={Popup.bulk_upload_table}>
                        <thead className={Popup.thead}>
                        <tr className={Popup.tr}>
                            {
                                HEADERS[dataType].map(((h, i) => {
                                    return <th className={Popup.th}>{HEADERS[dataType][i]}</th>
                                }))
                            }
                        </tr>
                        </thead>
                        <tbody className={Popup.tbody}>
                        {
                            data && data.map((r, rowIdx) => {
                                return <tr key={rowIdx} className={Popup.tr}>
                                    {
                                        r.map((c, colIdx) => {
                                            if (colIdx >= HEADERS[dataType].length) {
                                                return null;
                                            }
                                            return <td onClick={e => {
                                                e.stopPropagation()
                                            }}
                                                       className={cm(Popup.td, `${selectedCell && selectedCell.row === rowIdx && selectedCell.col === colIdx && Popup.active}`)}
                                                       key={colIdx} onPaste={handlePaste}>
                                                <input className={Popup.input} type="text" value={c} onChange={e => {
                                                    handleChange(e, rowIdx, colIdx)
                                                }} onFocus={() => {
                                                    handleCellClick(rowIdx, colIdx)
                                                }}/>
                                            </td>
                                        })
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={Popup.popup_btn_box}>
                <button type="button" className={`btn_blue ${cmc(Popup.btn)}`}
                        onClick={submit}>저장
                </button>
            </div>
            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}