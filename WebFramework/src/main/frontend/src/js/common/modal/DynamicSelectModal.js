import {MenuModal} from "./MenuModal";
import {cm} from "../../utils/cm";
import Popup from "../../../css/popup.module.css";
import {useEffect, useRef, useState} from "react";
import useUserInfo from "../../hook/useUserInfo";
import useApi from "../../hook/useApi";
import {useObjectArrayInputField} from "../../hook/useObjectArrayInputField";
import {MouseEventUtils} from "../../utils/MouseEventUtils";
import {ModalType} from "./ModalType";
import useModal from "../../hook/useModal";
import {ObjectUtils} from "../../utils/objectUtil";

export const DYNAMIC_TYPE = {
    device: 0,
    sec_device: 1,
    ct_plan: 2,
    internet_plan: 3,
    tv_plan: 4,
    exsvc: 5,
    sup_div: 6,
    add_div: 7,
    comb_tp: 8
}

export function DynamicSelectModal(props){
    const modal = useModal();
    const userInfo = useUserInfo();

    const {gmdApi} = useApi();

    const [keyword, setKeyword] = useState('')

    const [orgCount, setOrgCount] = useState(0)

    // const [items, setItems] = useState(null)
    const [boxWidth, setBoxWidth] = useState(150)
    const [boxHeight, setBoxHeight] = useState(250)

    const scrollRef = useRef()

    const inputField = useObjectArrayInputField({
        name: ''
    }, null)

    const [selected, setSelected] = useState(null)

    const [inputFocus, setInputFocus] = useState(null)
    const prevFocus = useRef(null)
    const focusRef = useRef([])

    useEffect(() => {
        setKeyword('')
    }, []);

    useEffect(() => {
        getItems();
    }, [keyword]);


    useEffect(() => {
        let maxLength = 12;
        if(inputField.input){
            inputField.input.forEach((v,i)=>{
                if(v.name.length > maxLength){
                    maxLength = v.name.length
                }
            })
        }
        if(maxLength !== 0){
            setBoxWidth(maxLength * 18)
        }
    }, [inputField]);

    useEffect(() => {
        // console.table(scrollRef.current.style)
        const target = scrollRef.current;
        if(props.scrollable === false){
            target.style.pointerEvents = 'none'
        }else if(props.scrollable === true){
            target.style.pointerEvents = 'auto'
        }
    }, [props.scrollable]);

    useEffect(() => {
        if(prevFocus.current !== null && inputFocus === null){
            onUpdate(prevFocus.current)
        }
        if(inputFocus){
            focusRef.current[inputFocus].focus();
        }
        return ()=>{
            prevFocus.current = inputFocus
        }
    }, [inputFocus]);

    const close = ()=>{
        modal.closeModal(ModalType.MENU.Dynamic_Select)
    }

    const getItems = async ()=>{
        // console.log(props.type)
        console.log(props.provider)
        await gmdApi.getData(props.type, keyword, props.provider).then(({status,data})=>{
            if(status === 200 && data){
                if(data.list){
                    // console.table(data)
                    const parsed = JSON.parse(data.list)
                    // console.table(parsed)
                    inputField.setInput(parsed)
                    setOrgCount(parsed.length)
                }else{
                    inputField.putAll([{
                        name: ''
                    }])
                    setOrgCount(0)
                }

            }
        })
    }

    const selectItem = (index, id)=>{
        if(props.onSubmit){
            props.onSubmit({
                id: id,
                name: inputField.get(index, 'name')
            })
        }
        close()
    }

    const onUpdate = (i)=>{
        if(i < orgCount){
            updateItem(i)
        }else{
            insertAll();
        }
    }

    const clearEmptyObject = ()=>{
        const copy = inputField.input.filter(v=>v.name)
        inputField.setInput(copy)
    }

    const addItem = (e)=>{
        e.stopPropagation()
        if(!ObjectUtils.isEmpty(inputField.get(inputField.length()-1, 'name'))){
            inputField.addItem();
            setInputFocus(inputField.length())
        }else{
            setInputFocus(inputField.length()-1)
        }
    }

    const insertAll = async ()=>{
        const body = inputField.input.filter((v,i)=>v.name && i>=orgCount).map(v=>{
            return {
                provider: props.provider,
                name: v.name
            }
        })
        // console.table(body)
        clearEmptyObject()
        if(ObjectUtils.isEmptyArray(body)){
            return;
        }
        await gmdApi.insertAll(props.type, body).then(({status,data})=>{
            if(status === 200 && data){
                getItems();
                setInputFocus(null)
                setSelected(null)
            }
        })
    }

    const deleteItem = async (id)=>{
        await gmdApi.deleteAll(props.type, [id]).then(({status,data})=>{
            if(status === 200 && data){
                getItems();
                setInputFocus(null)
                setSelected(null)
                // e.blur();
            }
        })
    }

    const updateItem = async (i)=>{
        const body = {
            ...inputField.input[i],
            provider: props.provider
        }
        console.table(body)
        // return;
        await gmdApi.updateItem(props.type, body).then(({status,data})=>{
            if(status === 200 && data){
                getItems();
                setInputFocus(null)
                setSelected(null)
            }
        })
    }

    const openMoreModal = (e, i, id)=>{
        const {top, left} = MouseEventUtils.getAbsolutePos(e);

        setSelected(i)

        modal.openModal(ModalType.MENU.More_Option, {
            top: `${top-10}px`,
            left: `${left-150}px`,
            onSubmit: (action)=>{
                if(action === 0){ // 수정
                    setInputFocus(i)
                }else if(action === 1){ // 삭제
                    deleteItem(id)
                }
                setSelected(null)
            }
        })
    }

    return (
        <MenuModal modalRef={props.modalRef} top={props.top} left={props.left}>
            <div className={cm(Popup.select_box2, Popup.active)}
                 style={{
                     width: `${boxWidth}px`,
                     // height: `${boxHeight}px`,
                     // overflowY: 'scroll'
                 }}  onClick={e=>{
                setInputFocus(null)
            }}>
                <input type="text" className={cm(Popup.select_inp)}
                       value={keyword}
                       onChange={e => {
                           setKeyword(e.target.value)
                       }}
                       placeholder="옵션 검색"/>
                <div className={cm(Popup.select_layer, Popup.active)}>
                    <button type='button' className={Popup.layer_title} onClick={addItem}>옵션 추가하기</button>
                    <ul className="layer_list" ref={scrollRef} style={{
                        overflowY: "scroll",
                        height: `${boxHeight}px`
                    }}>
                        {
                            inputField.input && inputField.input.map((v, i) => {
                                return <li key={i} className={cm(Popup.layer_item, `${selected === i && Popup.active} ${inputFocus === i && Popup.focus_input}`)}>
                                    <span className={Popup.layer_type}></span>
                                    <input type="text" className={Popup.layer_btn}
                                           value={v.name}
                                           placeholder='입력해주세요'
                                           ref={v=>{
                                               focusRef.current[i] = v
                                           }}
                                           // autoFocus={i === inputFocus}
                                           onClick={e => {
                                               if (i === inputFocus) {
                                                   e.stopPropagation()
                                                   setInputFocus(i)
                                               } else if(inputFocus !== null){

                                               }else {
                                                   e.stopPropagation()
                                                   selectItem(i, v.id)
                                               }
                                           }}
                                        // onBlur={e=>{
                                        //     console.log(`blur: ${inputField.get(i, 'name')}`)
                                        // }}
                                        //    onFocusCapture={e=>{
                                        //        console.log(`focus capture: ${inputField.get(i, 'name')}`)
                                        //    }}
                                           onKeyDown={e => {
                                               if (inputFocus === i && e.keyCode === 13) {
                                                   setInputFocus(null)
                                               }
                                           }}
                                           onChange={e => {
                                               inputField.put(i, 'name', e.target.value)
                                           }} readOnly={i !== inputFocus}/>
                                    {/*<button type="button" className={Popup.layer_btn} onClick={() => {*/}
                                    {/*    selectItem(i, v.id);*/}
                                    {/*}}>{v.name}</button>*/}
                                    <button type="button" className={Popup.layer_more_btn} onClick={(e) => {
                                        openMoreModal(e, i, v.id)
                                    }}>더보기
                                    </button>
                                    {/*<MoreItem/>*/}
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </MenuModal>
    )
}