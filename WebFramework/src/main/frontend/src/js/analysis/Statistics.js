import Graph from "../../css/graph.module.css"
import {cm} from "../utils/cm";
import {useEffect, useState} from "react";
import useApi from "../hook/useApi";
import {NumberUtils} from "../utils/NumberUtils";

export function Statistics({date}){
    const {saleApi} = useApi()

    const [items, setItems] = useState(null)

    useEffect(() => {
        getPersonalStatistics()
    }, [date]);

    const getPersonalStatistics = async ()=>{
        await saleApi.getPersonalStatistics({
            date: date
        }).then(({status,data})=>{
            if(status === 200 && data){
                console.table(data)
                setItems(data)
            }
        })
    }

    return (
        <div className={Graph.graph_table}>
            <table className={Graph.tb_calender}>
                <caption>통계 테이블 - 김모모 실장(평촌역점), 김모모 팀장(평촌역점)... 정보 제공</caption>
                <colgroup>
                    <col/>
                    <col span="6" style={{width: "14.5%"}}/>
                </colgroup>
                <thead className={Graph.thead}>
                <tr>
                    <Sth/>
                    {
                        items && items.profile && JSON.parse(items.profile).map((v,i)=>{
                            return <Sth profile={v} sub='평촌역점'/>
                        })
                    }
                </tr>
                </thead>
                <tbody className={Graph.tbody}>
                <Str subject='무선 수수료' inclination='up'>
                    {
                        items && items.ct_cms && JSON.parse(items.ct_cms).map((v,i)=>{
                            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>
                        })
                    }
                </Str>
                <Str subject='유선 수수료' inclination='up'>
                    {
                        items && items.wt_cms && JSON.parse(items.wt_cms).map((v,i)=>{
                            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>
                        })
                    }
                </Str>
                <Str subject='추가' inclination='up'>
                    {
                        items && items.sum_add && JSON.parse(items.sum_add).map((v,i)=>{
                            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>
                        })
                    }
                </Str>
                <Str subject='중고폰 판매 금액' inclination='up'>
                    {
                        items && items.ud_cms && JSON.parse(items.ud_cms).map((v,i)=>{
                            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>
                        })
                    }
                </Str>
                <Str subject='지원' inclination='down'>
                    {
                        items && items.sum_sup && JSON.parse(items.sum_sup).map((v,i)=>{
                            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>
                        })
                    }
                </Str>
                <Str bb subject='총 이익' inclination='none'>
                    {
                        items && items.total_cms && JSON.parse(items.total_cms).map((v,i)=>{
                            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>
                        })
                    }
                </Str>
                <Str subject='무선 개수'>
                    {
                        items && items.ct_cnt && JSON.parse(items.ct_cnt).map((v,i)=>{
                            return <Std><span className={Graph.span}>{v}</span>개</Std>
                        })
                    }
                </Str>
                <Str subject='인터넷 개수'>
                    {
                        items && items.internet_cnt && JSON.parse(items.internet_cnt).map((v,i)=>{
                            return <Std><span className={Graph.span}>{v}</span>개</Std>
                        })
                    }
                </Str>
                <Str subject='TV 개수'>
                    {
                        items && items.tv_cnt && JSON.parse(items.tv_cnt).map((v,i)=>{
                            return <Std><span className={Graph.span}>{v}</span>개</Std>
                        })
                    }
                </Str>
                <Str subject='평균 마진'>
                    {
                        items && items.avg_margin && JSON.parse(items.avg_margin).map((v,i)=>{
                            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>
                        })
                    }
                </Str>
                <Str subject='동판 개수'>
                    {
                        items && items.dongsi_stat && JSON.parse(items.dongsi_stat).map((v,i)=>{
                            return <Std><span className={Graph.span}>{v.cnt}</span>개 <span className={Graph.span}>({v.per}%)</span></Std>
                        })
                    }
                </Str>
                <Str subject='중고 개통'>
                    {
                        items && items.ud_cnt && JSON.parse(items.ud_cnt).map((v,i)=>{
                            return <Std><span className={Graph.span}>{v}</span>개</Std>
                        })
                    }
                </Str>
                <Str subject='세컨'>
                    {
                        items && items.sd_stat && JSON.parse(items.sd_stat).map((v,i)=>{
                            return <Std><span className={Graph.span}>{v.cnt}</span>개 <span className={Graph.span}>({v.per}%)</span></Std>
                        })
                    }
                </Str>
                <Str subject='부가서비스'>
                    {
                        items && items.exsvc_stat && JSON.parse(items.exsvc_stat).map((v,i)=>{
                            return <Std><span className={Graph.span}>{v.cnt}</span>개 <span className={Graph.span}>({v.per}%)</span></Std>
                        })
                    }
                </Str>
                </tbody>
            </table>

            <div className="view_more">
                <button type="button" className="view_more_btn">더 보기</button>
            </div>
        </div>
    )
}

function Sth({profile}){
    return (
        <th className={Graph.th} scope="col">
            {
                profile && <>
                    {profile.name}
                    <span className={Graph.span}>
                        {profile.nickname}
                    </span>
                </>
            }
        </th>
    )
}

function Str({subject, inclination, bb, children}){
    let color = null;
    let mark = null;
    if(inclination){
        switch (inclination){
            case 'up':
                color = 'blue'
                mark = '(+)'
                break;
            case 'down':
                color = 'red'
                mark = '(-)'
                break;
            case 'none':
                color = 'grey'
                mark = '(=)'
        }
    }

    return (
        <tr className={`${Graph.tr} ${bb && Graph.bb}`}>
            <th scope="row" className={cm(Graph.th, `${inclination && Graph[color]}`)}>
                {mark} {subject}
            </th>
            {children}
        </tr>
    )
}

function Std({children}){
    return (
        <td className={Graph.td}>
            {children}
        </td>
    )
}