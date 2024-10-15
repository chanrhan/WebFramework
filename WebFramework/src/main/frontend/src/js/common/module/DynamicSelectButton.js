
import Popup from "../../../css/popup.module.css"
import useModal from "../../hook/useModal";
import {ModalType} from "../modal/ModalType";
import {MouseEventUtils} from "../../utils/MouseEventUtils";
import {DYNAMIC_TYPE} from "../modal/DynamicSelectModal";
import {useRenderlessModal} from "../../hook/useRenderlessModal";

export function DynamicSelectButton({provider, type, onChange, value}){
    const renderlessModal = useRenderlessModal(`RDL_DYNAMIC_SELECT_${onChange}_${value}`)
    const modal = useModal();
    return (
        <>
            <button type="button" className={Popup.dynamic_btn}
                    onClick={(e) => {
                        const {top, left} = MouseEventUtils.getAbsolutePos(e);
                        modal.openModal(ModalType.MENU.Dynamic_Select, {
                            top: `${top}px`,
                            left: `${left}px`,
                            type: type,
                            provider: provider,
                            onSubmit: onChange
                        })
                    }}>{value ?? '선택없음'}
            </button>
        </>

    )
}