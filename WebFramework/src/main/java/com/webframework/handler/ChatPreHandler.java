package com.webframework.handler;

import com.webframework.provider.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class ChatPreHandler implements ChannelInterceptor {
	private final JwtProvider jwtProvider;
	private static final String BEARER_PREFIX = "Bearer ";
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);

		String accessToken = String.valueOf(headerAccessor.getNativeHeader("X-ACCESS-TOKEN"));
		log.info("chat access token: {}",accessToken);

//		if(accessToken == null || accessToken.equals("null")){
//			throw new MessageDeliveryException("Access Token is not found");
//		}

//		if(StringUtils.hasText(accessToken) && jwtProvider.validateToken(accessToken)){
//			Authentication authentication = jwtProvider.getAuthentication(accessToken);
//			SecurityContextHolder.getContext().setAuthentication(authentication);
//			log.info("Security Context에 '{}' 인증 정보를 저장했습니다", authentication.getName());
//		}else{
//			log.info("유효한 JWT 토큰이 없습니다");
//			//			response.sendError(401,"Token has been expired");
//		}

		return message;
	}
}

