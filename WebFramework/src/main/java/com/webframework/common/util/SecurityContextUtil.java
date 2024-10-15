package com.webframework.common.util;


import com.webframework.common.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

@RequiredArgsConstructor
@Slf4j
public class SecurityContextUtil {

	public static String getUsername(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("principal: {}", authentication.getPrincipal());
		return ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
	}

	public static boolean hasRole(String role){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication.getAuthorities().contains(new SimpleGrantedAuthority(role));
	}
}
