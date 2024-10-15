import {SnackbarModal} from "../SnackbarModal";
import {ModalType} from "../ModalType";
import useModal from "../../../hook/useModal";
import Modal from "../../../../css/modal.module.css"

function AlertModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.SNACKBAR.Alert)
    }

    return (
        <SnackbarModal close={close} timeout='3000' className={Modal.alert} {...props}>
            {props.msg}
        </SnackbarModal>
    )
}

export default AlertModal;