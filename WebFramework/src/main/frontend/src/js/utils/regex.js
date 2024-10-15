export const RegexUtils = {
    getRegexes: ()=>{
      return {
        email: emailRegex,
        tel: telRegex,
        telCommon: commonTelRegex,
        date: dateRegex,
        korean: koreanRegex,
        sc: scRegex,
        id: idRegex,
        pwd: pwdRegex
      }
    },
    email: (v)=>{
        return emailRegex.test(v);
    },
    tel: v=>{
        return telRegex.test(v);
    },
    telCommon: v=>{
        return commonTelRegex.test(v)
    },
    date: v=>{
        return dateRegex.test(v)
    },
    korean: v=>{
        return koreanRegex.test(v)
    },
    sc: v=>{
        return scRegex.test(v)
    },
    id: v=>{
        return idRegex.test(v)
    },
    password: v=>{
        return pwdRegex.test(v)
    }
}


// 이메일 검사 정규식
export const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_.]?[0-9a-zA-z])*\.[a-zA-z]{2,3}$/;

// 전화번호(01~) 검사 정규식
export const telRegex = /^01[016789]-\d{3,4}-?\d{4}$/;

// 전화번호(모든 전화번호 가능) 정규식
export const commonTelRegex = /^[0-9]{2,3}(\s-)?[0-9]{3,4}(\s-)?[0-9]{3,4}$/

// 날짜 정규식
export const dateRegex = /^(19[3-9][0-9]|20[0-9][0-9])([\s년-]|년\s)?(0?[1-9]|1[0-2])([\s월-]|월\s)?(0?[1-9]|1[0-9]|2[0-9]|3[0-1])일?$/

// 특수문자, 한글 검사 정규식
export const scRegex = /^[^!@#$%^&*(),.?":{}|<>]+$/;

// 한글 검사 정규식
export const koreanRegex = /^[^ㄱ-ㅎㅏ-ㅣ가-힣]+$/;

// 아이디 검사 정규식
// 5~32자 사이
// 한글, 영어 대문자, 특수문자, 띄어쓰기 제외
export const idRegex = /^[a-z0-9]{5,32}$/;

// 비밀번호 검사 정규식
// 8~32자 사이
// 영문, 숫자, 특수문자가 적어도 1개씩 포함
export const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-=_+|;':",.<>?]).{8,32}$/

export const bpNoRegex = /^[0-9]{10}$/
