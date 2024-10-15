import useModal from "../hook/useModal";
import {useEffect} from "react";
import {MenuModal} from "../common/modal/MenuModal";
import {ModalType} from "../common/modal/ModalType";

function MenuModalTest(props){
    const modal = useModal();


    const close = ()=>{
        modal.closeModal(ModalType.MENU.Test);
    }


    return (
        <MenuModal modalRef={props.modalRef} x={props.e.clientX} y={props.e.clientY} width='20%' height='30%' close={close}>
            <div>
                <h3>Menu Modal Test</h3>
            </div>
        </MenuModal>
    )
}

export default MenuModalTest;