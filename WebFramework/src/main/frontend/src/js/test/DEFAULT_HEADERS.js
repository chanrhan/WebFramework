const HEADER_NAMES = {
    empty: '선택없음',
    cust_nm: '이름',
    cust_gd: '성별',
    cust_tel: '전화번호',
    cust_cd: '식별번호',
    ph_md: '모델명',
    sec_md: '세컨 모델명',
}

export const DEFAULT_HEADERS = {
    length: ()=>{
      return Object.keys(HEADER_NAMES).length;
    },
    keys: ()=>{
        return Object.keys(HEADER_NAMES);
    },
    names: ()=>{
        return Object.values(HEADER_NAMES);
    },
    entries: ()=>{
        return Object.entries(HEADER_NAMES);
    },
    get: (key)=>{
        return HEADER_NAMES[key];
    }
}

export default DEFAULT_HEADERS;