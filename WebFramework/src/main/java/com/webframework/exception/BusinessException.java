package com.webframework.exception;

import com.webframework.common.enums.codes.ErrorCode;
import lombok.Getter;

@Getter
public class BusinessException extends CommonException {
	public BusinessException(ErrorCode errorCode) {
		super(errorCode);
	}
	public BusinessException(ErrorCode errorCode, String reason) {
		super(errorCode, reason);
	}
}
