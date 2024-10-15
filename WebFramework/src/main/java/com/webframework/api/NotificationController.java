package com.webframework.api;

import com.webframework.common.util.SecurityContextUtil;
import com.webframework.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/notif")
public class NotificationController {
	private final NotificationService notificationService;

	/**
	 * 알림 목록 불러오기
	 * @return {
	 *     날짜
	 *     알림 내용
	 * }
	 */
	@GetMapping("/all")
	public ResponseEntity<List<Map<String,Object>>> getNotification(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(notificationService.getNotification(username));
	}

	@GetMapping("/count/unread")
	public ResponseEntity<Integer> countUnreadNotif(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(notificationService.countUnreadNotif(username));
	}

	@GetMapping("/read/all")
	public ResponseEntity<?> readAll(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(notificationService.readAll(username) != 0);
	}

//	@PostMapping("/send/test")
//	public ResponseEntity<?> sendTest(@RequestBody Map<String,Object> map){
//		String senderId = "admin";
//		log.info("send map: {}",map);
//		String receiverId = map.get("receiver_id").toString();
//		String content = map.get("content").toString();
//		String noteTp = map.get("alert_tp").toString();
//		if(noteTp.equals("message")){
//			notificationService.sendMessage(senderId, receiverId, content);
//		}else{
////			notificationService.approvalRequestToReps(senderId, 1, 1);
//		}
//		return ResponseEntity.ok().build();
//	}
}
