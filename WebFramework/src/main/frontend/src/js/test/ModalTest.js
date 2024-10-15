import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";

function ModalTest(){
    const modal = useModal();

    const openNotifModal = ()=>{
        modal.openModal(ModalType.SNACKBAR.Alert, {
            msg: '테스트 스낵바입니다'
        })
    }

    const openMenuModal = (e)=>{
        modal.openModal(ModalType.MENU.Test, {
            e
        });
    }

    return (
        <div className='mt-4'>
            <button className='btn btn-outline-secondary' onClick={openNotifModal}>SNACKBAR</button>
            <button className='btn btn-outline-secondary ms-3' onClick={openMenuModal}>Menu Modal Test</button>
        </div>
    )
}

export default ModalTest;