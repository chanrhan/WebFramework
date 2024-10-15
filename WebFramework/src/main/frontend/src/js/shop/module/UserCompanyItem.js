import User from "../../../css/user.module.css"
import {UserFormList} from "../../account/module/UserFormList";
import {UserFormItem} from "../../account/module/UserFormItem";
import {UserFormInput} from "../../account/module/UserFormInput";
import {cm, cmc} from "../../utils/cm";
import {SelectIndexLayer} from "../../common/module/SelectIndexLayer";
import {TelePhoneInput} from "../../common/inputbox/TelePhoneInput";

export function UserCompanyItem({inputField, close}){

    return (
        <li className={`${User.company_item}`}>
            <UserFormList>
                <UserFormItem errorText={inputField.error.shop_nm}>
                    <div className={cm(User.form_item_box,User.w70)}>
                        <UserFormInput inputField={inputField} subject='매장명' name='shop_nm' placeholder='매장명을 입력해주세요.' readOnly={close}/>
                    </div>
                    <div className={cm(User.form_item_box, User.w30)}>
                        <label htmlFor="shop_tp" className={User.form_label}>매장 구분</label>
                        <div className={User.form_inp}>
                            <div className={`select_box ${User.select_box}`}>
                                <input type="hidden" id="shop_tp"/>
                                <SelectIndexLayer name='provider' inputField={inputField} cssModule={User} values={['SKT','KT','LG','판매점']}/>
                                {/*<SelectModal name='provider' values={['SKT','KT','LG','판매점']} inputField={inputField}/>*/}
                            </div>
                        </div>
                    </div>
                </UserFormItem>
                <UserFormItem errorText={inputField.error.shop_addr}>
                    <UserFormInput inputField={inputField} subject='매장 주소' name='shop_addr' placeholder='주소를 검색해주세요.' search/>
                    <UserFormInput inputField={inputField} name='shop_addr_detail' placeholder='상세 주소를 입력해주세요.'/>
                </UserFormItem>
                <UserFormItem errorText={inputField.error.shop_tel}>
                    <label htmlFor='shop_tel' className={User.form_label}>매장 전화번호</label>
                    <div className={`${User.form_inp} ${User.div}`}>
                        <TelePhoneInput name='shop_tel' value={inputField.get('shop_tel')}
                                        className={`inp ${User.inp}`}
                                        placeholder='- 없이 숫자만 입력해주세요.'
                                        onChange={inputField.handleInput}/>
                    </div>
                </UserFormItem>
            </UserFormList>
            {/*<div className={User.company_btn_box}>*/}
            {/*    <button index={index} type="button" className={cm(User.button, User.company_del_btn)} onClick={onDelete}>삭제</button>*/}
            {/*    <button index={index} type="button" className={cm(User.button, User.company_open_btn)} onClick={onSelect}>닫기</button>*/}
            {/*</div>*/}
        </li>
    )
}