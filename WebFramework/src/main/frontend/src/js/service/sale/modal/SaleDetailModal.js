import {LayerModal} from "../../../common/modal/LayerModal";
import {useEffect, useRef, useState} from "react";
import useValidateInputField from "../../../hook/useValidateInputField";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import useApi from "../../../hook/useApi";
import {ObjectUtils} from "../../../utils/objectUtil";
import User from "../../../../css/user.module.css"
import Popup from "../../../../css/popup.module.css"
import {cm, cmc, toCssModules} from "../../../utils/cm";
import {AddSaleItem} from "../module/AddSaleItem";
import {AddSaleTabItem} from "../module/AddSaleTabItem";
import {AddSaleCheckItem} from "../module/AddSaleCheckItem";
import {AddSaleInput} from "../module/AddSaleInput";
import {TabList} from "../../../common/module/TabList";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {NumberUtils} from "../../../utils/NumberUtils";
import {LMD} from "../../../common/LMD";
import useUserInfo from "../../../hook/useUserInfo";
import {DateSelectModal} from "../../../common/modal/menu/DateSelectModal";
import {DateUtils} from "../../../utils/DateUtils";
import {useObjectInputField} from "../../../hook/useObjectInputField";
import {useBitArray} from "../../../hook/useBitArray";
import {SelectMapLayer} from "../../../common/module/SelectMapLayer";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import {DynamicSelectButton} from "../../../common/module/DynamicSelectButton";
import {TelePhoneInput} from "../../../common/inputbox/TelePhoneInput";
import {telRegex} from "../../../utils/regex";
import {PriceInput} from "../../../common/inputbox/PriceInput";
import {DYNAMIC_TYPE} from "../../../common/modal/DynamicSelectModal";
import {Scrollable} from "../../../common/module/Scrollable";
import {useFileLoader} from "../../../hook/useFileLoader";
import {FileUtils} from "../../../utils/FileUtils";
import {useHintBox} from "../../../hook/useHintBox";
import {NumberInput} from "../../../common/inputbox/NumberInput";
import {CustomerCodeInput} from "../../../common/inputbox/CustomerCodeInput";


function SaleDetailModal(props){
    const userInfo = useUserInfo()
    const modal = useModal();
    const inputField = useValidateInputField([
        {
          key: 'actv_dt',
          name: '개통일자'
        },
        {
          key: 'provider',
          value: userInfo.provider === 3 ? null : (userInfo.provider)
        },
        {
          key: 'cust_nm',
          name: '이름',
          msg: '이름을 입력해 주십시오'
        },
        {
            key: 'cust_tel',
            name: '휴대폰번호',
            regex: telRegex,
            msg: '전화번호 형식에 맞춰 입력해 주십시오'
        },
        {
            key: 'cust_cd',
            name: '식별번호',
            regex: /^\d{6}$|^\d{5}$/,
            msg: '번호를 정확하게 입력해 주십시오'
        },
        {
            key: 'cust_gd',
            value: 0
        },
        {
            key: 'ct_actv_div',
            value: null
        },
        {
            key: 'ct_actv_tp',
            value: null,
            required: true
        },
        {
            key: 'device_stor',
            value: null,
            required: true
        },
        {
            key: 'ct_istm',
            value: null,
            required: true
        }
    ]);
    const fileLoader = useFileLoader()  ;

    const supportInputField = useObjectArrayInputField({
        name: '선택없음',
        div: 0,
        amount: 0
    })
    const addInputField = useObjectArrayInputField({
        name: '선택없음',
        div: 0,
        amount: 0
    })

    const promiseInputField = useObjectArrayInputField({
        checked: false,
        content: ''
    })

    const {saleApi, userApi} = useApi();

    // const [checkList, setCheckList] = useState(0);
    const checkBit = useBitArray();
    const checkListInputField = useObjectInputField();

    const fileInputField = useObjectArrayInputField({
        file: null,
        preview: null,
        key: null
    })

    // const [deleteFiles, setDeleteFiles] = useState([])
    // !key && order = new
    // key && order = existed
        // key != order -> updated
    // key && !order = deleted
    // !key && !order = NULL

    const [staff, setStaff] = useState([])

    const hintBox = useHintBox("법인인 경우 사업자등록번호 5자리를 입력해주세요.")


    useEffect(()=>{
        if(props.sale_id){
            // console.log(`sale_id ${props.sale_id}`)
            getSaleDetail(props.sale_id);
        }
        getInnerStaff()
    },[props.sale_id])


    const getInitStaffName = ()=>{
        if(staff){
            return staff[userInfo.id];
        }
        return null;
    }


    const getInnerStaff = async ()=>{
        await userApi.getInnerStaffAsObject().then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                setStaff(data)
                if(!props.sale_id && data[userInfo.id]){
                    inputField.put('seller_id', userInfo.id)
                }
            }
        })
    }

    const getSaleDetail = async (saleId)=>{
        await saleApi.getSaleDetail(saleId).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                let bit = 0;
                if(data.wt_cms || data.internet_plan || data.tv_plan){
                    bit = bit | 1
                }
                if(data.sec_device_id){
                    bit = bit | (1 << 1);
                }
                if(data.exsvc_id){
                    bit = bit | (1 << 4);
                }
                if(data.comb_tp || data.comb_memo){
                    bit = bit | (1 << 5);
                }

                inputField.putAll(data);

                checkListInputField.put('internet_plan',data.internet_plan)
                checkListInputField.put('internet_plan_nm',data.internet_plan_nm)
                checkListInputField.put('tv_plan',data.tv_plan)
                checkListInputField.put('tv_plan_nm',data.tv_plan_nm)

                // 리스트형 데이터
                const {pm_list, sup_list, add_list, card_list, ud_list, file_list} = data;
                if(!ObjectUtils.isEmpty(pm_list)){
                    promiseInputField.putAll(JSON.parse(pm_list));
                }
                if(!ObjectUtils.isEmpty(sup_list)){
                    supportInputField.putAll(JSON.parse(sup_list));
                }
                if(!ObjectUtils.isEmpty(add_list)){
                    const parsed = JSON.parse(add_list);
                    // console.table(parsed)
                    if(!ObjectUtils.isEmptyMap(parsed)){
                        addInputField.putAll(parsed);
                    }
                }
                if(!ObjectUtils.isEmpty(card_list)){
                    bit = bit | (1 << 2)
                    checkListInputField.put('card_list', JSON.parse(card_list));
                }
                if(!ObjectUtils.isEmpty(ud_list)){
                    bit = bit | (1 << 3)
                    checkListInputField.put('ud_list', JSON.parse(ud_list));
                }
                if(!ObjectUtils.isEmpty(file_list)){
                    const parsed: Array = JSON.parse(file_list)
                    // fileInputField.setInput(parsed.map(v=>{
                    //     console.log(v)
                    //     return {
                    //         file: v,
                    //         preview: null
                    //     }
                    // }))
                    // console.table(parsed)
                    getFileImages(parsed).then(li=>{
                        fileInputField.setInput(li)
                    })
                }
                checkBit.setAll(bit);
            }
        })
    }


    const getFileImages = async (list)=>{
        // console.table(fileInputField.input)
        if(list){
            const copy = new Array(list.length)
            for(let i=0;i<list.length; ++i){
                await fileLoader.saleFile(list[i].path).then(d=>{
                    const order = list[i].order;
                    copy[i] = {
                        file: null,
                        preview: d,
                        key: order
                    }
                })
            }
            if(list.length < 5){
                copy[list.length] = {
                    file: null,
                    preview: null,
                    key: null
                }
            }
            return copy;
        }
        return null;
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Detail);
    }

    const sumCms = ()=>{
        const ctCms = Number(inputField.get('ct_cms')) ?? 0;
        const wtCms = Number(checkListInputField.get('wt_cms')) ?? 0;
        return ctCms+wtCms;
    }

    const sumSup = ()=>{
        let rst = 0;
        if(!supportInputField.input){
            return rst;
        }

        supportInputField.input.forEach(v=>{
            rst += NumberUtils.toNumber(v.amount)
        })
        return rst;
    }

    const sumAdd = ()=>{
        let rst = 0;
        // console.table(addInputField)
        if(!addInputField.input){
            return rst;
        }

        addInputField.input.forEach(v=>{
            rst += NumberUtils.toNumber(v.amount)
        })
        return rst;
    }

    const sumUsedDeviceCms = ()=>{
        let rst = 0;
        // console.table(addInputField)
        if(!checkListInputField.input.ud_list){
            return rst;
        }

        checkListInputField.input.ud_list.forEach(v=>{
            rst += NumberUtils.toNumber(v.ud_cms)
        })
        return rst;
    }

    const setDate = (year, month, day)=>{
        // console.log(`set day: ${date}`)
        inputField.put('actv_dt', DateUtils.formatYYMMdd(year,month,day))
        inputField.handleError('actv_dt',null)
    }

    const openWtSelectModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Wt_Plan, {
            data: {
              wt_actv_div: checkListInputField.input.wt_actv_div,
              wt_cms: checkListInputField.input.wt_cms,
              internet_plan: checkListInputField.input.internet_plan,
              internet_plan_nm: checkListInputField.input.internet_plan_nm,
              tv_plan: checkListInputField.input.tv_plan,
              tv_plan_nm: checkListInputField.input.tv_plan_nm,
            },
            provider: inputField.input.provider,
            onSubmit: (data)=>{
                checkListInputField.put('wt_actv_div',data.wt_actv_div)
                checkListInputField.put('wt_cms',data.wt_cms)
                checkListInputField.put('internet_plan',data.internet_plan)
                checkListInputField.put('internet_plan_nm',data.internet_plan_nm)
                checkListInputField.put('tv_plan',data.tv_plan)
                checkListInputField.put('tv_plan_nm',data.tv_plan_nm)
                if(!ObjectUtils.isEmpty(data.wt_cms) ||
                    !ObjectUtils.isEmpty(data.internet_plan) || !ObjectUtils.isEmpty(data.tv_plan)){
                    checkBit.on(0)
                }else{
                    checkBit.off(0)
                }
            }
        })
    }

    const openSecondModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Second, {
            data: {
              name: checkListInputField.get('sd_nm'),
              code: checkListInputField.get('sd_cd')
            },
            provider: inputField.get('provider'),
            onSubmit: ({id, name, code})=>{
                // console.log(`sec: ${id}`)
                checkListInputField.put('sd_id',id)
                checkListInputField.put('sd_nm',name)
                checkListInputField.put('sd_cd',code)
                if(id !== 0){
                    checkBit.on(1)
                }else{
                    checkBit.off(1)
                }
            }
        })
    }

    const openCardModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Card, {
            data: checkListInputField.get('card_list'),
            onSubmit: (list)=>{
                // console.log(`card: `)
                // console.table(list)
                checkListInputField.put('card_list',list)
                if(!ObjectUtils.isEmpty(list)){
                    checkBit.on(2)
                }else{
                    checkBit.off(2)
                }
            }
        })
    }

    const openUsedPhoneModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Used_Phone, {
            data: checkListInputField.get('ud_list'),
            onSubmit: (list)=>{
                // console.table(list)
                checkListInputField.put('ud_list',list)
                if(!ObjectUtils.isEmpty(list)){
                    checkBit.on(3)
                }else{
                    checkBit.off(3)
                }
            }
        })
    }

    const openExsvcModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Exsvc, {
            data: checkListInputField.get('exsvc_nm'),
            provider: inputField.get('provider'),
            onSubmit: ({id, name})=>{
                // console.log(`exsvc: ${id}`)
                checkListInputField.put('exsvc_id',id)
                checkListInputField.put('exsvc_nm',name)
                if(id !== null){
                    checkBit.on(4)
                }else{
                    checkBit.off(4)
                }
            }
        })
    }

    const openCombModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Comb, {
            provider: inputField.get('provider'),
            onSubmit: ({comb_tp, comb_memo})=>{
                // console.log(`comb: ${comb_tp} ${comb_memo}`)
                checkListInputField.put('comb_tp',comb_tp)
                checkListInputField.put('comb_memo',comb_memo)
                if(!ObjectUtils.isEmpty(comb_tp) || !ObjectUtils.isEmpty(comb_memo)){
                    checkBit.on(5)
                }else{
                    checkBit.off(5)
                }
            }
        })
    }

    const openDeviceSearchModal = ()=>{
        modal.openModal(ModalType.LAYER.Device_Search, {
            title: '모델명 선택',
            provider: inputField.input.provider,
            onSubmit: ({id, name})=>{
                inputField.put('device_id', id)
                inputField.put('device_nm', name)
            }
        })
    }

    const openActvPlanSearchModal = ()=>{
        modal.openModal(ModalType.LAYER.Plan_Search, {
            title: '무선 개통 요금제 선택',
            provider: inputField.input.provider,
            onSubmit: ({id, name})=>{
                inputField.put('ct_actv_plan', id)
                inputField.put('ct_actv_plan_nm', name)
            }
        })
    }

    const openDecPlanSearchModal = ()=>{
        modal.openModal(ModalType.LAYER.Plan_Search, {
            title: '무선 하향 요금제 선택',
            provider: inputField.input.provider,
            onSubmit: ({id, name})=>{
                inputField.put('ct_dec_plan', id)
                inputField.put('ct_dec_plan_nm', name)
            }
        })
    }


    const onSubmit = ()=>{
        if(inputField.validateAll()){
            if(props.sale_id){
                submit()
                return;
            }
            modal.openModal(ModalType.LAYER.Reserve_Message, {
                actv_dt: inputField.get('actv_dt'),
                onSubmit: submit
            })
        }
    }

    // const openReserveMessageModal = ()=>{
    //     if(props.sale_id){
    //         submit()
    //         return;
    //     }
    //     modal.openModal(ModalType.LAYER.Reserve_Message, {
    //         actv_dt: inputField.get('actv_dt'),
    //         onSubmit: submit
    //     })
    // }

    const submit = async (rsvMsgList)=>{
        const formData = new FormData();
        // return ;

        const filtered = fileInputField.input.filter(v=>v.preview !== null || (v.key !== null && v.key !== undefined));
        const files = filtered.map(v=>v.file);
        const fileOrders = filtered.map(v=>v.key)
        // console.table(filtered)
        // console.table(fileOrders)
        // console.table(files)
        // return ;
        if(files){
            // const _files = Array.prototype.slice.call(files);
            files.forEach((v, i)=>{
                if(v){
                    formData.append(`file`,v);
                }else{
                    formData.append(`file`,new Blob([]), 'null');
                }
            })
        }


        let pm_list = null
        if(promiseInputField.input.length > 0){
            pm_list = promiseInputField.input.filter(v=>!ObjectUtils.isEmpty(v.content));
        }
        const body = {
            sale_id: props.id,
            ...inputField.input,
            ...checkListInputField.input,
            sup_list: supportInputField.input.filter(v=>v.div && v.div !== 0),
            add_list: addInputField.input.filter(v=>v.div && v.div !== 0),
            total_cms: inputField.get('ct_cms') +
                sumAdd() -
                sumSup(),
            pm_list: pm_list,
            rsv_msg_list: rsvMsgList,
            file_orders: fileOrders,
            // delete_files: deleteFiles
        }

        // console.table(body)
        // return ;
        formData.append('sale', new Blob([JSON.stringify(body)], {
            type: 'application/json'
        }))

        // for(const i of formData){
        //     console.table(i)
        // }
        // return ;

        if(props.sale_id){
            // update
            await saleApi.updateSale(formData).then(({status,data})=>{
                // console.log(`${status} ${data}`)
                if(status === 200 && data === true){
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: '판매일보가 수정되었습니다'
                    })
                    if(props.onSubmit) props.onSubmit();
                    close();
                }
            })
        }else{
            // add
            await saleApi.addSale(formData).then(({status,data})=>{
                // console.log(`${status} ${data}`)
                if(status === 200 && data === true){
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: '판매일보가 추가되었습니다'
                    })
                    if(props.onSubmit) props.onSubmit();
                    close();
                }
            })
        }
        return true;
    }

    const handleFileInput = async (e)=>{
        // const currFiles = fileInputField.input.filter(v=>v.preview)
        // const files = FileUtils.handleFilesInput(currFiles, e.target.files, 5);
        // fileInputField.putAll(files);
        if(e.target.files && e.target.files.length){
            const fileLength = e.target.files.length;
            if(fileLength > 0){
                const currFiles = fileInputField.input.filter(v=>v.preview)
                const orgLength = currFiles.length;
                const files = [...e.target.files].slice(0, Math.min(5 - orgLength, fileLength))
                const convertFiles = await FileUtils.encodeFileToBase64(files);
                let arr = [...currFiles];
                for(const index in convertFiles){
                    arr.push({
                        file: files[index],
                        preview: convertFiles[index]
                    })
                }

                if(orgLength + fileLength < 5){
                    // 추가
                    arr.push({
                        file: null,
                        preview: null
                    })
                }
                fileInputField.putAll(arr)
            }
        }
    }

    const handleClickPreviewImage = (e, i)=>{
        const previewFile = fileInputField.get(i, 'preview');
        if(previewFile !== null){
            const image = new Image();
            image.onload = ()=>{
                modal.openModal(ModalType.LAYER.Image_Preview, {
                    src: previewFile,
                    width: image.width,
                    height: image.height
                })
            }
            image.onerror = ()=>{
                modal.openModal(ModalType.SNACKBAR.Alert, {
                    msg: '이미지를 불러오는 중 오류가 발생했습니다.'
                })
            }
            image.src = previewFile
        }
    }

    const getFileCount = ()=>{
        return  fileInputField.input.filter(v=>v.preview).length;
    }

    const removeFile = (i)=>{
        const currFiles = [...fileInputField.input].filter(v=>v.preview)

        currFiles.splice(i, 1);
        if(currFiles.length < 5){
            currFiles.push({
                file: null,
                preview: null,
                key: null
            })
        }
        fileInputField.putAll(currFiles)
    }

    const showHintModal = (e)=>{
        // modal.openModal(ModalType.TOOLTIP.Hint, {
        //     msg: '하하하'
        // });
        hintBox.open(e);
    }



    return (
        <LayerModal modalRef={props.modalRef} maxWidth={1060}>
            {/*<div className={Popup.popup} style={*/}
            {/*    {*/}
            {/*        maxWidth: '1060px',*/}
            {/*    }*/}
            {/*}>*/}

            {/*</div>*/}
            <div className={Popup.popup_title}>판매일보 추가</div>

            <form className={cm(Popup.user_form, Popup.customer)}>
                <div className={Popup.popup_cont}>
                    <div className={Popup.customer_head}>
                        <div className={Popup.head_box}>
                            <DateSelectModal errorText={inputField.error.actv_dt} rootClassName={Popup.head_box}
                                             onSelect={setDate}>
                                <input type="text" className={`date ${cmc(Popup.inp)}`}
                                       value={inputField.get('actv_dt')}
                                       placeholder='개통 날짜' readOnly/>
                            </DateSelectModal>
                            <div className={`${cm(Popup.select_box, User.select_box)} select_box`}>
                                {/*<input type="hidden" id=""/>*/}
                                {/*<SelectOptionLayer initValue='개통 타입' cssModules={toCssModules(Popup, User)}*/}
                                {/*                   inputField={inputField} values={LMD.ct_actv_tp}*/}
                                {/*                   name='ct_actv_tp'/>*/}
                            </div>
                        </div>

                        <div className={cmc(Popup.tab, Popup.type2)}>
                            <TabList name='provider' inputField={inputField} theme={Popup} values={
                                LMD.provier
                            }/>
                        </div>

                        <div className={cm(Popup.head_box, Popup.fr)}>
                            <div className={Popup.font_visible}>
                                판매자
                            </div>
                            <div className={`${cm(Popup.select_box, User.select_box)} select_box`}>
                                <input type="hidden" id=""/>
                                <SelectMapLayer initValue={getInitStaffName()} cssModules={toCssModules(Popup, User)}
                                                inputField={inputField}
                                                values={staff} onChange={(v) => {
                                    inputField.put('seller_id', v)
                                }} name='seller_id'/>
                            </div>
                        </div>
                    </div>

                    <div className={cm(Popup.customer_body)}>
                        <Scrollable scrollable={props.scrollable}>
                            <div className={cm(Popup.customer_scroll)}>
                                <div className={Popup.customer_box}>
                                    <ul className={Popup.customer_list}>
                                        <AddSaleItem errorText={inputField.error.cust_nm}>
                                            <AddSaleInput inputField={inputField} name='cust_nm' subject='이름'
                                                          maxLength='8'/>
                                        </AddSaleItem>
                                        <AddSaleTabItem inputField={inputField} name='cust_gd' subject='성별 / 법인'
                                                        depth={3} values={LMD.gender}/>
                                        <AddSaleItem errorText={inputField.error.cust_tel}>
                                            <label htmlFor='cust_tel' className={Popup.customer_label}>휴대폰
                                                번호</label>
                                            <div className={Popup.customer_inp_box}>
                                                <TelePhoneInput name='cust_tel' value={inputField.get('cust_tel')}
                                                                className={cm(Popup.customer_inp)}
                                                                onChange={inputField.handleInput}/>
                                            </div>
                                        </AddSaleItem>
                                        <AddSaleItem errorText={inputField.error.cust_cd} style={{
                                            marginTop: '11.5px'
                                        }}>
                                            <label htmlFor='cust_cd' className={Popup.customer_label}>생년월일 / 사업자번호</label>
                                            <p className='hint_icon' onMouseOver={showHintModal}></p>
                                            {hintBox.component}
                                            <div className={`${Popup.customer_inp_box}`}>
                                                <CustomerCodeInput name='cust_cd' value={inputField.get('cust_cd')}
                                                                   className={cm(Popup.customer_inp)}
                                                                   onChange={inputField.handleInput} />
                                            </div>
                                        </AddSaleItem>

                                    </ul>

                                    {/*<div className={Popup.customer_text}>법인인 경우 사업등록번호 뒷 5자리를 입력해주세요.</div>*/}
                                </div>

                                <div className={Popup.customer_box}>
                                    <div className={cm(Popup.customer_title, Popup.n1)}>무선</div>

                                    <ul className={Popup.customer_list}>
                                        <AddSaleTabItem inputField={inputField} name='ct_actv_div' subject='개통 구분'
                                                        depth={2} values={LMD.ct_actv_div}/>
                                        <AddSaleItem>
                                            <AddSaleInput value={inputField.get('device_nm')}
                                                          inputField={inputField} name='device_id' subject='모델명'
                                                          search readOnly onClick={openDeviceSearchModal}/>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleInput value={inputField.get('ct_actv_plan_nm')}
                                                          inputField={inputField} name='ct_actv_plan'
                                                          subject='개통 요금제'
                                                          search readOnly onClick={openActvPlanSearchModal}/>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleInput value={inputField.get('ct_dec_plan_nm')}
                                                          inputField={inputField} name='ct_dec_plan'
                                                          subject='하향 요금제'
                                                          search readOnly onClick={openDecPlanSearchModal}/>
                                        </AddSaleItem>
                                    </ul>

                                    <ul className={Popup.customer_list}>
                                        <AddSaleItem>
                                            <label htmlFor='wt_actv_tp' className={Popup.customer_label}>개통
                                                유형</label>
                                            <div className={Popup.customer_inp_box}>
                                                <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                                    <input type="hidden" id=""/>
                                                    <SelectIndexLayer cssModules={toCssModules(Popup, User)}
                                                                      inputField={inputField}
                                                                      name='ct_actv_tp'
                                                                      error={inputField.error.ct_actv_tp}
                                                                      // value={LMD.ct_actv_tp[0]}
                                                                      values={LMD.ct_actv_tp}/>
                                                </div>
                                            </div>
                                            {/*<AddSaleSelectOptionLayer inputField={inputField} name='actv_div' subject='개통 유형' itemNames={ACTV_DIV_ITEMS}/>*/}
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <label htmlFor='device_stor' className={Popup.customer_label}>용량</label>
                                            <div className={Popup.customer_inp_box}>
                                                <div
                                                    className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                                    <input type="hidden" id=""/>
                                                    <SelectIndexLayer cssModules={toCssModules(Popup, User)}
                                                                      inputField={inputField}
                                                                      name='device_stor'
                                                                      error={inputField.error.device_stor}
                                                                      values={LMD.storage}/>
                                                </div>
                                            </div>
                                            {/*<AddSaleSelectOptionLayer inputField={inputField} name='stor' subject='용량'*/}
                                            {/*                          itemNames={STOR_ITEMS}/>*/}
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <label htmlFor='ct_istm' className={Popup.customer_label}>할부</label>
                                            <div className={Popup.customer_inp_box}>
                                                <div
                                                    className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                                    <input type="hidden" id=""/>
                                                    <SelectIndexLayer cssModules={toCssModules(Popup, User)}
                                                                      inputField={inputField}
                                                                      error={inputField.error.ct_istm}
                                                                      name='ct_istm' values={LMD.istm}/>
                                                </div>
                                            </div>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <label htmlFor='ct_cms' className={Popup.customer_label}>판매
                                                수수료(정책)</label>
                                            <div className={Popup.customer_inp_box}>
                                                <PriceInput name='ct_cms' value={inputField.get('ct_cms')}
                                                            className={`ta_r ${Popup.customer_inp}`}
                                                            onChange={inputField.handleInput}/>
                                            </div>
                                        </AddSaleItem>
                                    </ul>
                                </div>

                                <div className={Popup.customer_box}>
                                    <div className={cm(Popup.customer_title, Popup.n2)}>체크리스트</div>

                                    <ul className={`${cm(Popup.popup_check_list, Popup.customer_list)} ${cmc(Popup.type2)}`}>
                                        <AddSaleCheckItem subject='유선' onClick={openWtSelectModal}
                                                          checked={checkBit.get(0)}/>
                                        <AddSaleCheckItem subject='세컨 디바이스' onClick={openSecondModal}
                                                          checked={checkBit.get(1)}/>
                                        <AddSaleCheckItem subject='카드' onClick={openCardModal}
                                                          checked={checkBit.get(2)}/>
                                        <AddSaleCheckItem subject='중고폰' onClick={openUsedPhoneModal}
                                                          checked={checkBit.get(3)}/>
                                        <AddSaleCheckItem subject='부가서비스' onClick={openExsvcModal}
                                                          checked={checkBit.get(4)}/>
                                        <AddSaleCheckItem subject='결합' onClick={openCombModal}
                                                          checked={checkBit.get(5)}/>
                                        <AddSaleCheckItem subject='가족 등록' onClick={() => {
                                            checkBit.toggle(6)
                                        }} checked={checkBit.get(6)}/>
                                        <AddSaleCheckItem subject='지인' onClick={() => {
                                            checkBit.toggle(7)
                                        }} checked={checkBit.get(7)}/>
                                    </ul>
                                </div>

                                <div className={cm(Popup.customer_box, Popup.price)}>
                                    <PriceHalfBox type={0} inputField={supportInputField}
                                                  provider={inputField.get('provider')}/>
                                    <PriceHalfBox type={1} inputField={addInputField}
                                                  provider={inputField.get('provider')}/>

                                    <div className={Popup.price_total}>
                                        <ul className='price_list'>
                                            <li className={Popup.price_item}>
                                                <div className={Popup.price_num}>{NumberUtils.toPrice(sumCms())}원
                                                </div>
                                                <div className={Popup.price_text}>유/무선 판매 수수료</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.plus)}>
                                                <div className={Popup.price_num}>{NumberUtils.toPrice(sumUsedDeviceCms())}원</div>
                                                <div className={Popup.price_text}>중고폰 판매금액</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.plus)}>
                                                <div
                                                    className={Popup.price_num}>{NumberUtils.toPrice(sumAdd())}원
                                                </div>
                                                <div className={Popup.price_text}>추가</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.minus)}>
                                                <div
                                                    className={Popup.price_num}>{NumberUtils.toPrice(sumSup())}원
                                                </div>
                                                <div className={Popup.price_text}>지원</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.sum)}>
                                                <div className={Popup.price_num}>{
                                                    NumberUtils.toPrice(
                                                        sumCms() +
                                                        sumUsedDeviceCms() +
                                                        sumAdd() -
                                                        sumSup()
                                                    )
                                                }원
                                                </div>
                                                <div className={Popup.price_text}>총이익</div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className={Popup.price_data}>
                                        <div className={Popup.data_half}>
                                            <div className={Popup.data_group}>
                                                <div className={cm(Popup.data_box, Popup.n5)}>
                                                    <div className={Popup.data_title}>서류 및 견적서</div>
                                                    <div className={Popup.data_area}>
                                                        <div className={Popup.data_text}>
                                                            <div>사진<span>({getFileCount()}/5)</span></div>
                                                            <p>* 30MB 미만의 .jpg, .peg, .png 파일을 올릴 수 있어요<br/>
                                                                * 사진을 섞어서 배치할 수 있어요.
                                                            </p>
                                                        </div>
                                                        <div className={Popup.data_upload_box}>
                                                            {
                                                                fileInputField.input && fileInputField.input.map((v, i) => {
                                                                    return <div key={i} className={Popup.data_upload}>
                                                                        <label htmlFor={`file_${i}`}
                                                                               className={Popup.upload_btn} style={{
                                                                            display: v.preview ? 'none' : ''
                                                                        }}>업로드
                                                                        </label>
                                                                        <input type="file" id={`file_${i}`} multiple
                                                                               name={`file_${i}`}
                                                                               onChange={handleFileInput} style={{
                                                                            visibility: "hidden"
                                                                        }}/>
                                                                        <img src={v.preview} alt='' style={{
                                                                            display: "inline-block",
                                                                            top: 0,
                                                                            left: 0,
                                                                            position: "absolute"
                                                                        }} onClick={e => {
                                                                            handleClickPreviewImage(e, i)
                                                                        }}/>
                                                                        {
                                                                            (i < fileInputField.length() && v.preview) &&
                                                                            <button type="button"
                                                                                    className={Popup.delete_btn}
                                                                                    onClick={() => {
                                                                                        removeFile(i)
                                                                                    }}>삭제
                                                                            </button>
                                                                        }

                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                {/*<div className={cm(Popup.data_box, Popup.n2)}>*/}
                                                {/*    <div className={Popup.data_title}>견적서</div>*/}
                                                {/*    <div className={Popup.data_area}>*/}
                                                {/*        <div className={Popup.data_upload}>*/}
                                                {/*            <label htmlFor='estimate' className={Popup.upload_btn}>업로드*/}
                                                {/*            </label>*/}
                                                {/*            <input type="file" id='estimate' name='estimate'*/}
                                                {/*                   onChange={handleFileInput} style={{*/}
                                                {/*                visibility: "hidden"*/}
                                                {/*            }}/>*/}

                                                {/*        </div>*/}
                                                {/*        <img src={previewEstimate} alt=''/>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                            </div>

                                            <div className={cm(Popup.data_box, Popup.n3)}>
                                                <div className={Popup.data_title}>비고</div>
                                                <div className={Popup.data_area} style={{
                                                    padding: '3px'
                                                }}>
                                                    <textarea className={Popup.data_textarea} name='sale_memo'
                                                              value={inputField.get('sale_memo')}
                                                              onChange={inputField.handleInput}></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={Popup.data_half}>
                                            <div className={cm(Popup.data_box, Popup.n4)}>
                                                <div className={Popup.data_title}>고객 약속</div>
                                                <div className={Popup.data_area} style={{
                                                    overflowY: 'scroll'
                                                }}>
                                                    <ul className={Popup.popup_check_list}>
                                                        {
                                                            promiseInputField.length() > 0 && promiseInputField.input.map((v, i) => {
                                                                return <li key={i} className={Popup.li}>
                                                                    <input type="checkbox" name={`apm${i}`}
                                                                           className={Popup.check_inp}
                                                                           checked={promiseInputField.get(i, 'checked')}
                                                                           readOnly/>
                                                                    <label htmlFor={`apm${i}`}
                                                                           className={Popup.check_label}
                                                                           onClick={() => {
                                                                               promiseInputField.put(i, 'checked', !promiseInputField.get(i, 'checked'))
                                                                           }}>
                                                                    </label>
                                                                    <input type="text" className={Popup.check_text}
                                                                           value={promiseInputField.get(i, 'content')}
                                                                           onChange={e => {
                                                                               promiseInputField.put(i, 'content', e.target.value)
                                                                           }}
                                                                           placeholder='내용을 입력해주세요'/>
                                                                    {/*<input type="text" className={Popup.inp} value={apmInputField.contents[i]} onChange={e=>{*/}
                                                                    {/*    apmInputField.putContent(i, e.target.value)*/}
                                                                    {/*}}/>*/}
                                                                    <button type="button" className={Popup.check_del}
                                                                            onClick={() => {
                                                                                promiseInputField.removeItem(i)
                                                                            }}>삭제
                                                                    </button>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                    <button type="button"
                                                            className={`${cmc(Popup.btn, Popup.btn_add_icon)}`}
                                                            onClick={()=>{
                                                                if(!promiseInputField.isEmpty(promiseInputField.length()-1, 'content')) {
                                                                    promiseInputField.addItem()
                                                                }
                                                            }}>추가하기
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Scrollable>
                        <div className={Popup.popup_btn_box}>
                            <button type="button" className={`btn_blue ${cmc(Popup.btn)}`}
                                    onClick={onSubmit}>저장
                            </button>
                        </div>
                    </div>
                </div>

            </form>

            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}

function PriceHalfBox({type = 0, inputField, provider}) {

    return (
        <div className={Popup.half_box}>
            <div className={cm(Popup.customer_title, Popup[`n${type + 3}`])}>{type === 0 ? '지원' : '추가'}
                <button type="button"
                        className={`btn_blue ${cmc(Popup.btn, Popup.btn_medium)}`}
                        onClick={()=>{
                            if(inputField.length() < 6) {
                                inputField.addItem()
                            }
                        }}>항목추가
                </button>
            </div>

            <table className={Popup.tb_price}>
                <caption>지원 테이블 - 구분, 금액 정보 제공</caption>
                <colgroup>
                    <col style={{width: '35%'}}/>
                    <col/>
                    <col style={{width: '12%'}}/>
                </colgroup>
                <thead className={Popup.thead}>
                <tr>
                    <th className={Popup.th} scope="col">구분</th>
                    <th className={Popup.th} scope="col">금액</th>
                    <th className={Popup.th} scope="col"></th>
                </tr>
                </thead>
                <tbody className={Popup.tbody}>
                {
                    inputField.input && inputField.input.map((v, i) => {
                        // console.log(`[${type}]  %${i}`)
                        // console.table(v)
                        return <tr key={i}>
                            <td className={Popup.td}>
                                <div className={`${cmc(User.select_box, Popup.select_box)}`}>
                                    <DynamicSelectButton type={DYNAMIC_TYPE.sup_div + type} provider={provider}
                                                         value={v.name} onChange={v => {
                                        inputField.put(i, 'div', v.id)
                                        inputField.put(i, 'name', v.name)
                                    }}/>
                                    {/*<button type="button" className={Popup.dynamic_btn}*/}
                                    {/*        onClick={(e) => {*/}
                                    {/*            const {top, left} = MouseEventUtils.getAbsolutePos(e);*/}
                                    {/*            modal.openModal(ModalType.MENU.Dynamic_Select, {*/}
                                    {/*                top: `${top}px`,*/}
                                    {/*                left: `${left}px`,*/}
                                    {/*                type: DYNAMIC_TYPE.sup_div+type,*/}
                                    {/*                provider: provider,*/}
                                    {/*                onSubmit: ({id, name})=>{*/}
                                    {/*                    console.log(`${id} ${name}`)*/}
                                    {/*                    inputField.put(i, 'div', id)*/}
                                    {/*                    inputField.put(i, 'name', name)*/}
                                    {/*                }*/}
                                    {/*            })*/}
                                    {/*        }}>{v.name}*/}
                                    {/*</button>*/}
                                    {/*<DynamicSelectLayer initValue={v.name}*/}
                                    {/*                    type={type} onClick={({id, name}) => {*/}
                                    {/*    // console.log(v)*/}
                                    {/*    inputField.put(i, `div`, id);*/}
                                    {/*}}/>*/}
                                </div>
                            </td>
                            <td className={Popup.td}>
                                <PriceInput className={`ta_r ${cmc(Popup.inp)}`}
                                            value={inputField.get(i, `amount`)} onChange={(e) => {
                                    inputField.put(i, `amount`, e.target.value)
                                }}/>
                            </td>
                            <td className={Popup.td}>
                                <button type="button" className={cm(Popup.btn_del)} onClick={() => {
                                    inputField.removeItem(i)
                                }}>삭제
                                </button>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    )
}


export default SaleDetailModal;