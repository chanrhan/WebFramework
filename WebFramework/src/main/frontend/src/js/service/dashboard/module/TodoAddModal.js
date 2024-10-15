import {MenuModal} from "../../../common/modal/MenuModal";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import Popup from "../../../../css/popup.module.css"
import {LayerModal} from "../../../common/modal/LayerModal";
import {cm, cmc} from "../../../utils/cm";
import {useEffect, useRef, useState} from "react";
import {useObjectInputField} from "../../../hook/useObjectInputField";
import {ObjectUtils} from "../../../utils/objectUtil";
import {LMD} from "../../../common/LMD";


export function TodoAddModal(props){
    const modal = useModal()
    const inputField = useObjectInputField({
        color: 0,
        content: ''
    });

    const [active, setActive] = useState(false)

    const componentRef = useRef(null)
    const onclickRef = useRef()

    useEffect(() => {
        if(active){
            attachOnClick();
        }else{
            detachOnClick()
        }
    }, [active]);

    const attachOnClick = ()=>{
        if(window.onclick){
            onclickRef.current = window.onclick;
        }
        const timer = setTimeout(()=>{
            window.onclick = e=>{
                // e.preventDefault()
                if(componentRef.current && !componentRef.current.contains(e.target)){
                    setActive(false)
                    // detachOnClick();
                }
            }
            clearTimeout(timer);
        }, 10)

    }

    const detachOnClick = ()=>{
        if(window.onclick){
            const timer = setTimeout(()=>{
                window.onclick = onclickRef.current;
                onclickRef.current = null;
                clearTimeout(timer)
            }, 10)
        }
    }

    const onSubmit = ()=>{
        if(ObjectUtils.isEmpty(inputField.get('content'))){
            return;
        }
        if(props.onSubmit){
            props.onSubmit(inputField.input);
            close();
        }
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Todo_Add)
    }


    return (
        <LayerModal top={40}>
            <div className={Popup.popup_title}>일정 등록</div>

            <form className={Popup.form}>
                <div className={Popup.popup_cont}>
                    <div className={Popup.schedule_regist}>
                        <input type="text" name='content' value={inputField.get('content')} onChange={inputField.handleInput} className="inp"/>
                        {/*<div className={Popup.schedule_color_box}>*/}
                        {/*    <button type="button" className={cm(Popup.schedule_color, Popup[LMD.color[inputField.get('color')]])} onClick={()=>{*/}
                        {/*        setActive(!active)*/}
                        {/*    }}>컬러 선택</button>*/}
                        {/*    <ul className={cm(Popup.schedule_color_list, `${active && Popup.active}`)} ref={componentRef}>*/}
                        {/*        /!*활성화시 active 추가 -->*!/*/}
                        {/*        {*/}
                        {/*            LMD.color.map((v,i)=> {*/}
                        {/*                return <li key={i} className={Popup.li}>*/}
                        {/*                    <button type="button"*/}
                        {/*                            className={cm(Popup.schedule_color, Popup[v])}*/}
                        {/*                            onClick={()=>{*/}
                        {/*                                inputField.put('color',i);*/}
                        {/*                                setActive(false)*/}
                        {/*                            }}>검정*/}
                        {/*                    </button>*/}
                        {/*                </li>*/}
                        {/*            })*/}
                        {/*        }*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                    </div>
                </div>

                <div className={Popup.popup_btn_box}>
                    <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={onSubmit}>등록</button>
                </div>
            </form>

            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
)
}