import {useRef, useState} from "react";
import useApi from "../hook/useApi";
import axiosInstance from "../utils/axiosInstance";
import useModal from "../hook/useModal";
import axios from "axios";
import {ModalType} from "../common/modal/ModalType";

function MultipartTest(){
    const modal = useModal();
    const {testApi} = useApi();

    const [file, setFile] = useState({
        spec: null,
        file: null
    });

    const fileRef = useRef();

    const handleFileInput = e=>{
        console.log(e.target.files[0])
        setFile(prev=>({
            ...prev,
            "file": e.target.files[0]
        }))
    }

    const sale = {
        cust_nm: 'chan',
        cust_tel: '01045240737',
        cust_cd: '001104'
    }

    const submit = async ()=>{
        // console.table(file)
        const formData = new FormData();
        console.log(file.file)
        formData.append('file',file.file);
        formData.append('sale', new Blob([JSON.stringify(sale)], {
            type: 'application/json'
        }));

        const option = {
            headers:{
                'Content-Type': 'multipart/form-data',
                "Accept": "application/json",
                "Access-Control-Allow-Origin": `http://localhost:3000`,
                'Access-Control-Allow-Credentials':"true"
            },
            // transformRequest: (data, headers)=>{
            //     console.log(`transform request`)
            //     console.log(data)
            //     console.table(headers)
            //     return data;
            // }
        }

        await axios.post('/api/v1/test/multipart', formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then(res=>{
            if(res.status === 200){
                modal.openModal(ModalType.SNACKBAR.Alert,{
                    msg: '전송되었습니다'
                })
            }
        }).catch((e)=>{
            modal.openModal(ModalType.SNACKBAR.Alert,{
                msg: `전송에 실패하였습니다: ${e}`
            })
        })

        // await testApi.sendMultipartFile(formData, option).then(({status,data})=>{
        //     if(status === 200){
        //         modal.openModal(ModalType.SNACKBAR.Alert,{
        //             msg: '전송되었습니다'
        //         })
        //     }
        // })
    }


    return (
        <div >
            <h3>이미지를 업로드해주세요</h3>
            {/*<div className='d-flex flex-row justify-content-center align-items-center mt-5'>*/}
            {/*    <h4>견적서</h4>*/}
            {/*    <input type="file" name='spec' onChange={handleFileInput}/>*/}
            {/*</div>*/}
            <div className='d-flex flex-row justify-content-center align-items-center mt-4'>
                <h4>파일</h4>
                <input type="file" name='file' onChange={handleFileInput}/>
            </div>
            <div className='mt-3'>
                <button className='btn btn-outline-primary' onClick={submit}>전송</button>
            </div>
        </div>
    )
}

export default MultipartTest;