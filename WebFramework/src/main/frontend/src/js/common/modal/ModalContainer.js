import {useSelector} from "react-redux";
import {createPortal} from "react-dom";
import {useEffect, useRef, useState} from "react";
import {ObjectUtils} from "../../utils/objectUtil";
import useModal from "../../hook/useModal";
import ChangeNicknameModal from "../../account/modal/ChangeNicknameModal";
import AddShopModal from "../../shop/modal/AddShopModal";
import AlertModal from "./snackbar/AlertModal";
import MenuModalTest from "../../test/MenuModalTest";
import SaleDetailModal from "../../service/sale/modal/SaleDetailModal";
import SecondDeviceSearchModal from "../../service/sale/modal/SecondDeviceSearchModal";
import SaleCardModal from "../../service/sale/modal/SaleCardModal";
import SaleCombModal from "../../service/sale/modal/SaleCombModal";
import SaleExsvcModal from "../../service/sale/modal/SaleExsvcModal";
import TableHeaderSelectModal from "../../test/TableHeaderSelectModal";
import TableValidationModal from "../../test/TableValidationModal";
import {WarningModal} from "./snackbar/WarningModal";
import {InfoModal} from "./snackbar/InfoModal";
import {MonthSelectModal} from "./menu/MonthSelectModal";
import {DateSelectModal} from "./menu/DateSelectModal";
import {SelectModal} from "./menu/SelectModal";
import {SaleWtPlanModal} from "../../service/sale/modal/SaleWtPlanModal";
import {SaleFilterModal} from "../../service/sale/modal/SaleFilterModal";
import {ReserveMessageModal} from "../../service/sale/modal/ReserveMessageModal";
import {ReserveDateModal} from "../../service/sale/modal/ReserveDateModal";
import {DeviceSearchModal} from "../../service/sale/modal/DeviceSearchModal";
import {PlanSearchModal} from "../../service/sale/modal/PlanSearchModal";
import SaleUsedDeviceModal from "../../service/sale/modal/SaleUsedDeviceModal";
import {TodoAddModal} from "../../service/dashboard/module/TodoAddModal";
import {BulkUploadModal} from "../../admin/modal/BulkUploadModal";
import {InviteModal} from "../../service/dashboard/module/InviteModal";
import {ChargePointModal} from "../../profile/modal/ChargePointModal";
import {PaymentCardModal} from "../../profile/modal/PaymentCardModal";
import {UpdatePasswordModal} from "../../profile/modal/UpdatePasswordModal";
import {NameCardModal} from "../../profile/modal/NameCardModal";
import {DynamicSelectModal} from "./DynamicSelectModal";
import {MoreOptionModal} from "./menu/MoreOptionModal";
import {UsedDeviceCmsModal} from "../../service/task/modal/TaskUsedDeviceCmsModal";
import {ImagePreviewModal} from "./layer/ImagePreviewModal";
import {HintModal} from "./tooptip/HintModal";
import {ChangeShopModal} from "../../shop/modal/ChangeShopModal";
import {AddStudyNodeModal} from "../../study_private/modal/AddStudyNodeModal";

const M_TYPE = {
    MENU: 'MENU',
    LAYER: 'LAYER',
    RENDERLESS: 'RENDERLESS',
    TOOLTIP: 'TOOLTIP'
}

const MODAL_COMPONENTS = {
    // common
    DynamicSelect: DynamicSelectModal,
    MoreOption: MoreOptionModal,
    BulkUpload: BulkUploadModal,
    Invite: InviteModal,
    ChargePoint: ChargePointModal,
    Alert: AlertModal,
    ImagePreview: ImagePreviewModal,

    // tooltip
    Hint: HintModal,

    // todo
    Payment_Card: PaymentCardModal,

    // Profile
    TodoAdd: TodoAddModal,
    UpdatePassword: UpdatePasswordModal,
    NameCard: NameCardModal,

    // Shop
    ChangeNickname: ChangeNicknameModal,
    // ChangeShop: ChangeShopModal,
    AddShop: AddShopModal,

    // Test
    MenuModalTest: MenuModalTest,
    // sale
    SaleDetail: SaleDetailModal,
    SaleSecond: SecondDeviceSearchModal,
    SaleCard: SaleCardModal,
    SaleComb: SaleCombModal,
    SaleExsvc: SaleExsvcModal,
    SaleWtPlan: SaleWtPlanModal,
    SaleUsedPhone: SaleUsedDeviceModal,

    // sale common
    DeviceSearch: DeviceSearchModal,
    PlanSearch: PlanSearchModal,


    SelectTableHeader: TableHeaderSelectModal,
    TableValidation: TableValidationModal,
    // Select: SelectModal,
    // SelectMonth: MonthSelectLayer,
    SelectDate: DateSelectModal,
    SaleFilter: SaleFilterModal,
    ReserveMessage: ReserveMessageModal,
    ReserveDate: ReserveDateModal,

    // Task
    UsedDeviceCms: UsedDeviceCmsModal,

    // error
    Warning: WarningModal,
    Info: InfoModal,

    // study private
    AddStudyNode: AddStudyNodeModal
}

function ModalContainer(){
    const modal = useModal();
    const modalList : Object<string,Array> = useSelector(state=>state.modalReducer);
    const topComponentRef = useRef(null);


    useEffect(()=>{
        if(ObjectUtils.isEmpty(modalList.list)){
            return;
        }

        const {type, modalName, onopen, onclose} = modalList.list[modalList.list.length-1];
        const onClickCaptureEvent = (e: MouseEvent)=>{
            if(topComponentRef.current && !topComponentRef.current.contains(e.target)){
                // console.log('capture')
                modal.closeAndLockModal(modalName)
                window.removeEventListener('click', onClickCaptureEvent, true)
                window.removeEventListener('keydown', onKeydownCaptureEvent, true)
            }
        }

        const onClickBubbleEvent = (e)=>{
            if(topComponentRef.current && !topComponentRef.current.contains(e.target)){
                // console.log('bubble')
                modal.unlockModal()
                window.removeEventListener('click', onClickBubbleEvent, false)
            }
        }

        const onKeydownCaptureEvent = (e: KeyboardEvent)=>{
            if(e.keyCode === 27){
                modal.closeModal(modalName);

                window.removeEventListener('keydown', onKeydownCaptureEvent, true)
                window.removeEventListener('click', onClickCaptureEvent, true)
                window.removeEventListener('click', onClickBubbleEvent, false)
            }
        }

        // 모든 흐름이 끝난 후 이벤트 리스너를 붙이도록 비동기적으로 처리
        const attachListenerTimer = setTimeout(()=>{
            if(type === M_TYPE.MENU || type === M_TYPE.RENDERLESS){
                // onclickDelayTimer = setTimeout(()=>{
                //     // onclick 함수를 추가하자마자, 이게 호출된다
                //     // 버튼을 눌러서 해당 useEffect 를 실행하니 아래 onclick 도 거의 동시에 실행되서 생기는 문제인 듯 싶다
                //     // Timeout 으로 해결
                //
                //     // 이벤트 흐름 중 캡처링을 사용하여 이벤트를 등록하였다
                //     // 이 클릭이벤트는 최상단 계층인 window에서 발생되므로
                //     // 가장 먼저 이벤트가 발생해야 한다
                //     // 버블링으로 이벤트를 추가하면,
                //     // 하나의 모달이 열린 상태에서 다른 (클릭이벤트가 있는) 버튼을 눌렀을 시
                //     // 해당 이벤트가 발생하기 전에 버튼 이벤트가 먼저 발생하게 되어 문제가 발생한다.
                // }, 10);
                window.addEventListener('click', onClickBubbleEvent, false)
                window.addEventListener('click', onClickCaptureEvent, true) // true: capturing, false: bubbling
            }

            if(type === M_TYPE.MENU || type === M_TYPE.LAYER || type === M_TYPE.RENDERLESS){
                window.addEventListener('keydown', onKeydownCaptureEvent, true)
            }

        }, 10)

        return ()=>{
            clearTimeout(attachListenerTimer);
            window.removeEventListener('keydown', onKeydownCaptureEvent, true)
            window.removeEventListener('click', onClickCaptureEvent, true)
            // window.removeEventListener('click', onClickBubbleEvent, false)
            // bubbling의 경우에는 미리 삭제하면 안되기 때문에 주석처리
        }
    },[modalList.list])

    let topIndex = 0;
    let topScrollIndex = 0;
    modalList.list.forEach(({modalName, type, props}, index)=>{
        if(type === M_TYPE.MENU || type === M_TYPE.LAYER || type === M_TYPE.RENDERLESS){
            topIndex = index
        }
        if(type === M_TYPE.LAYER || type === M_TYPE.MENU){
            topScrollIndex = index
        }
    })
    const renderModal = modalList.list.map(({modalName, type, onopen, onclose, props}, index)=>{
        if(!modalName){
            return null;
        }

        // if(index === modalList.length-1){
        //     if(type === 'MENU' || type === 'LAYER'){
        //         return <ModalComponent scrollable={true} modalRef={topComponentRef} key={modalName} {...props}/>
        //     }
        // }
        if(index === topIndex){
            if(type === 'RENDERLESS'){
                if(props.ref){
                    topComponentRef.current = props.ref;
                    // modal.addTopElement(props.ref)
                }

                return null;
            }
            const ModalComponent = MODAL_COMPONENTS[modalName];
            return <ModalComponent scrollable={true} modalRef={topComponentRef} key={modalName} {...props}/>
        }
        const ModalComponent = MODAL_COMPONENTS[modalName];

        let scrollable = false;
        if((type === M_TYPE.LAYER || type === M_TYPE.MENU) && index === topScrollIndex){
            scrollable = true;
        }

        return <ModalComponent scrollable={scrollable} key={modalName} {...props}/>
    });

    return createPortal(
        <>
            {renderModal}
        </>, document.getElementById('root')
    )
}

export default ModalContainer;