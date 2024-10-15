import {useRef, useState} from "react";
import useValidateInputField from "../hook/useValidateInputField";
import useApi from "../hook/useApi";
import {ObjectUtils} from "../utils/objectUtil";
import testImg from "../../images/profile_img2.jpg"
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";

function FileUploadTest(){
    const modal = useModal();
    const {testApi, userApi} = useApi();
    const [file, setFile] = useState(null)
    const [uploadPreview, setUploadPreview] = useState(null)
    const [downloadPreview, setDownlaodPreview] = useState(null)

    const [lastFilePath, setLastFilePath] = useState(null)

    const handleFileInput = e=>{
        const files = e.target.files;
        setFile(files[0])
        if(files){
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onloadend = ()=>{
                setUploadPreview(reader.result)
            }
        }
    }

    const upload = ()=>{
        if(file){
            const formData = new FormData();
            formData.append('file', file);

            testApi.uploadFile(formData).then(({status,data})=>{
                if(status === 200 && data){
                    console.table(data)
                    setLastFilePath(data)
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: '파일을 저장했습니다'
                    })
                }else{
                    setLastFilePath(null)
                }
            })
        }
    }

    const getFile = async ()=>{
        if(lastFilePath){
            console.log(`path: ${lastFilePath}`)
            await testApi.downloadFile(lastFilePath).then(({status,data})=>{
                if(status === 200 && data){
                    const url = window.URL.createObjectURL(data)
                    console.table(url)
                    // console.table(data)
                    setDownlaodPreview(url)
                }
            })
        }
    }

    return (
        <div style={{
            backgroundColor: '#bdbdbd',
            height: '700px',
            // flexDirection: 'row',
            // flex: "auto"
        }}>
            <div>
                <div>
                    <label htmlFor="imgFile" style={{
                        width: "75px",
                        heigh: '100%',
                        fontSize: '15px',
                        backgroundColor: 'rgb(95,210,157)'
                    }}>
                        파일 업로드
                    </label>
                    <input className='icon-file' style={{
                        visibility: "hidden"
                    }} type="file" id='imgFile' onChange={handleFileInput}/>
                </div>
                <button type='button' style={{
                    padding: '15px',
                    backgroundColor: '#7290da'
                }} onClick={upload}>upload
                </button>
                <button type='button' style={{
                    padding: '15px',
                    backgroundColor: '#ea90d5'
                }} onClick={getFile}>download
                </button>
                <div style={{
                    maxWidth: '500px'
                }}>
                    <img src={uploadPreview ? uploadPreview : testImg} alt=""/>
                </div>
            </div>
            <hr/>
            <div>
                <div style={{
                    maxWidth: '500px'
                }}>
                    <img src={downloadPreview} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default FileUploadTest;