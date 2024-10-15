package com.webframework.provider;


import com.webframework.common.JwtConstant;
import com.webframework.common.UserDetailsImpl;
import com.webframework.common.response.JwtVO;
import com.webframework.service.UserService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {
	private final UserService userService;

	private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 10L; // 단위(ms), 1000ms(1초) x 60 x 10 = 10분
	private static final long REFRESH_TOKEN_EXPIRE_TIME_SHORT = 1000 * 60 * 60L; // 60분 = 1시간
	private static final long REFRESH_TOKEN_EXPIRE_TIME_LONG = 1000 * 60 * 60 * 24 * 7L; // 7일

	static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes()); // test

	public JwtVO generateToken(Authentication auth, boolean rememberMe){
		String authorities = auth.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(","));

		String username = ((UserDetailsImpl)auth.getPrincipal()).getUsername();

		return buildToken(username, authorities, rememberMe);
	}

	public JwtVO generateAccessToken(Authentication auth){
		String authorities = auth.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(","));

		String username = ((UserDetailsImpl)auth.getPrincipal()).getUsername();

		String accessToken = Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + ACCESS_TOKEN_EXPIRE_TIME))
				.claim("authorities",authorities)
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();

		return JwtVO.builder()
				.grantType("Bearer ")
				.username(username)
				.accessToken(accessToken)
				.build();
	}

//	public JwtVO generateRefreshToken(boolean rememberMe){
//		return JwtVO.builder()
//				.grantType("Bearer")
//				.refreshToken(Jwts.builder()
//						.setExpiration(new Date(new Date().getTime() + (rememberMe ? REFRESH_TOKEN_EXPIRE_TIME_LONG : REFRESH_TOKEN_EXPIRE_TIME_SHORT)))
//						.signWith(key, SignatureAlgorithm.HS256)
//						.compact())
//				.expireTime(rememberMe ? REFRESH_TOKEN_EXPIRE_TIME_LONG : REFRESH_TOKEN_EXPIRE_TIME_SHORT)
//				.build();
//	}


	public JwtVO generateTokenForResetPassword(String username){
		if(!userService.existUserId(username)){
			return null;
		}
		String authorities = new SimpleGrantedAuthority("RESET_PWD").getAuthority();
		log.info("generate token auth: {}",authorities);
		return buildToken(username, authorities, false);
	}

	private JwtVO buildToken(String username, String authorities, boolean rememberMe){
		String accessToken = Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + ACCESS_TOKEN_EXPIRE_TIME))
				.claim("authorities",authorities)
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
		String refreshToken = Jwts.builder()
				.setExpiration(new Date(new Date().getTime() + (rememberMe ? REFRESH_TOKEN_EXPIRE_TIME_LONG : REFRESH_TOKEN_EXPIRE_TIME_SHORT)))
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();

		//		System.out.println("AccessToken for parsing in JwtProvider: "+accessToken);
		//		System.out.println("RefreshToken for parsing in JwtProvider: "+refreshToken);


		return JwtVO.builder()
				.grantType("Bearer")
				.accessToken(accessToken)
				.refreshToken(refreshToken)
				.username(username)
				.expireTime(rememberMe ? REFRESH_TOKEN_EXPIRE_TIME_LONG : REFRESH_TOKEN_EXPIRE_TIME_SHORT)
				.build();
	}

	public Authentication getAuthentication(String accessToken){
		Claims claims = parseClaims(accessToken);

		if(claims.get("authorities") == null){
			throw new RuntimeException("Token is not authenticated");
		}

		Collection<? extends GrantedAuthority> authorities
											   = Arrays.stream(claims.get("authorities").toString().split(","))
				.map(SimpleGrantedAuthority::new)
				.toList();

		log.info("get authentication username : {}", claims.getSubject());

		UserDetails principal = userService.loadUserByUsername(claims.getSubject());
		return new UsernamePasswordAuthenticationToken(principal, "", authorities);
	}

	public String getBearerTokenToString(String bearerToken){
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
			return bearerToken.substring("Bearer ".length());
		}
		return null;
	}

	public boolean validateToken(String token){
		try{
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		}catch (io.jsonwebtoken.security.SignatureException | MalformedJwtException e){
			log.info("Invalid JWT Token",e);
		}catch (ExpiredJwtException e){
			log.info("Expired JWT Token",e);
		}catch (UnsupportedJwtException e){
			log.info("Unsupported JWT Token",e);
		}catch (IllegalArgumentException e){
			log.info("JWT claims string is empty",e);
		}
		return false;
	}

	private Claims parseClaims(String accessToken){
		try{
			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
		}catch (ExpiredJwtException e){
			return e.getClaims();
		}
	}

	public void setHeaderJwtToken(HttpServletResponse response, JwtVO jwtVO){
		response.setHeader("Access-Control-Expose-Headers","authorization, refreshtoken");
		response.setHeader("authorization","Bearer "+ jwtVO.getAccessToken());
		response.setHeader("refreshtoken","Bearer "+ jwtVO.getRefreshToken());
		response.setHeader("refreshexpiretime",jwtVO.getExpireTime().toString());
	}

	public void setHeaderAccessToken(HttpServletResponse response, String accessToken){
		response.setHeader("authorization", "Bearer "+accessToken);
	}

	public Authentication getAuthenticationByUsername(String username){
		UserDetails userDetails = userService.loadUserByUsername(username);
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}
}
