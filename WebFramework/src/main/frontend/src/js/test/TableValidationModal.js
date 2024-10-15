import useModal from "../hook/useModal";
import DEFAULT_HEADERS from "./DEFAULT_HEADERS";
import {useEffect, useState} from "react";
import {useMapper} from "../utils/useMapper";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import {ObjectUtils} from "../utils/objectUtil";
import {SAMPLE_PHONE_MODEL} from "./SAMPLE_DATA";
import {ModalType} from "../common/modal/ModalType";
import {LayerModal} from "../common/modal/LayerModal";

const GENDER = [
    '남',
    '여',
    '법인'
]

function TableValidationModal({headerIndex, headerType, data, fails= [], onCancel = null, onConfirm = null}){
    const mapper = useMapper(headerType);
    const types = mapper.types(headerType);

    const modal = useModal();
    const [defaultValue, setDefaultValue] = useState(0);
    const [result, setResult] = useState({

    })
    const [mappedFails, setMappedFails] = useState([])
    // { froms, to }

    useEffect(() => {
        validate();
        return ()=>{
            setResult({
            })
        }
    }, []);

    const validate = ()=>{
        const mapfail = [];
        setResult(prev=>{
            const copy = {...prev};
            fails.map(index=>{
                const mappedValue = mapper.matchMap(data[index]);
                // console.log(`mapped: ${matchedValue}`)
                if(mappedValue === null){
                    // copy['fail'].push(index)
                    mapfail.push(index)
                    return;
                }
                if(!copy[mappedValue]){
                    copy[mappedValue] = [];
                }
                if(!copy[mappedValue][data[index]]){
                    copy[mappedValue][data[index]] = [];
                }
                copy[mappedValue][data[index]].push(index);
            })
            // console.table(copy)
            return copy;
        });
        setMappedFails(mapfail);
    }

    const cancel = ()=>{
        if(onCancel !== null){
            onCancel();
        }
        modal.closeModal(ModalType.LAYER.Table_Validation)
    }

    const confirm = ()=>{
        if(onConfirm !== null){
            const modifyData = {}

            for(const mappedValue in result){
                for(const k in result[mappedValue]){
                    for(const i in result[mappedValue][k]){
                        // console.log(`i: ${i}, r: ${result[mappedValue][k][i]}`)
                        modifyData[result[mappedValue][k][i]] = mappedValue
                    }
                }
            }
            // console.table(modifyData)

            mappedFails.map(f=>{
                modifyData[f] = types[defaultValue];
            })
            onConfirm(modifyData);
        }
        modal.closeModal(ModalType.LAYER.Table_Validation)
    }

    return (
        <LayerModal>
            <div className='d-flex flex-column justify-content-center align-items-center scrollbar'>
                <div className='mt-5'>
                    <h1 className='mt-5 text-black'><b className='text-primary'>[{DEFAULT_HEADERS.get(headerType)}]</b> 에 대한 유효성 검사</h1>
                    <h2 className='mt-4 text-black'>데이터 유형과 일치하지 않는 값이 <b className='text-danger'>{fails.length}</b>개 발견되었습니다</h2>
                    <hr/>
                    <div className='mt-4'>
                        <h3 className='text-black'>임의로 변경한 데이터 <b className='text-danger'>{fails.length - mappedFails.length}</b>개</h3>
                        {
                            result && Object.keys(result).map(key => {
                                // if (key === 'fail') {
                                //     return null;
                                // }
                                const failResults = result[key];
                                // console.table(failResults)
                                let failCount = 0;
                                return <div className='d-flex flex-row align-items-center mt-4'>
                                    <div className='d-flex flex-row'>
                                        {
                                            failResults && Object.keys(failResults).map((val, index) => {
                                                failCount += failResults[val].length;
                                                if (index > 5) return;
                                                return <div className='d-flex flex-column align-items-center justify-content-center'>
                                                    <h6 className='text-danger'>{failResults[val].length}개</h6>
                                                    <h3 className='fail-value'>{val}</h3>
                                                </div>;
                                            })
                                        }
                                        {
                                            failResults.length > 5 ? <h3>...</h3> : null
                                        }
                                    </div>
                                    <h4 className='ms-4'>| <b className='text-danger'>{failCount}</b>개의 데이터</h4>
                                    <MdKeyboardDoubleArrowRight size='50px'/>
                                    <h3><b className='text-primary'><ValueSelector type={headerType} value={key}/></b></h3>

                                </div>
                            })
                        }
                    </div>
                    <hr/>
                    <div className='mt-5'>
                        {
                            result && (
                                mappedFails.length > 0 && (
                                    <>
                                        <h3 className='text-black'>변경하지 못한 데이터 <b className='text-danger'>{mappedFails.length}</b>개
                                        </h3>
                                        <h4>이 데이터들은 자동으로 <select className='text-success' value={defaultValue} onChange={e=>{
                                            console.log(types[e.target.value])
                                            setDefaultValue(e.target.value);
                                        }}>
                                            {
                                                types.map((type, index)=>{
                                                    return <option value={index}>{type}</option>
                                                })
                                            }
                                        </select>(으)로 초기화됩니다</h4>
                                    </>
                                )
                            )
                        }

                    </div>
                </div>
                <div className='d-flex flex-row align-items-center mt-3 mb-5'>
                    <button className='btn btn-danger' onClick={cancel}>취소</button>
                    <button className='btn btn-primary ms-2' onClick={confirm}>확인</button>
                </div>
            </div>
        </LayerModal>
    )
}

function ValueSelector({type, value}){
    // console.log(`type: ${type}`)
    switch (type){
        case 'ph_md':
            return SAMPLE_PHONE_MODEL[value];
        default:
            return value;
    }
}

export default TableValidationModal;