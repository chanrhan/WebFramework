import useApi from "../hook/useApi";
import {useEffect, useState} from "react";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";

export function StudyMain(){
    const modal = useModal();
    const {studyApi} = useApi();

    const [nodes, setNodes] = useState(null)
    const [nodeCount, setNodeCount] = useState(0)

    useEffect(() => {
        getNode(0)
    }, []);

    const getNode = async (parentId)=>{
        studyApi.getNode(parentId).then(({status, data})=>{
            if(status === 200 && data){
                if(data.cnt){
                    setNodeCount(data.cnt)
                }
                if(data.list){
                    setNodes(JSON.parse(data.list))
                }else{
                    setNodes(null)
                }
            }
        })
    }

    const addNode = async ()=>{
        modal.openModal(ModalType.LAYER.Add_Study_Node)
    }


    return (
        <div>
            <h1>Private Study</h1>

            <p> 목록 </p>

            <div>
                <div>
                    <button onClick={addNode}>추가</button>
                </div>
                {
                    nodes && nodes.map((v,i)=>{
                        return (
                            <div>
                                <p>{v.subject}</p>
                                <p>{v.description}</p>
                                <p>{v.content}</p>
                                <p>{v.last_modified_dt}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
