package com.webframework.handler;


import com.webframework.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {
	private final UserService userService;

	@Override
	@Transactional
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write("{\"success\": true}");
		System.out.println("successHandler: success, "+response);
		//		System.out.println("[qq] LoginSuccess on Auth");
//		HttpSession session = request.getSession();
//		if(session == null){
//			response.sendRedirect("/");
//			return;
//		}
//
//		String username = SecurityContextUtil.getUsername();
//		if(username == null || "".equals(username)){
//			response.sendRedirect("/error/common");
//			return;
//		}
//		session.setAttribute("user_id", username);
//		session.setMaxInactiveInterval(3600); // 3600초 = 60분 = 1시간
//
//		userService.loginNow(username);
//
//		if(authentication == null){
//			response.sendRedirect("/error/common");
//			return;
//		}
//
//		if(!SecurityContextUtil.hasRole("REPS") && !SecurityContextUtil.hasRole("MANAGER")){
//			response.sendRedirect("/home");
//			return;
//		}
//
//		Map<String,Object> emp = userService.selectEmpById(username);
////		System.out.println("emp: "+emp);
//		if(emp == null || emp.isEmpty()){
//			response.sendRedirect("/error/common");
//			return;
//		}
//		Object shopId = emp.get("shop_id");
//		Object corpId = emp.get("corp_id");
//		if(shopId == null || corpId == null){
//			response.sendRedirect("/error/common");
//			return;
//		}
//
//
//		session.setAttribute("shop_id", shopId);
//		session.setAttribute("corp_id", corpId);
//
//
////
////		System.out.println("sid: "+session.getAttributeNames());
//
//		response.sendRedirect("/home");
	}
}
