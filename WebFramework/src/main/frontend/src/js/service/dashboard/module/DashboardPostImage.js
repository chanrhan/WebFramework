import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";
import {useEffect, useState} from "react";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import useApi from "../../../hook/useApi";
import {useFileLoader} from "../../../hook/useFileLoader";
import {ObjectUtils} from "../../../utils/objectUtil";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {useArrayInputField} from "../../../hook/useArrayInputField";
import {useSelector} from "react-redux";

export function DashboardPostImage({}){
    const userInfo = useSelector(state=>state.userReducer);
    const modal = useModal();
    const fileLoader = useFileLoader()
    const {pimgApi} = useApi();
    const inputField = useObjectArrayInputField({
        id: 0,
        text: '',
        file: null,
        preview: null
    })
    const preview = useArrayInputField([null])

    useEffect(() => {
        getPostImages()
    }, [userInfo]);

    const getPostImages = async ()=>{
        await pimgApi.getPostImageAll().then(async ({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                inputField.setInput(data)

                getImage(data).then(arr=>{
                    preview.setInput(arr)
                })
            }
        })
    }

    const getImage = async (list)=>{
        const copy = new Array(list.length);
        for(let i=0;i<list.length;++i){
            await fileLoader.pimg(list[i].file).then(url=>{
                copy[i] = url;
            })
        }
        return copy;
    }


    const onInputBlur = (i)=>{
        const text = inputField.get(i, 'text');
        if(ObjectUtils.isEmpty(text)){
            return;
        }

        updatePostImage(i)
    }

    const handleFileInput = (e, i)=>{
        const file = e.target.files[0]
        inputField.put(i, 'file', file);
        if(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = ()=> {
                preview.put(i, reader.result)
            }

            updatePostImage(i, file)
        }
    }

    const handleClickPreviewImage = (e, i)=>{
        const previewFile = preview.get(i)
        if(!ObjectUtils.isEmpty(previewFile)){
            console.table(previewFile)
            const image = new Image();
            image.onload = ()=>{
                const yOffset = window.pageYOffset;
                modal.openModal(ModalType.LAYER.Image_Preview, {
                    top: yOffset,
                    src: previewFile,
                    width: image.width,
                    height: image.height
                })
            }
            image.onerror = (e)=>{
                modal.openModal(ModalType.SNACKBAR.Alert, {
                    msg: '이미지를 불러오는 중 오류가 발생했습니다.'
                })
            }
            image.src = previewFile
        }
    }

    const updatePostImage = async (i, file)=>{
        const id = inputField.get(i, 'id')
        const text = inputField.get(i, 'text');
        const formData = new FormData();
        if(file){
            formData.append('file', file)
        }

        const body = {
            pimg_id: id,
            text: text
        };
        // console.table(body)
        // return;

        formData.append('body', new Blob([JSON.stringify(body)], {
            type: 'application/json'
        }))

        if(id === 0 || id === null){
            pimgApi.addPostImage(formData).then(({status,data})=>{
                if(status === 200 && data){
                    inputField.put(i, 'id', data);
                }
            })
        }else{
            pimgApi.updatePostImage(formData);
        }
    }

    const deletePostImage = async (i)=>{
        const id = inputField.get(i, 'id');
        if(id === 0){
            inputField.removeItem(i)
            preview.removeItem(i)
        }else{
            await pimgApi.deletePostImage(id).then(({status,data})=>{
                if(status === 200 && data){
                    inputField.removeItem(i)
                    preview.removeItem(i)
                }
            })
        }
    }

    return (
        <div className={cm(Dashboard.panel_group)}>
            <div className={cm(Dashboard.panel, Dashboard.n5)}>
                <button type="button" className="btn btn_blue btn_small btn_add_icon" onClick={()=>{
                    inputField.addItem();
                    preview.addItem();
                }}>추가</button>
                <ul className={cm(Dashboard.panel_list)}>
                    {
                        inputField.input && inputField.input.map((v,i)=> {
                            const src = preview.get(i)
                            return <li key={i} className={cm(Dashboard.panel_item)}>
                                <div className={cm(Dashboard.panel_item_head)}>
                                    <input type="text" className={cm(Dashboard.panel_item_text)}
                                           value={v.text}
                                           onChange={e=>{
                                               inputField.put(i,'text', e.target.value)
                                           }}
                                           placeholder='텍스트를 입력하세요' onBlur={()=>{
                                               onInputBlur(i)
                                    }}/>
                                    <button type="button" className={cm(Dashboard.panel_item_del)} onClick={()=>{
                                        deletePostImage(i)
                                    }}>삭제</button>
                                </div>
                                <div className={cm(Dashboard.panel_item_body)}>
                                    <input type="file" id={`pimg_${i}`} onChange={e=>{
                                        handleFileInput(e, i)
                                    }} style={{
                                        visibility: "hidden"
                                    }}/>
                                    <img src={src} alt="" style={{
                                        maxWidth: '100%',
                                        height: '100%'
                                    }} onClick={e=>{
                                        handleClickPreviewImage(e, i)
                                    }}/>
                                    <label htmlFor={`pimg_${i}`} className={`${!src && Dashboard.panel_item_add}`}>추가</label>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
