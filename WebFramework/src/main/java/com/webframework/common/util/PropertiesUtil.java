package com.webframework.common.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PropertiesUtil {
	public static String DOMAIN_ADDRESS;

	@Value("${momo.domain.address}")
	public void setDomainAddress(String domainAddress){
		DOMAIN_ADDRESS = domainAddress;
	}
}
