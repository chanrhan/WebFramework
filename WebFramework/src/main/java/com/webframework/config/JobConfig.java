package com.webframework.config;

import com.webframework.job.DormantUserJob;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.quartz.*;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class JobConfig {
	private final Scheduler scheduler;

	@PostConstruct // '의존성 주입이 완료 된 후 실행되는 메소드'를 지정하는 어노테이션
	public void run(){
		JobDetail jobDetail = getJobDetail(DormantUserJob.class, new HashMap());

		try{
			scheduler.scheduleJob(jobDetail, getCronTrigger("0 0 9 1 */6 ?")); // Cron 표현식
		} catch (SchedulerException e) {
			throw new RuntimeException(e);
		}
	}

	public Trigger getCronTrigger(String scheduleExp){
		return TriggerBuilder.newTrigger()
				.withSchedule(CronScheduleBuilder.cronSchedule(scheduleExp))
				.startNow().build();
	}

	public JobDetail getJobDetail(Class job, Map params){
		JobDataMap jobDataMap = new JobDataMap();
		jobDataMap.putAll(params);
		return JobBuilder.newJob(job).usingJobData(jobDataMap).build();
	}
}
