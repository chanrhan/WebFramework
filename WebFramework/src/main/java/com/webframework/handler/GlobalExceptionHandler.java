package com.webframework.handler;

import com.webframework.common.response.ErrorResponse;
import com.webframework.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<?> handleRestApiException(BusinessException e){
		ErrorResponse res = ErrorResponse.of(e);
		log.error("BusinessException: {}", res);
		return ResponseEntity.status(res.getStatus()).body(res.getBody());
	}

	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<ErrorResponse> handleNullPointerException(NullPointerException e){
		log.error("NullPointerException: {}", e);
		return ResponseEntity.notFound().build();
	}

//	@ExceptionHandler(MethodArgumentNotValidException.class)
//	protected ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
//		log.error("handleMethodArgumentNotValidException", ex);
//		BindingResult bindingResult = ex.getBindingResult();
//		StringBuilder stringBuilder = new StringBuilder();
//		for (FieldError fieldError : bindingResult.getFieldErrors()) {
//			stringBuilder.append(fieldError.getField()).append(":");
//			stringBuilder.append(fieldError.getDefaultMessage());
//			stringBuilder.append(", ");
//		}
//		final ErrorResponse response = ErrorResponse.of(CommonErrorCode.NOT_VALID_ERROR, String.valueOf(stringBuilder));
//		return new ResponseEntity<>(response, HttpStatus.OK);
//	}
//
//	@ExceptionHandler(HttpMessageNotReadableException.class)
//	public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(
//			HttpMessageNotReadableException e) {
//		log.error("HttpMessageNotReadableException", e);
//		final ErrorResponse response = ErrorResponse.of(CommonErrorCode.REQUEST_BODY_MISSING_ERROR, e.getMessage());
//		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//	}
}
