package com.webframework.common.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionCallback;
import org.springframework.transaction.support.TransactionTemplate;

@Component
@RequiredArgsConstructor
public class TransactionTemplateUtil {
	private final TransactionTemplate transactionTemplate;
	private final static int MAX_REPEAT = 10;

	public <T> T executeRepeatedly(TransactionCallback<T> action){
		int repeat = 0;
		T result = null;
		do{
			result = transactionTemplate.execute(status -> {
				try{
					return action.doInTransaction(status);
				}catch (Exception e){
					status.setRollbackOnly();
					try {
						Thread.sleep(1000); // 1초 있다가 다시 Commit
					} catch (InterruptedException e2) {
						throw new RuntimeException(e2);
					}
					return null;
				}
			});
			++repeat;
		}while (result == null && repeat < MAX_REPEAT);

		return result;
	}
}
