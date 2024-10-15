//package com.momo.interceptor;
//
//import com.momo.service.ShopCommonService;
//import com.momo.service.UserService;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.servlet.http.HttpSession;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//import org.springframework.web.servlet.ModelAndView;
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//@Deprecated
//public class CommonInterceptor implements HandlerInterceptor {
//	private final ShopCommonService shopCommonService;
//	private final UserService       userService;
//
//	@Override
//	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
////		System.out.println("Common INTERCEPTOR: "+request.getRequestURL());
//		if(modelAndView == null){
//			modelAndView = new ModelAndView();
//		}
//		HttpSession session = request.getSession(); // 오류있음 이거 null일 떄
//		if(session == null || session.getAttribute("corp_id") == null){
//			return;
//		}
////		System.out.println("sid: "+session.getId());
//
//		int corpId = Integer.parseInt(session.getAttribute("corp_id").toString());
//		if(corpId == 0){
//			log.error("'corp_id' is not existed in HttpSession");
//			return;
//		}
//
//		int corpPt = shopCommonService.getCorpPoint(corpId);
//		modelAndView.addObject("corp_pt",corpPt);
//
//		String userName = userService.fetchUserByContext().get("name").toString();
//		modelAndView.addObject("user_nm", userName);
//
//	}
//
//	@Override
//	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
//	}
//}
