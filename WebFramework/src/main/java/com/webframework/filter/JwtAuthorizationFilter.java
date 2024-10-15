package com.webframework.filter;

import com.webframework.provider.JwtProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
// OncePerRequestFilter : 매 요청 시 한 번 실행되는 필터
public class JwtAuthorizationFilter extends OncePerRequestFilter {
	private final JwtProvider jwtProvider;

	/**
	 * Spring Security가 가지고 있는 필터 중 BasicAuthenticationFilter라는 것이 있음
	 * 권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 거치게 되어 있음
	 * 만약에 권한이나 인증이 필요한 주소가 아니라면 해당 필터를 거치지 않음
	*/
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//		log.info("{} - successfulAuthentication -> 인증이나 권한이 필요한 주소 요청이 됨", this.getClass());

		String bearerAccessToken = request.getHeader("X-ACCESS-TOKEN");
		String accessToken = jwtProvider.getBearerTokenToString(bearerAccessToken);
		log.info("access token: {}",accessToken);
		log.info("from url: {}",request.getRequestURL());

		if(StringUtils.hasText(accessToken) && jwtProvider.validateToken(accessToken)){
			Authentication authentication = jwtProvider.getAuthentication(accessToken);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			log.info("Security Context에 '{}' 인증 정보를 저장했습니다", authentication.getName());
		}else{
			log.info("유효한 JWT 토큰이 없습니다");
//			response.sendError(401,"Token has been expired");
		}

		filterChain.doFilter(request,response);
	}
}
