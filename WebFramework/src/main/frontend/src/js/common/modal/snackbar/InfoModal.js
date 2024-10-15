import {SnackbarModal} from "../SnackbarModal";
import useModal from "../../../hook/useModal";
import {ModalType} from "../ModalType";
import Modal from "../../../../css/modal.module.css"

export function InfoModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.SNACKBAR.Info)
    }

    return (
        <SnackbarModal close={close} timeout={3000} className={Modal.info} {...props}>
            {props.msg}
        </SnackbarModal>
    )
}