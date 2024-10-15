package com.momo.common.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiResponse<T> {
	private final HttpStatus status;
	private final T          data;
	private final String     message;

	@Builder
	public ApiResponse(final T data, final HttpStatus status, final String message) {
		this.data    = data;
		this.status  = status;
		this.message = message;
	}
}
