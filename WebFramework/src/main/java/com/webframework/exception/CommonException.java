package com.webframework.exception;

import com.webframework.common.enums.codes.ErrorCode;
import lombok.Getter;

@Getter
public abstract class CommonException extends RuntimeException{
	protected ErrorCode errorCode;
	protected String reason;

	protected CommonException(final ErrorCode errorCode){
		this.errorCode = errorCode;
	}

	protected CommonException(final ErrorCode errorCode, final String reason){
		this.errorCode = errorCode;
		this.reason = reason;
	}
}
