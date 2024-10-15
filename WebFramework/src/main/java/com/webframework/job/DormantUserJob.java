package com.webframework.job;

import com.webframework.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

// 휴면 회원 관리
@RequiredArgsConstructor
@Slf4j
@Component
public class DormantUserJob implements Job {
	@Value("${momo.schedule.dormant.cycle.date}")
	public static int DORMANT_CYCLE_DATE; // 일 기준

	private final UserService userService;

	@Override
	public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
		log.info("Dormant User Job is processing!");

		int result = userService.updateUserToDormant(DORMANT_CYCLE_DATE);
		log.info("User Update to Dormant: "+result);
	}
}
