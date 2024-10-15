package com.webframework.filter;

import jakarta.servlet.*;

import java.io.IOException;

//@WebFilter(urlPatterns = "/test/*")
//@Order(1)
@Deprecated
public class TestFilter implements Filter {
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		Filter.super.init(filterConfig);
		System.out.println("테스트 필터 생성");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		System.out.println("[!] 테스트 필터 동작");

//		ContentCachingRequestWrapper  httpServletRequest  = new ContentCachingRequestWrapper((HttpServletRequest) request);
//		ContentCachingResponseWrapper httpServletResponse = new ContentCachingResponseWrapper((HttpServletResponse) response);
//
//		String url = httpServletRequest.getRequestURI();

		// 이걸 해줘야 컨트롤러의 url까지 무사히 이동한다
		chain.doFilter(request,response);
	}

	@Override
	public void destroy() {
		System.out.println("테스트 필터 해제");
		Filter.super.destroy();
	}
}
