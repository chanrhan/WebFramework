package com.webframework.auth;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RoleAuth {
	Role role() default Role.NONE;
	boolean exclusion() default false;

	enum Role{
		NONE, // 로그인하지 않은 사용자
		USER, // 로그인한 사용자
		ADMIN, // 관리자
		EMPLOYEE,
		REPS, // 대표
		MANAGER, // 직원
	}
}
