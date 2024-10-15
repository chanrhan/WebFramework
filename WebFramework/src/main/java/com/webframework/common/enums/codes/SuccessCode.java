package com.webframework.common.enums.codes;

import lombok.Getter;

@Getter
public enum SuccessCode {
	SELECT_SUCCESS(200, "200", "SELECT SUCCESS"), // 조회 성공 코드 (HTTP Response: 200 OK)
	DELETE_SUCCESS(200, "200", "DELETE SUCCESS"), // 삭제 성공 코드 (HTTP Response: 200 OK)
	INSERT_SUCCESS(201, "201", "INSERT SUCCESS"), // 삽입 성공 코드 (HTTP Response: 201 Created)
	UPDATE_SUCCESS(204, "204", "UPDATE SUCCESS"); // 수정 성공 코드 (HTTP Response: 201 Created)

	private final int    status;
	private final String code;
	private final String message;

	SuccessCode(final int status, final String code, final String message) {
		this.status  = status;
		this.code    = code;
		this.message = message;
	}
}
