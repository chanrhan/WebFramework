package com.webframework.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@Deprecated
public class MybatisConfig {
//	private final ApplicationContext applicationContext;
//
//	@Bean
//	public DataSource dataSource(){
//		DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
//		// Mybatis Debuging
//		dataSourceBuilder.driverClassName("net.sf.log4jdbc.sql.jdbcapi.DriverSpy");
//		dataSourceBuilder.url("jdbc:log4jdbc:mysql://127.0.0.1:3306/momo_db?useUnicode=yes&characterEncoding=UTF-8&allowMultiQueries=true&serverTimezone=Asia/Seoul");
//		dataSourceBuilder.username("root");
//		dataSourceBuilder.password("0000");
//
//		return dataSourceBuilder.build();
//	}
//
//	@Bean
//	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception{
//		SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
//		sessionFactoryBean.setDataSource(dataSource);
////		sessionFactoryBean.setTypeAliasesPackage("com.momo.vo");
//		sessionFactoryBean.setConfigLocation(applicationContext.getResource("classpath:mybatis-config.xml"));
//		sessionFactoryBean.setMapperLocations(applicationContext.getResource("classpath:mapper/*.xml"));
//
//		org.apache.ibatis.session.Configuration configuration = new org.apache.ibatis.session.Configuration();
//		configuration.setCallSettersOnNulls(true);
//		sessionFactoryBean.setConfiguration(configuration);
//		return sessionFactoryBean.getObject();
//	}
}
