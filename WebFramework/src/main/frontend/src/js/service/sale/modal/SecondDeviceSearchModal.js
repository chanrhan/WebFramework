import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {LayerModal} from "../../../common/modal/LayerModal";
import Popup from "../../../../css/popup.module.css"
import User from "../../../../css/user.module.css"
import {cm, cmc} from "../../../utils/cm";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";
import {DYNAMIC_TYPE} from "../../../common/modal/DynamicSelectModal";
import {ObjectUtils} from "../../../utils/objectUtil";

function SecondDeviceSearchModal(props){
    const modal = useModal();
    const {gmdApi} = useApi();
    const [keyword, setKeyword] = useState('')
    const [selected, setSelected] = useState(null)
    const [items, setItems] = useState([])

    const [buttonName, setButtonName] = useState(props.data)


    useEffect(() => {
        getSecondDevice()
    }, [keyword]);

    const getSecondDevice = async ()=>{
        await gmdApi.getData(DYNAMIC_TYPE.sec_device, keyword).then(({status,data})=>{
            if(status === 200 && data){
                if(data.list){
                    setItems(JSON.parse(data.list))
                }else{
                    setItems(null)
                }
            }
        })
    }


    const handleKeyword = e=>{
        setKeyword(e.target.value)
    }


    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Second)
    }

    const submit = ()=>{
        if(props.onSubmit){
            props.onSubmit(items[selected])
        }
        close();
    }


    const selectItem = (i)=>{
        setSelected(i)
        setButtonName(items[i])
    }


    return (
        <LayerModal top={30}>
                <div className={Popup.popup_title}>세컨 디바이스 선택</div>

                <form className={Popup.service} onSubmit={e=>e.preventDefault()}>
                    <div className={Popup.popup_cont}>
                        <div className={Popup.org_head_box}>
                            <button className={Popup.button} type="button">
                                {!ObjectUtils.isEmpty(buttonName.name) ? buttonName.name : '선택없음'}
                                <span className={Popup.span}>{buttonName.code}</span>
                            </button>
                        </div>
                        <div className={Popup.service_search}>
                            <input type="text" name='keyword' value={keyword} onChange={handleKeyword}
                                   className={`inp ${Popup.inp_search}`} placeholder="검색어를 입력해주세요."/>
                        </div>



                        <div className={Popup.service_scroll}>
                            <ul className="service_list">
                                {
                                    items && items.map((v, i) => {
                                        return <li key={i}
                                                   className={`${cm(Popup.service_item)} ${i === selected && Popup.active}`}
                                                   onClick={()=>{
                                                       selectItem(i)
                                                   }}>
                                            <button className={Popup.button} type="button">{v.name}<span
                                                className={Popup.span}>{v.code}</span>
                                            </button>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <div className={Popup.popup_btn_box}>
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>저장</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>

    )
}

export default SecondDeviceSearchModal;