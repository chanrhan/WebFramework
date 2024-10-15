import Layout from "../../../css/layout.module.css"
import {cm} from "../../utils/cm";
import {useEffect, useRef, useState} from "react";
import useApi from "../../hook/useApi";
import {ObjectUtils} from "../../utils/objectUtil";
import {useRenderlessModal} from "../../hook/useRenderlessModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import useUserInfo from "../../hook/useUserInfo";

export function HeaderSearchLayer({}){
    const renderlessModal = useRenderlessModal('RDL_HEADER_SEARCH');
    const {saleApi} = useApi();
    const [keyword, setKeyword] = useState('')
    const [items, setItems] = useState(null)
    const userInfo = useUserInfo();
    const modal = useModal();

    useEffect(() => {
        if(keyword){
            renderlessModal.open();
            search()
        }else{
            renderlessModal.close();
        }
    }, [keyword]);

    const search = async ()=>{
        if(ObjectUtils.isEmpty(keyword)){
            setItems(null)
        }else{
            await saleApi.getSaleSimple(keyword).then(({status,data})=>{
                if(status === 200 && data){
                    setItems(data)
                }
            })
        }
    }

    const handleClick = async(e, saleId)=>{
        setKeyword('')
        renderlessModal.close();
        modal.openModal(ModalType.LAYER.Sale_Detail, {
            sale_id: saleId
        })
    }

    return (
        <div className={Layout.gnb_search} onClick={renderlessModal.clickToOpen}>
            <form className={Layout.form} >
                <input type="search" title="검색" className={Layout.input}
                       value={keyword} onChange={e=>{
                           setKeyword(e.target.value)
                }} placeholder="이름, 전화번호, 식별번호로 검색해보세요."/>
                <button type="button" className={Layout.button}>검색</button>
            </form>
            <div className={cm(Layout.search_result, `${renderlessModal.active && Layout.active}`)} ref={renderlessModal.ref}>
                {/*활성화시 active 추가 -->*/}
                <table className={Layout.tb_result}>
                    <caption>검색결과 테이블 - 이름, 휴대폰 번호, 식별번호, 개통일 정보 제공</caption>
                    <thead className={Layout.thead}>
                    <tr>
                        <th className={Layout.th} scope="col">이름</th>
                        <th className={Layout.th} scope="col">휴대폰 번호</th>
                        <th className={Layout.th} scope="col">식별번호</th>
                        <th className={Layout.th} scope="col">개통일</th>
                    </tr>
                    </thead>
                    <tbody className={Layout.tbody}>
                    {
                        items && items.map((v,i)=>{
                            return <SearchResult key={i} data={v} onClick={e=>{
                                handleClick(e, v.sale_id)
                            }}/>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function SearchResult({data, onClick}){
    return (
        <tr className={Layout.tr} onClick={onClick}>
            <td className={Layout.td}>{data.cust_nm}</td>
            <td className={Layout.td}>{data.cust_tel}</td>
            <td className={Layout.td}>{data.cust_cd}</td>
            <td className={Layout.td}>{data.actv_dt}</td>
        </tr>
    )
}