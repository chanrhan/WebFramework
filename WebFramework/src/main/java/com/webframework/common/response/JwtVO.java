package com.webframework.common.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@Builder
@NoArgsConstructor
public class JwtVO {
	private String grantType; // JWT에 대한 인증 타입, 여기서는 Bearer를 사용한다. 이후 HTTP 헤더에 prefix로 붙여주는 타입
	private String username;
	private String accessToken;
	private String refreshToken;
	private Long expireTime;

	private boolean revoked = false;
	private boolean expired = false;
}
