package com.webframework.common.enums.codes;

import lombok.Getter;

@Getter
public enum CommonErrorCode implements ErrorCode {
	/**
	 * ******************************* Global Error CodeList ***************************************
	 * HTTP Status Code
	 * 400 : Bad Request
	 * 401 : Unauthorized
	 * 403 : Forbidden
	 * 404 : Not Found
	 * 500 : Internal Server Error
	 * *********************************************************************************************
	 */
	LOGIN_FAILED(413, "아이디 또는 비밀번호가 일치하지 않습니다"),

	UNMATCHED_PASSWORD(401, "비밀번호가 일치하지 않습니다"),
	SESSION_NOT_FOUND(404, "세션을 찾을 수 없습니다"),

	// 잘못된 서버 요청
	BAD_REQUEST_ERROR(400,  "Bad Request Exception"),

	// @RequestBody 데이터 미 존재
	REQUEST_BODY_MISSING_ERROR(400,  "Required request body is missing"),

	// 유효하지 않은 타입
	INVALID_TYPE_VALUE(400,  " Invalid Type Value"),

	// Request Parameter 로 데이터가 전달되지 않을 경우
	MISSING_REQUEST_PARAMETER_ERROR(400, "Missing Servlet RequestParameter Exception"),

	// 입력/출력 값이 유효하지 않음
	IO_ERROR(400,  "I/O Exception"),

	// com.google.gson JSON 파싱 실패
	JSON_PARSE_ERROR(400,  "JsonParseException"),

	// com.fasterxml.jackson.core Processing Error
	JACKSON_PROCESS_ERROR(400, "com.fasterxml.jackson.core Exception"),

	// 권한이 없음
	FORBIDDEN_ERROR(403,  "Forbidden Exception"),

	// 서버로 요청한 리소스가 존재하지 않음
	NOT_FOUND_ERROR(404,  "Not Found Exception"),

	// NULL Point Exception 발생
	NULL_POINT_ERROR(404,  "Null Point Exception"),

	// @RequestBody 및 @RequestParam, @PathVariable 값이 유효하지 않음
	NOT_VALID_ERROR(404,  "handle Validation Exception"),

	// @RequestBody 및 @RequestParam, @PathVariable 값이 유효하지 않음
	NOT_VALID_HEADER_ERROR(404,  "Header에 데이터가 존재하지 않는 경우 "),

	//
	ALREADY_EXISTED(405, "이미 존재하는 데이터"),
	// 서버가 처리 할 방법을 모르는 경우 발생
	INTERNAL_SERVER_ERROR(500,  "Internal Server Error Exception"),

	// Transaction Insert Error
	INSERT_ERROR(200,  "Insert Transaction Error Exception"),

	// Transaction Update Error
	UPDATE_ERROR(200,  "Update Transaction Error Exception"),

	// Transaction Delete Error
	DELETE_ERROR(200,  "Delete Transaction Error Exception");

	private final int status;

	private final String message;

	// 생성자 구성
	CommonErrorCode(final int status, final String message) {
		this.status  = status;
		this.message = message;
	}

	public static CommonErrorCode fromInt(int i) {
		for (CommonErrorCode e : CommonErrorCode.values()) {
//			System.out.println("e ordinal: "+e.getStatus());
			if (e.getStatus() == i) {
				return e;
			}
		}
		throw new IllegalArgumentException("No enum constant with value " + i);
	}
}
