package com.webframework.emitter;

import com.webframework.common.util.SecurityContextUtil;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationEmitter {
	private final Map<String,SseEmitter> emitterMap      = new HashMap<>();

	private static final Long DEFAULT_TIMEOUT = 60 * 60 * 1000L; // 1시간마다 타임아웃

	public SseEmitter connect(String lastEventId, HttpSession session){
//		Object _userId = session.getAttribute("user_id");
//		String userId = (_userId != null) ? _userId.toString() : "unknown";
		String userId = SecurityContextUtil.getUsername();
//		Map<String,SseEmitter> dup = findAllStartById(userId);
//		if(dup != null && !dup.isEmpty()){
//			dup.forEach((key, value)->{
//				emitterMap.remove(key);
//			});
//		}

		String id = userId + "_" + System.currentTimeMillis();
//		System.out.println("userId: "+userId+" , id: "+id);
//		System.out.println("lastEventId: "+lastEventId);

		SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
		emitter.onCompletion(()->{
			log.info("on complete");
			emitterMap.remove(id);
		});
		emitter.onTimeout(()->{
			log.info("on timeout");
			emitterMap.remove(id);
		});
		emitter.onError((e)->{
			log.error(e.getMessage());
			emitterMap.remove(id);
		});
		emitterMap.put(id, emitter);

		sendToClient(id, "connect", "Welcome, "+id);

		if(!lastEventId.isEmpty()){
			// 클라이언트가 미수신한 Event 유실 예방, 연결이 끊겼거나 미수신된 데이터를 다 찾아서 보내준다.

		}
		return emitter;
	}

	public void sendToClient(String id, String eventName, Object data){
		Map<String,SseEmitter> emitters = findAllStartById(id);
		log.info("current emitter: {}",emitters);
		if(emitters != null && !emitters.isEmpty()){
			emitters.forEach((key, value) -> {
				try {
					value.send(SseEmitter.event()
									   .id(id)
									   .name(eventName)
									   .data(data));
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			});
		}
	}

	private Map<String, SseEmitter> findAllStartById(String id){
		return emitterMap.entrySet().stream()
				.filter(entry -> entry.getKey().startsWith(id))
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
	}
}
