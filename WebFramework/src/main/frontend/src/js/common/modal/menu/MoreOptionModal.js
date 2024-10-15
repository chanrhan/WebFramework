import {MenuModal} from "../MenuModal";
import {cm, cmc} from "../../../utils/cm";
import Popup from "../../../../css/popup.module.css";
import {SelectItem} from "../../module/SelectLayer";
import useModal from "../../../hook/useModal";
import {ModalType} from "../ModalType";
import {useEffect} from "react";

export function MoreOptionModal(props){

    const modal = useModal();

    const close = (action)=>{
        if(props.onSubmit){
            props.onSubmit(action);
        }
        modal.closeModal(ModalType.MENU.More_Option)
    }

    useEffect(() => {
        return ()=>{
            if(props.onSubmit){
                props.onSubmit();
            }
        }
    }, []);

    return (
        <MenuModal modalRef={props.modalRef} top={props.top} left={props.left}>
            <div className={'select_box'}>
                <ul className={`select_layer add_icon left ${cmc(Popup.active)}`}>
                    <li className={`select_item ${Popup.more_select_item}`}>
                        <button type="button" className={`tool_btn ${Popup.button}`} onClick={e => {
                            close(0);
                        }}>수정
                        </button>
                    </li>
                    <li className={`select_item ${Popup.more_select_item}`}>
                        <button type="button" className={`tool_btn ${Popup.button}`} onClick={e => {
                            close(1);
                        }}>삭제
                        </button>
                    </li>
                </ul>
            </div>
        </MenuModal>
    )
}