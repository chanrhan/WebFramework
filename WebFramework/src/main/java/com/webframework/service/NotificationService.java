package com.webframework.service;

import com.webframework.emitter.NotificationEmitter;
import com.webframework.mapper.NotificationMapper;
import com.webframework.common.vo.NotifVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService  {
	private final NotificationEmitter notificationEmitter;
	private final NotificationMapper  notificationMapper;

	public int readAll(String userId){
		return notificationMapper.readAll(userId);
	}

	public int countUnreadNotif(String userId){
		return notificationMapper.countUnreadNotif(userId);
	}

	public List<Map<String,Object>> getNotification(String userId){
		return notificationMapper.getNotifList(userId);
	}

	//

//	public List<Map<String, Object>> searchNotif(SearchVO searchVO) {
//		return notificationMapper.searchAlert(searchVO);
//	}

//	public List<Map<String, Object>> selectNotif(NotifVO vo) {
//		return notificationMapper.getNotification(vo);
//	}
//	public List<Map<String, Object>> selectNotifByReceiver(String id) {
//		NotifVO vo = NotifVO.builder().receiverId(id).build();
//		return selectNotif(vo);
//	}
	public int approve(int alarmId){
		return notificationMapper.approve(alarmId);
	}

	public int readAllByReceiver(String receiverId){
		return notificationMapper.readAllByReceiver(receiverId);
	}

	public int read(int alarmId){
		return notificationMapper.read(alarmId);
	}

//	public void sendMessage(String senderId, String receiverId, String title, String content){
//		Map<String,Object> data = new HashMap<>();
//		data.put("title", title);
//		data.put("content", content);
//		notify(senderId, receiverId, 0, data);
//	}

	public void sendRequest(String senderId, String receiverId, String content){
		Map<String,Object> data = new HashMap<>();
		data.put("content", content);
		notify(senderId, receiverId, 1, data);
	}

	public void sendMessage(String senderId, String receiverId, String content){
		Map<String,Object> data = new HashMap<>();
		data.put("content", content);
		notify(senderId, receiverId, 0, data);
	}

//	public void approvalRequestToReps(String senderId, int corpId, int shopId){
//		Map<String,Object> data = new HashMap<>();
//		data.put("shop_id", shopId);
//
//		Map<String,Object> corp = shopService.getCorp(corpId);
//		String repsId = corp.get("reps_id").toString();
//		notify(senderId, repsId, "approval", data);
//	}

	public void sendChatInvitation(int roomId, String receiverId){
		notificationEmitter.sendToClient(receiverId, "chat/invite", roomId);
	}

	// Private
	private void notify(String senderId, String receiverId, int type, Map<String,Object> data){
		data.put("sender_id", senderId);
		data.put("type", type);

		String content = data.containsKey("content") ? data.get("content").toString() : null;

		NotifVO vo = NotifVO.builder()
				.senderId(senderId)
				.receiverId(receiverId)
				.noteTp(type)
				.content(content)
				.build();

		notificationMapper.insertNotification(vo);
//		notificationEmitter.sendToClient(receiverId, "notif", data);
	}
}
