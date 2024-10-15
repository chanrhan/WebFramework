package com.webframework.common.util;

public class IntegerUtil {
	public static Integer zeroToNull(Integer value){
		return (value == null || value == 0) ? null : value;
	}

	public static Integer zeroToNull(String value){
		Integer val2 = Integer.parseInt(value);
		return zeroToNull(val2);
	}

	public static Integer zeroToNull(Object value){
		return zeroToNull(value.toString());
	}
}
