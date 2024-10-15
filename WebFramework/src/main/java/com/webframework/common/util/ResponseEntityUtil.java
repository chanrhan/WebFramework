package com.webframework.common.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseEntityUtil {
	public static <T> ResponseEntity<T> okOrNotFound(T result){
		return ResponseEntity.status((result != null) ? HttpStatus.OK : HttpStatus.NOT_FOUND).body(result);
	}

	public static ResponseEntity<Boolean> okOrNotModified(Integer result){
		return ResponseEntity.status((result != null && result != 0) ? HttpStatus.OK : HttpStatus.NOT_MODIFIED).body(result != null && result != 0);
	}
}
