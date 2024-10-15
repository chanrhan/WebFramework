package com.webframework.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
//	private final RoleAuthInterceptor roleAuthInterceptor;
//	private final HomeInterceptor homeInterceptor;

	// 이거 왜 적용 안했지..?
	// 나중에 시간 되면 알아보자.
//	@Override
//	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		registry.addResourceHandler("/images/**")
//				.addResourceLocations("file://"+ "${file.path}");
//	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:11040","http://localhost:8080","http://localhost:3000") // 안에 해당 주소를 넣어도 됨
//				.allowedOriginPatterns("*")
				.allowedMethods("GET", "POST")
				.allowedHeaders("*")
				.allowCredentials(true)
				.maxAge(3000);
		//.allowCredentials(true); // .allowedOriginPatterns("*") 이렇게 와일드 카드로 설정하면 이거 쓰면 에러남 ( 실행 조차  X )
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/{spring:\\w+}")
				.setViewName("forward:/");
		registry.addViewController("/**/{spring:\\w+}")
				.setViewName("forward:/");
		// /api/로 시작하지 않는 url은 모두 client 화면으로 보내줄 것이다
		registry.addViewController("/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}")
				.setViewName("forward:/");
	}

	// 리액트의 SPA(Single Page Application) 방식으로 가면서
	// url 인터셉트 라우팅이 일단은 필요 없어짐 (api만 해주면 됨)
//	@Override
//	public void addInterceptors(InterceptorRegistry registry) {
//		registry.addInterceptor(homeInterceptor)
//				.addPathPatterns("/home")
//				.excludePathPatterns("/error-page/**",
//									 "/js/**",
//									 "/css/**",
//									 "/api/**");
//
//		registry.addInterceptor(roleAuthInterceptor)
//				.addPathPatterns("/**")
//				.excludePathPatterns("/error-page/**",
//									 "/js/**",
//									 "/css/**",
//									 "/api/**",
//									 "/home",
//									 "/",
//									 "/account/login",
//									 "/account/logout",
//									 "/sse/**",
//									 "/webjars/**");
//
//		registry.addInterceptor(commonInterceptor)
//				.addPathPatterns("/**")
//				.excludePathPatterns("/error-page/**",
//									 "/js/**",
//									 "/css/**",
//									 "/api/**",
//									 "/account/**",
//									 "/",
//									 "/admin/**",
//									 "/webjars/**");
//	}

	// 아래의 방식 대신 @WebFilter를 사용해서 필터를 거는 방식도 사용할 수 있음
//	@Bean
//	public FilterRegistrationBean<TestFilter> setFilterRegistration(){
//		FilterRegistrationBean<TestFilter> filterRegistrationBean = new FilterRegistrationBean<>(new TestFilter());
//		filterRegistrationBean.addUrlPatterns("/test/*");
//		return filterRegistrationBean;
//	}
}
