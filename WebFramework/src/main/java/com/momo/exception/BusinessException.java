package com.momo.exception;

import com.momo.common.enums.codes.ErrorCode;
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
