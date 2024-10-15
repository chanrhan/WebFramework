import {cm} from "../../../utils/cm";
import Board from "../../../../css/board.module.css";
import profileImg1 from "../../../../images/profile_img1.jpg"
import {Btd} from "../../board/BoardTable";
import {ProfileTableColumn} from "./ProfileTableColumn";
import {ObjectUtils} from "../../../utils/objectUtil";
import {LMD} from "../../../common/LMD";

export function StaffTableData({data, onChangeState}){
    const state= data.approval_st;

    const changeState = (state)=>{
        onChangeState(data.id, data.shop_id, state);
    }


    if(ObjectUtils.isEmpty(data)){
        return  null;
    }

    return (
        <tr>
            {/*<Btd checkbox name='check1'/>*/}
            <Btd>{data.id}</Btd>
            <ProfileTableColumn src={profileImg1} name={data.name}/>
            <Btd>{data.email}</Btd>
            <Btd>{data.tel}</Btd>
            <Btd>{LMD.role[data.role]}</Btd>
            <Btd>{data.last_login_dt}</Btd>
            <Btd>{data.start_dt}</Btd>
            <Btd>
                {
                    state !== 0 ?
                        <button type="button" className={`btn ${state === 1 ? 'btn_blue':'btn_red'} btn_small btn_line`}>
                            {state === 1 ? '승인완료':'승인거절'}
                        </button>
                        :  (
                            <>
                                <button type="button" className="btn btn_grey btn_small btn_line" onClick={()=>{
                                    changeState(1);
                                }}>승인</button>
                                <button type="button" className="btn btn_red btn_small btn_line" onClick={()=>{
                                    changeState(2);
                                }}>거절</button>
                            </>
                        )
                }

            </Btd>
        </tr>
    )
}