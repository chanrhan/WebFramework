package com.webframework.config;

import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

//@Configuration
//@EnableWebSocket
@RequiredArgsConstructor
@Deprecated
public class WebSocketConfig implements WebSocketConfigurer  {
//	private final WebSocketAlarmHandler webSocketAlarmHandler;
//
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//		registry.addHandler(webSocketAlarmHandler, "/ws")
//				.addInterceptors(new HttpSessionHandshakeInterceptor())
////				.addInterceptors( new CustomHandshakeInterceptor())
//				.setAllowedOrigins("*");
	}
//
//
//
//

}
