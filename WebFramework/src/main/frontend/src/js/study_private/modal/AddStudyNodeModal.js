import {LayerModal} from "../../common/modal/LayerModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import Popup from "../../../css/popup.module.css";

export function AddStudyNodeModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Add_Study_Node)
    }

    return (
        <LayerModal>
            <p>Hello </p>

            <div>
                <div>
                    제목
                    <textarea name="" id="" cols="30" rows="1"></textarea>
                </div>
                <div>
                    소개
                    <textarea name="" id="" cols="30" rows="2"></textarea>
                </div>
                <div>
                    내용
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>

            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}