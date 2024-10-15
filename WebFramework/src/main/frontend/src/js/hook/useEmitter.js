import {useDispatch, useSelector} from "react-redux";
import {sseActions} from "../store/slices/sseSlice";
import {EventSourcePolyfill} from "event-source-polyfill";

function useEmitter(){
    const dispatch = useDispatch();
    const {accessToken} = useSelector(state=>state.authReducer)
    const {sse} = useSelector(state=>state.sseReducer)

    const connect = ()=>{
        // console.log(`sse connent: ${accessToken}`)
        const evtSrc = new EventSourcePolyfill("http://localhost:8080/sse/connect",{
            headers:{
                'X-ACCESS-TOKEN': accessToken
            }
        });
        dispatch(sseActions.setEventSource(evtSrc));
    }

    const addEventListener = (type, callback)=>{
        dispatch(sseActions.addEventListener({
            type: type,
            callback: callback
        }));
    }

    return {
        sse,
        connect,
        addEventListener
    }
}

export default useEmitter;