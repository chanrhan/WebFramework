import {LayerModal} from "../../../common/modal/LayerModal";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {cm, cmc} from "../../../utils/cm";
import Popup from "../../../../css/popup.module.css";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";
import {DYNAMIC_TYPE} from "../../../common/modal/DynamicSelectModal";

export function DeviceSearchModal(props){
    const modal = useModal();
    const {gmdApi} = useApi()
    const [keyword, setKeyword] = useState('')
    const [selected, setSelected] = useState(null)
    const [items, setItems] = useState([])

    useEffect(() => {
        getDevice()
    }, [keyword]);


    const getDevice = async ()=>{
        console.log(123)
        await gmdApi.getData(DYNAMIC_TYPE.device, keyword, props.provider).then(({status,data})=>{
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
        modal.closeModal(ModalType.LAYER.Device_Search)
    }

    const submit = ()=>{
        if(props.onSubmit){
            console.table(items[selected])
            props.onSubmit(items[selected])
        }
        close();
    }

    return (
        <LayerModal top={30} maxWidth={600}>
            <div className={Popup.popup_title}>{props.title}</div>

            <form className={Popup.service} onSubmit={e=>e.preventDefault()}>
                <div className={Popup.popup_cont}>
                    <div className={Popup.service_search}>
                        <input type="text" value={keyword} onChange={handleKeyword} className={`inp ${Popup.inp_search}`} placeholder="검색어를 입력해주세요."/>
                    </div>

                    <div className={Popup.service_scroll}>
                        <ul className="service_list">
                            {
                                items && items.map((v,i)=>{
                                    return <DeviceItem active={i === selected} key={i}
                                                       device_nm={v.name}
                                                       device_cd={v.code}
                                                       onClick={()=>{
                                                           setSelected(i)
                                                       }}/>
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

function DeviceItem({key, active, device_nm, device_cd, onClick}){
    return (
        <li key={key} className={cm(Popup.service_item, `${active && Popup.active}`)} onClick={onClick}>
            <button className={Popup.button} type="button">{device_nm}<span className={Popup.span}>{device_cd}</span>
            </button>
        </li>
    )
}