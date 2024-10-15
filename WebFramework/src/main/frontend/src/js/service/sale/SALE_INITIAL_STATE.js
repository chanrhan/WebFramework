import {scRegex, telRegex} from "../../utils/regex";

export const SALE_INITIAL_STATE = [
    {
        key: 'provider'
    },
    {
      key: 'actv_dt'
    },
    {
        key: 'actv_div'
    },
    {
        key: 'seller_id'
    },
    {
        key: 'cust_nm',
        name: '고객 이름',
        regex: scRegex,
        msg: '고객 이름에 특수문자는 포함될 수 없습니다'
    },
    {
        key: 'cust_gd'
    },
    {
        key: 'cust_tel',
        name: '고객 전화번호',
        regex: telRegex,
        msg: '전화번호 형식을 올바르게 입력해 주세요'
    },
    {
        key: 'cust_cd',
        name: '고객 식별번호'
    },
    {
        key: 'device_md'
    },
    {
        key: 'actv_plan'
    },
    {
        key: 'dec_plan'
    },
    {
        key: 'actv_tp'
    },
    {
        key: 'actv_div'
    },
    {
        key: 'ct_istm'
    },
    {
        key: 'sec_md'
    },
    {
        key: 'exsvc'
    },
    {
        key: 'ct_cms'
    },
    {
        key: 'inet_actv_plan'
    },
    {
        key: 'inet_dec_plan'
    },
    {
        key: 'tv_actv_plan'
    },
    {
        key: 'tv_dec_plan'
    },
    {
        key: 'wt_actv_tp'
    },
    {
        key: 'wt_cms'
    },
    {
        key: 'sale_memo'
    },
    // 카드
    {
        key: 'card_id',
    },
    {
        key: 'card_tp',
    },
    {
        key: 'card_st'
    },
    // 결합
    {
        key: 'comb_id'
    },
    {
        key: 'comb_order_tp'
    },
    {
        key: 'comb_st'
    },
    // 중고폰
    {
        key: 'gr_ph_md'
    },
    {
        key: 'gr_ph_stor'
    },
    {
        key: 'gr_st'
    }

]

