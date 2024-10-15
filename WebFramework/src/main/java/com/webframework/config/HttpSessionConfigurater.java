package com.webframework.config;


import jakarta.websocket.server.ServerEndpointConfig;

@Deprecated
public class HttpSessionConfigurater extends ServerEndpointConfig.Configurator {
//	public static final String Session = "Session";
//	public static final String Context = "Context";
//
//	@Override
//	public void modifyHandshake(ServerEndpointConfig config, HandshakeRequest request, HandshakeResponse response) {
//		System.out.println("[qq] modify handshake");
//		HttpSession session = (HttpSession) request.getHttpSession();
//		System.out.println("session: "+session.getId());
//		System.out.println("session n: "+session.getAttributeNames());
//		config.getUserProperties().put(HttpSessionConfigurater.Session, session);
//	}

}
