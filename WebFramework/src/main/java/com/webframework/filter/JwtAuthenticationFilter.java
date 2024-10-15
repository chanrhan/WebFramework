package com.webframework.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webframework.common.response.JwtVO;
import com.webframework.provider.JwtProvider;
import com.webframework.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Deprecated
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private final AuthenticationManager authenticationManager;
	private final JwtProvider           jwtProvider;
	private final JwtService            jwtService;


	// loing 요청을 하면 로그인 시도를 위해 실행되는 함수
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
		log.info("{} - attemptAuthentication -> 로그인 시도중", this.getClass());
		ObjectMapper objectMapper = new ObjectMapper();
		try{
			Map<String,Object> userMap = objectMapper.readValue(request.getInputStream(), Map.class);

			String username = userMap.get("username").toString();
			String password = userMap.get("password").toString();

			log.info("user.getUsername() : {}", username);
			log.info("user.getPassword() : {}", password);

			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
					username, password
			);

			Authentication authentication = authenticationManager.authenticate(authenticationToken);

			return authentication;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

		//		String token = resolveToken((HttpServletRequest) request);
//
//		if(token != null && jwtTokenProvider.validateToken(token)){
//			Authentication authentication = jwtTokenProvider.getAuthentication(token);
////			SecurityContextHolder.getContext().setAuthentication(authentication);
//			log.info("attempt auth token");
//			return authentication;
//		}
//		log.info("attempt error");
//		return null;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
		log.info("{} - successfulAuthentication -> 인증 완료", this.getClass());


		JwtVO jwtVO = jwtProvider.generateToken(authentication, false);
		jwtService.saveRefreshToken(jwtVO);

		jwtProvider.setHeaderJwtToken(response, jwtVO);
	}

	private String resolveToken(HttpServletRequest request){
		log.info("resolve token");
		String bearerToken = request.getHeader("Authorization");
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")){
			return bearerToken.substring(7);
		}
		return null;
	}
}
