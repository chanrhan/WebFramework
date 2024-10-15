import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../store/slices/userSlice";
import {LayerModal} from "../../common/modal/LayerModal";
import {ObjectUtils} from "../../utils/objectUtil";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import {HttpStatusCode} from "axios";
import useApi from "../../hook/useApi";

const nicknameByRole = {
    REPS: ['매니저','컨설턴트','CS','인턴'],
    BM: ['점장','실장','팀장','소사장'],
    STF: ['대표','관리자','팀장','점장'],
}

function ChangeNicknameModal({user}){
    const {userApi} = useApi();
    const modal = useModal();
    const dispatch = useDispatch();
    const {accessToken} = useSelector(state=>state.authReducer);

    const [nicknameList, setNicknameList] = useState([]);
    const [nickname, setNickname] = useState(null);
    const [check, setCheck] = useState(0);
    const [customInput, setCustomInput] = useState('');
    const [blockCustomInput, setBlockCustomInput] = useState(true);

    useEffect(()=>{
        if(!ObjectUtils.isEmptyMap(user)){
            setNicknameList(nicknameByRole[user.role]);
        }
    },[user])

    // check 시 체크가 안바뀜 이거 checked 속성을 고정시켜서 그런듯

    useEffect(()=>{
        if(ObjectUtils.isEmpty(nicknameList)){
           return;
        }
        if(ObjectUtils.isEmpty(user.nickname)){
            setNickname(nicknameList[0])
        }else{
            setNickname(user.nickname)
            const idx = nicknameList.indexOf(user.nickname);
            if(idx !== -1){
                setCheck(idx);
            }else{
                setCheck(4);
                setBlockCustomInput(false);
                setCustomInput(user.nickname)
            }
        }
    }, [nicknameList])

    useEffect(()=>{
        // console.log(`check: ${check}`)
        if(check === 4){
            setNickname(customInput);
            setBlockCustomInput(false);
        }else{
            setNickname(nicknameList[check]);
            setBlockCustomInput(true);
        }
    },[check])

    const handleCheck = (e)=>{
        setCheck(Number(e.target.getAttribute('check-idx')));
    }

    const handleCustomInput = (e)=>{
        setNickname(e.target.value)
        setCustomInput(e.target.value);
    }

    const submit = async ()=>{
        await userApi.updateNickname(nickname).then(({status,data})=>{
            if(status === 200){
                updateUserInfo();
                modal.openModal(ModalType.SNACKBAR.Alert, {
                    msg: '호칭이 변경되었습니다'
                })
            }
        })

    }

    const updateUserInfo = async ()=>{
        await userApi.getUser().then(({status, data})=>{
            if(status === HttpStatusCode.Ok){
                dispatch(userActions.setUserInfo(data));
            }
        })

    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Change_Nickname);
    }

    return (
        <LayerModal width='60%' height='70%'>
            <div className='d-flex flex-column align-items-center mt-5'>
                <h3>글을 작성할 때 표시되는 호칭을 설정해 주세요</h3>
                <div className='d-flex flex-row justify-content-center'>
                    <h4 className='border border-1 p-3'><b>예시</b></h4>
                    <h4 className='border border-1 p-3'>{user.name} <b className='text-primary'>{nickname}</b></h4>
                </div>
                <div className='border border-dark p-3 ' style={{width: '60%'}}>
                    <div className='d-flex flex-row justify-content-center '>
                        <input type="radio" name='nickname' check-idx={0}  onChange={handleCheck} checked={0 === check}/>
                        <h3 className='ms-2'>{nicknameList[0]}</h3>
                        <input className='ms-5' type="radio" name='nickname' check-idx={1}  onChange={handleCheck} checked={1 === check}/>
                        <h3 className='ms-2'>{nicknameList[1]}</h3>
                    </div>
                    <div className='d-flex flex-row justify-content-center align-items-center mt-4'>
                        <input type="radio" name='nickname' check-idx={2} onChange={handleCheck} checked={2 === check}/>
                        <h3 className='ms-2'>{nicknameList[2]}</h3>
                        <input className='ms-5' type="radio" name='nickname' check-idx={3} onChange={handleCheck} checked={3 === check}/>
                        <h3 className='ms-2'>{nicknameList[3]}</h3>
                    </div>
                    <div className='mt-3 d-flex flex-row justify-content-center'>
                        <input type="radio" name='nickname' check-idx={4} onChange={handleCheck} checked={4 === check}/>
                        <input className='ms-3' type="text" value={customInput} placeholder='직접입력' disabled={blockCustomInput} onChange={handleCustomInput} />
                    </div>
                </div>
                <div className='d-flex flex-row justify-content-center mt-5'>
                    <button className='btn btn-outline-primary' onClick={close}>취소</button>
                    <button className='btn btn-primary ms-4' onClick={submit}>확인</button>
                </div>
            </div>
        </LayerModal>
    )
}

export default ChangeNicknameModal;