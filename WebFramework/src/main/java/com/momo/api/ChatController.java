package com.momo.api;

import com.momo.common.enums.ChatResponseHeader;
import com.momo.common.response.ChatResponse;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.ChatVO;
import com.momo.common.vo.SearchVO;
import com.momo.provider.JwtProvider;
import com.momo.service.NotificationService;
import com.momo.service.ChatService;
import com.momo.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/chat")
public class ChatController {
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final ChatService         chatService;
	private final UserService         userService;
	private final NotificationService notificationService;
	private final JwtProvider         jwtProvider;

	// 웹소켓 Connect 콜백함수
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectEvent event){
		System.out.println("WebSocket Connect: "+event);
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

		String simpSessionId = headerAccessor.getSessionId();
		String bearerAccessToken = headerAccessor.getNativeHeader("X-ACCESS-TOKEN").get(0);
		String accessToken = jwtProvider.getBearerTokenToString(bearerAccessToken);

		log.info("simp Session Id: {}, bear: {}, accessToken: {}", simpSessionId, bearerAccessToken, accessToken);

		if(StringUtils.hasText(accessToken) && jwtProvider.validateToken(accessToken)){
			Authentication authentication = jwtProvider.getAuthentication(accessToken);
			if(simpSessionId != null && authentication != null){
				ChatResponse res = chatService.connect(simpSessionId.toString(), authentication.getName());
				System.out.println("res: "+res);
				simpMessagingTemplate.convertAndSend("/sub/chat/conn", res);
			}
		}
	}

	// 웹소켓 Disconnect 콜백함수
	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event){
		System.out.println("WebSocket Disconnect: "+event);
		String simpSessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
		ChatResponse res = chatService.disconnect(simpSessionId);
	}

	// 접속된 유저 목록 불러오기
	@GetMapping("/user/online")
	public ResponseEntity<List<String>> loadConnectedUser(){
		return ResponseEntityUtil.okOrNotFound(chatService.loadConnectedUser());
	}

	// 채팅 기록 불러오기 (마지막으로 읽은 곳부터)
//	@PostMapping("/msg/load")
//	public ResponseEntity<List<Map<String,Object>>> loadChatLog(@RequestBody ChatVO vo){
////		System.out.println("log: "+vo);
//		return ResponseEntityUtil.okOrNotFound(chatService.selectChatLogFromLastRead(vo));
//	}

	// 채팅 기록 모두 불러오기
	@GetMapping("/room/{roomId}/log")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> getChatLog(@PathVariable int roomId,
															   @RequestParam(required = false)String keyword){
		return ResponseEntityUtil.okOrNotFound(chatService.getChatLog(roomId, keyword));
	}

	// 채팅 메시지 전송
	@MessageMapping("/chat/send/{roomId}")
	@SendTo("/sub/chat/room/{roomId}")
	public ChatResponse sendChat(@DestinationVariable int roomId, @RequestBody ChatVO vo){
//		log.info("send vo: {}", vo);
//		String username = SecurityContextUtil.getUsername();
//		vo.setUserId(username);
		vo.setRoomId(roomId);
		return chatService.sendChat(vo, ChatResponseHeader.CHAT);
	}
	
	// 채팅 메시지 공감
	@MessageMapping("/chat/emo/{roomId}")
	@SendTo("/sub/chat/room/{roomId}")
	public ChatResponse emoChat(@DestinationVariable int roomId, @RequestBody ChatVO vo){
		vo.setRoomId(roomId);
		return chatService.sendEmoChat(vo);
	}

	// 채팅 메시지 삭제
	@MessageMapping("/chat/room/{roomId}/log/{chatId}/delete")
	@SendTo("/sub/chat/room/{roomId}")
	public ChatResponse deleteChat(@DestinationVariable int roomId, @DestinationVariable int chatId){
		return chatService.deleteChat(roomId, chatId);
	}

	// 채팅 메시지 삭제 가능한지 판별 (5분 타임아웃)
	@GetMapping("/room/{roomId}/log/{chatId}/enable/delete")
	@ResponseBody
	public ResponseEntity<Boolean> canDelete(@PathVariable int roomId, @PathVariable int chatId){
		return ResponseEntity.ok(chatService.canDelete(roomId, chatId));
	}

	// 채팅 메시지 읽음 처리 
	@MessageMapping("/chat/room/{roomId}/read")
	public void readChatRoom(@DestinationVariable int roomId, @RequestBody Map<String,String> map){
		ChatResponse res = chatService.readChatroom(roomId, map.get("user_id"));
//		log.info("read response: {}",res);
		if(res != null){
			simpMessagingTemplate.convertAndSend("/sub/chat/room/"+roomId, res);
		}
	}

	// 채팅방 유저 목록 불러오기
	@GetMapping("/room/{roomId}/user")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> loadChatRoomUser(@PathVariable int roomId){
		return ResponseEntityUtil.okOrNotFound(chatService.getChatRoomUser(roomId));
	}

	// 채팅 공지
	@MessageMapping("/chat/room/{roomId}/announce")
	@SendTo("/sub/chat/room/{roomId}")
	public ChatResponse announce(@DestinationVariable int roomId, @RequestBody ChatVO vo){
		vo.setRoomId(roomId);
		return chatService.announce(vo);
	}

	@PostMapping("/room/note/fold")
	@ResponseBody
	public ResponseEntity<Boolean> foldNotification(@RequestBody ChatVO vo){
		return ResponseEntity.ok(false);
	}

	@GetMapping("/room/{roomId}/ann")
	public ResponseEntity<Map<String, Object>> gettNote(@PathVariable int roomId){
		return ResponseEntityUtil.okOrNotFound(chatService.getAnnouncement(roomId));
	}

	// 채팅방 생성
	@PostMapping("/room")
	@Transactional
	public ResponseEntity<Integer> createChatRoom(@RequestBody ChatVO vo){
		return ResponseEntityUtil.okOrNotFound(chatService.createChatRoom(vo));
	}

//	@MessageMapping("/chat/room/join/{roomId}")
//	@SendTo("/sub/chat/room/{roomId}")
//	public String joinChatRoom(@DestinationVariable int roomId, StompSession session){
//		String id = session.getSessionId();
//		System.out.println("session id: "+ id);
//		return id;
//	}

	@MessageMapping("/chat/room/invite/{roomId}")
	public void inviteUser(@DestinationVariable int roomId, String userId){
		ChatResponse res = chatService.inviteChatroom(ChatVO.builder().roomId(roomId).userId(userId).build());
		if(res != null){
			notificationService.sendChatInvitation(roomId, userId);
			simpMessagingTemplate.convertAndSend("/sub/chat/room/"+roomId, res);
		}
	}

	// 채팅방 나가기
	@MessageMapping("/chat/room/quit/{roomId}")
	@ResponseBody
	public void quitChatroom(@DestinationVariable int roomId, @RequestBody ChatVO vo){
		vo.setRoomId(roomId);
		simpMessagingTemplate.convertAndSend("/sub/chat/room/"+roomId, chatService.quitChatRoom(vo));
		simpMessagingTemplate.convertAndSend("/sub/chat/room/"+roomId,
											 chatService.sendServerChat(ChatResponseHeader.QUIT, vo));
	}

	// 채팅방 정보 불러오기
	@GetMapping("/room/{roomId}/detail")
	@ResponseBody
	public ResponseEntity<Map<String,Object>> getChatRoomDetail(@PathVariable int roomId){
		return ResponseEntityUtil.okOrNotFound(chatService.getChatRoomDetail(roomId));
	}

	// 채팅방 목록 불러오기
	@GetMapping("/room")
	public ResponseEntity<List<Map<String,Object>>> getChatRoom(@RequestParam(value = "room_nm", required = false)String roomNm){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntityUtil.okOrNotFound(chatService.getChatRoom(username, roomNm));
	}

	// 채팅방 인원 수
	@GetMapping("/room/{roomId}/headcount")
	@ResponseBody
	public ResponseEntity<Integer> getChatRoomHeadCount(@PathVariable int roomId){
		return ResponseEntityUtil.okOrNotFound(chatService.getChatRoomHeadCount(roomId));
	}
//	@PostMapping("/room/last/chat")
//	@ResponseBody
//	public ResponseEntity<List<Map<String,Object>>> getLastChatInRoom(){
//
//		return null;
//	}

	@PostMapping("/list/user/invitable")
	@ResponseBody
	public ResponseEntity<List<Map<String, Object>>> searchChatInvitableUsers(@RequestBody SearchVO vo, HttpSession session) {
		if (vo.getSelect() == null) {
			vo.setSelect(new HashMap<>());
		}
		vo.getSelect().put("corp_id", session.getAttribute("corp_id").toString());
		//		System.out.println("invitable chat : "+vo);
		return ResponseEntityUtil.okOrNotFound(userService.searchChatInvitableUser(vo));
	}
}
