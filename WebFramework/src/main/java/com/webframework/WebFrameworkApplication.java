package com.webframework;

import org.quartz.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@ServletComponentScan // 필터 클래스에 @Component 붙이지 않아도 자동으로 필터 스캔해주는 어노테이션
					  // 하지만 대신 @WebFilter라는 어노테이션을 붙여줘야 함
public class WebFrameworkApplication {

	public static void main(String[] args) throws SchedulerException {
		SpringApplication.run(WebFrameworkApplication.class, args);
	}
}


