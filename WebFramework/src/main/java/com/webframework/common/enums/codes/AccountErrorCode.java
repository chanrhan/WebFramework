package com.webframework.common.enums.codes;

import lombok.Getter;

@Getter
public enum AccountErrorCode implements ErrorCode {
    LOGIN_FAILED(413, "아이디 또는 비밀번호가 일치하지 않습니다"),

    UNMATCHED_PASSWORD(401, "비밀번호가 일치하지 않습니다");

    private final int status;

    private final String message;

    // 생성자 구성
    AccountErrorCode(final int status, final String message) {
        this.status  = status;
        this.message = message;
    }
}
