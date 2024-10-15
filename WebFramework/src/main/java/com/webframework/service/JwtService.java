package com.webframework.service;

import com.webframework.common.response.JwtVO;
import com.webframework.mapper.RefreshTokenMapper;
import com.webframework.provider.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class JwtService {
	private final RefreshTokenMapper refreshTokenMapper;
	private final JwtProvider        jwtProvider;

	public void saveRefreshToken(JwtVO jwtVO){
		log.info("save refresh token: "+ jwtVO);
		String id = jwtVO.getUsername();
		String token = jwtVO.getRefreshToken();
		Map<String,Object> refreshToken = refreshTokenMapper.findById(id);

		if(refreshToken == null){
			refreshTokenMapper.insertRefreshToken(id, token	);
		}else{
			refreshTokenMapper.setRefreshToken(id, token);
		}
	}

	public JwtVO refresh(String bearerRefreshToken, boolean rememberMe) throws AccessDeniedException {
		String refreshToken = jwtProvider.getBearerTokenToString(bearerRefreshToken);

		if(!jwtProvider.validateToken(refreshToken)){
			throw new AccessDeniedException("AccessDeniedException");
		}

		Map<String,Object> userRefreshToken = refreshTokenMapper.findByRefreshToken(refreshToken);
		if(userRefreshToken == null){
			throw new UsernameNotFoundException("refresh token was not found");
		}

		if(userRefreshToken.get("expired").equals(true)){
			log.info("expired");
			throw new UsernameNotFoundException("refresh token has been expired");
		}
		if(userRefreshToken.get("revoked").equals(true)){
			log.info("revoked");
			throw new UsernameNotFoundException("refresh token has been revoked");
		}

		String username = userRefreshToken.get("user_id").toString();

		Authentication authentication = jwtProvider.getAuthenticationByUsername(username);
		JwtVO          jwtVO          = jwtProvider.generateAccessToken(authentication);

//		saveRefreshToken(jwtVO);

		return jwtVO;
	}

	public int expireToken(String userId, String refreshToken){
		return refreshTokenMapper.expireToken(userId, refreshToken);
	}

	public int revokeToken(String userId, String refreshToken){
		return refreshTokenMapper.revokeToken(userId, refreshToken);
	}
}
