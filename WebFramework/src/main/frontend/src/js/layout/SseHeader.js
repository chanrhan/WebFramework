import {useEffect} from "react";
import {useDispatch} from "react-redux";
import useEmitter from "../hook/useEmitter";

function SseHeader(){
    const emitter = useEmitter();

    useEffect(()=>{
        emitter.connect();
        addEventListeners();
    },[])

    const onConnect = (e)=>{
        const { data: receivedConnectData } = e;
        console.log('connect event data: ',receivedConnectData);
    }

    const onNote = (e)=>{
        const { data: receivedConnectData } = e;
        alert(`메세지가 도착했습니다 ${receivedConnectData}`);

    }

    const addEventListeners =()=>{
        emitter.addEventListener('connect', onConnect);
        // emitter.addEventListener('note', onNote);
    }
}

export default SseHeader;