package com.webframework.common.response;

import com.webframework.common.enums.codes.ErrorCode;
import com.webframework.exception.CommonException;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ErrorResponse {
	private final LocalDateTime timestamp = LocalDateTime.now();
	private int status;
	private String message;

	public ErrorResponse(final ErrorCode commonErrorCode){
		this.status = commonErrorCode.getStatus();
		this.message = commonErrorCode.getMessage();
	}


	public static ErrorResponse of(final ErrorCode code){
		return new ErrorResponse(code);
	}

	public static ErrorResponse of(final CommonException e){
		return of(e.getErrorCode());
	}

	public static ResponseEntity<ErrorResponse> response(CommonException e){
		return ResponseEntity.status(e.getErrorCode().getStatus()).body(of(e.getErrorCode()));
	}

	public Map<String,Object> getBody(){
		Map<String,Object> body = new HashMap<>();
		body.put("status", status);
		body.put("message", message);
		body.put("timestamp", timestamp);
		return body;
	}

}
