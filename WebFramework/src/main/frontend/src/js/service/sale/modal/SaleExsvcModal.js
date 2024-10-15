import {LayerModal} from "../../../common/modal/LayerModal";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import Popup from "../../../../css/popup.module.css"
import {cm, cmc} from "../../../utils/cm";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";
import {DYNAMIC_TYPE} from "../../../common/modal/DynamicSelectModal";
import {ObjectUtils} from "../../../utils/objectUtil";

function SaleExsvcModal(props){
    const modal = useModal();
    const {gmdApi} = useApi();
    const [keyword, setKeyword] = useState('')
    const [selected, setSelected] = useState(null)

    const [buttonName, setButtonName] = useState(props.data)
    const [items, setItems] = useState(null)

    useEffect(() => {
        getItems()
    }, [keyword]);

    const handleKeyword = e=>{
        setKeyword(e.target.value)
    }

    const getItems = async ()=>{
        await gmdApi.getData(DYNAMIC_TYPE.exsvc, keyword, props.provider).then(({status,data})=>{
            if(status === 200 && data){
                if(data.list){
                    setItems(JSON.parse(data.list))
                }
            }
        })
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Exsvc)
    }

    const submit = ()=>{
        if(props.onSubmit){
            props.onSubmit(items[selected])
        }
        close();
    }

    const selectItem = (i)=>{
        setSelected(i)
        setButtonName(items[i].name)
    }


    return (
        <LayerModal top={30}>
                <div className={Popup.popup_title}>부가서비스 선택</div>

                <form className={Popup.service} onSubmit={e=>e.preventDefault()}>
                    <div className={Popup.popup_cont}>
                        <div className={Popup.org_head_box}>
                            <button className={Popup.button} type="button">
                                {!ObjectUtils.isEmpty(buttonName) ? buttonName : '선택없음'}
                            </button>
                        </div>
                        <div className={Popup.service_search}>
                            <input type="text" name='keyword' className={`inp ${Popup.inp_search}`} value={keyword}
                                   onChange={handleKeyword} placeholder="검색어를 입력해주세요."/>
                        </div>

                        <div className={Popup.service_scroll}>
                            <ul className="service_list">
                                {
                                    items && items.map((v, i) => {
                                        return <li key={i} className={cm(Popup.service_item, `${i === selected && Popup.active}`)}>
                                            <button type="button" className={Popup.button} onClick={()=>{
                                                selectItem(i)
                                            }}>{v.name}</button>
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


export default SaleExsvcModal;