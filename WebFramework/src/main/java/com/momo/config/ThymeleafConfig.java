package com.momo.config;

import nz.net.ultraq.thymeleaf.LayoutDialect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Deprecated
public class ThymeleafConfig {
	@Bean
	public LayoutDialect layoutDialect(){
		return new LayoutDialect();
	}
}
