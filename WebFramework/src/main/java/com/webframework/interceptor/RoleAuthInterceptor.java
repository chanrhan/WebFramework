package com.webframework.interceptor;

import com.webframework.auth.RoleAuth;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.Collection;

@RequiredArgsConstructor
@Component
@Slf4j
public class RoleAuthInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//		String url = request.getRequestURI();
//		System.out.println("[role] url: "+url);
		System.out.println("ROLE AUTH INTERCEPTOR: "+request.getRequestURL());
		if(!(handler instanceof HandlerMethod)){
			return true;
		}
		HandlerMethod handlerMethod = (HandlerMethod) handler;

		RoleAuth roleAuth = handlerMethod.getMethodAnnotation(RoleAuth.class);
//		System.out.println("auth: "+ roleAuth);
		if (roleAuth == null) {
			return true;
		}

		HttpSession session = request.getSession();
//		System.out.println("session: "+session);
		if(session == null){
			response.sendRedirect("/error/common");
			return false;
		}

		Authentication sauth = SecurityContextHolder.getContext().getAuthentication();
		if(sauth == null){
			response.sendRedirect("/error/common");
			return false;
		}

		Collection<? extends GrantedAuthority> authorities = sauth.getAuthorities();

		String role = roleAuth.role().toString();
		boolean exclusion = roleAuth.exclusion();
//		System.out.println("role: "+role);
		if(role != null){
			if("USER".equals(role)){
				if(authorities.isEmpty() ^ exclusion){
					response.sendRedirect("/error/auth");
					return false;
				}
			}
			else if("EMPLOYEE".equals(role)){
				if(!(authorities.contains(new SimpleGrantedAuthority("REPS")) || authorities.contains(new SimpleGrantedAuthority("MANAGER"))) ^ exclusion){
					response.sendRedirect("/error/auth");
					return false;
				}else if(!authorities.contains(new SimpleGrantedAuthority("APPROVE"))){
					response.sendRedirect("/error/approval");
					return false;
				}
			}
			else {
				if(!authorities.contains(new SimpleGrantedAuthority(role)) ^ exclusion){
					response.sendRedirect("/error/auth");
					return false;
				}
			}
		}else{
			return false;
		}

		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
	}
}
