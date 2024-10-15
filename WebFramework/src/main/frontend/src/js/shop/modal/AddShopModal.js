import {LayerModal} from "../../common/modal/LayerModal";
import {useState} from "react";
import {cssUtils} from "../../utils/cssUtils";
import {ObjectUtils} from "../../utils/objectUtil";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import {HttpStatusCode} from "axios";
import useApi from "../../hook/useApi";

function AddShopModal(props){
    const modal = useModal();
    const {shopApi} = useApi();

    const [input, setInput]= useState({
        shop_nm: null,
        shop_addr: null,
        shop_detail_addr: null,
        shop_tel: null
    })

    const [error, setError] = useState({
        shop_nm: null,
        shop_addr: null,
        shop_detail_addr: null,
        shop_tel: null
    })

    const handleInput = e=>{
        setInput(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleError = (key, msg)=>{
        setError(prev=>({
            ...prev,
            [key]: msg
        }))
    }

    const validate = (key, msg)=>{
        if(ObjectUtils.isEmpty(input[key])){
            handleError(key, msg);
            return false;
        }
        handleError(key, null);
        return true;
    }

    const submit = async ()=>{
        const vn = validate('shop_nm', '매장명을 입력해 주세요');
        const vs = validate('shop_addr', '매장 주소를 입력해 주세요');
        const vt = validate('shop_tel', '매장 전화번호를 입력해 주세요');

        if(vn && vs && vt){
            shopApi.addShop({
                shop_nm: input.shop_nm,
                shop_addr: input.shop_addr + ' ' + input.shop_detail_addr,
                shop_tel: input.shop_tel
            }).then(({status,data})=>{
                if(status === HttpStatusCode.Ok){
                    alert("매장을 추가하였습니다.")
                }
            })
        }
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Add_Shop);
    }

    return (
        <LayerModal>
            <div className='mt-5 d-flex justify-content-center'>
                <div className='border border-1 d-flex flex-column align-items-center' style={{width: '70%'}}>
                    <div className='mt-2'>
                        <h3><b>매장명</b></h3>
                        <input className={cssUtils.borderDangerIfError(error.shop_nm)} type="text" name='shop_nm' placeholder='매장명' onChange={handleInput}/>
                    </div>
                    {
                        error.shop_nm && <p className='text-danger'>{error.shop_nm}</p>
                    }
                    <div className='mt-4'>
                        <h3><b>매장 주소</b></h3>
                        <div className='d-flex flex-row justify-content-center'>
                            <input className={cssUtils.borderDangerIfError(error.shop_addr)} type="text" name='shop_addr' placeholder='매장 주소' onChange={handleInput}/>
                            <button className='btn btn-outline-secondary ms-4'>주소 검색</button>
                        </div>
                        <input className={`mt-2 ${cssUtils.borderDangerIfError(error.shop_detail_addr)}`} name='shop_detail_addr' type="text" placeholder='매장 상세 주소'onChange={handleInput}/>
                    </div>
                    {
                        error.shop_addr && <p className='text-danger'>{error.shop_addr}</p>
                    }
                    <div className='mt-4 mb-3'>
                        <h3><b>매장 전화번호</b></h3>
                        <input type="text" className={cssUtils.borderDangerIfError(error.shop_tel)} name='shop_tel' placeholder='매장 전화번호' onChange={handleInput}/>
                    </div>
                    {
                        error.shop_tel && <p className='text-danger'>{error.shop_tel}</p>
                    }
                </div>
            </div>

            <div className='d-flex flex-row justify-content-center mt-5'>
                <button className='btn btn-primary' onClick={submit}>매장 추가</button>
                <button className='btn btn-outline-primary ms-4' onClick={close}>저장</button>
            </div>
        </LayerModal>
    )
}

export default AddShopModal;