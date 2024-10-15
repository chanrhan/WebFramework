import useModal from "../hook/useModal";
import DEFAULT_HEADERS from "./DEFAULT_HEADERS";
import {ModalType} from "../common/modal/ModalType";
import {MenuModal} from "../common/modal/MenuModal";

function TableHeaderSelectModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.MENU.Select_Table_Header)
    }

    return (
        <MenuModal modalRef={props.modalRef} x={props.e.clientX-125} y={props.e.clientY-80} width='600px' height='80px' close={close}>
            <div className='d-flex flex-row align-items-center justify-content-center'>
                {
                    DEFAULT_HEADERS.entries().map((header)=>{
                        return <h4 className={`me-2 ${(header[0] === props.val ? 'text-danger':'')}`} onClick={()=>{
                            props.onSelect(header[0]);
                        }}>{header[1]}</h4>
                    })
                }
            </div>
        </MenuModal>
    )
}

export default TableHeaderSelectModal;