import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MenuModal} from "../../common/modal/MenuModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import {ObjectUtils} from "../../utils/objectUtil";
import {HttpStatusCode} from "axios";
import {userActions} from "../../store/slices/userSlice";
import useApi from "../../hook/useApi";
import {deprecate} from "util";

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 * @deprecated
 */
export function ChangeShopModal(props){
    const dispatch = useDispatch();
    const modal = useModal();
    const {userApi, shopApi} = useApi();
    const [shopList,setShopList] = useState([]);

    useEffect(()=>{
        shopApi.getShop().then(({status, data})=>{
            if(status === 200 && !ObjectUtils.isEmpty(data)){
                setShopList(data);
            }
        });
    },[]);

    const close = ()=>{
        // modal.closeModal(ModalType.MENU.Change_Shop);
    }

    const changeShop = (shopId)=>{
        userApi.updateCurrentShop(shopId).then(({status, data})=>{
            if(status === 200){
                modal.openModal(ModalType.SNACKBAR.Alert, {
                    msg: '매장이 변경되었습니다'
                })
                userApi.getUser().then(({status, data})=>{
                    if(status === HttpStatusCode.Ok){
                        dispatch(userActions.setUserInfo(data));
                        close();
                    }
                });
            }
        })
    }

    return (
        <MenuModal modalRef={props.modalRef} x={props.e.clientX} y={props.e.clientY} width='20%' height='30%' close={close}>
            {
                shopList.map((value,index)=>{
                    return <div key={index} className='d-flex flex-row justify-content-center'>
                        <h4 className='ui-menu-item' onClick={()=>{
                            changeShop(value.shop_id);
                        }}>{value.shop_nm}</h4>
                        {/*<input type="radio" name='shop_item' value={value.shop_id} onChange={handleCheck}/>*/}
                    </div>
                })
            }
        </MenuModal>
    )
}

