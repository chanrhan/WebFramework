package com.momo.service;

import com.momo.common.enums.ChatResponseHeader;
import com.momo.common.util.SecurityContextUtil;
import com.momo.mapper.ChatMapper;
import com.momo.mapper.UserMapper;
import com.momo.common.response.ChatResponse;
import com.momo.common.vo.ChatVO;
import com.momo.common.vo.UserVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Log4j2
public class ChatService {
	private final ChatMapper          chatMapper;
	private final UserMapper          userMapper;
	private final Map<String, String> connectedUserMap = new HashMap<>();

	// Chat Room
	private int getMaxChatRoomId(){
		Integer id = chatMapper.getMaxChatRoomId();
		return (id != null) ? id : 0;
	}
	// 채팅방 넘버는 auto_increment로 할려고 했는데,
	// 방금 생성한 room_id를 반환해줘야 하기 떄문에 일단 현 상태로 보류
	@Transactional
	public Integer createChatRoom(ChatVO vo){
		return chatMapper.createChatRoom(vo);
	}
	public ChatResponse connect(String simpSessionId, String userId){
		log.info("stomp connect put: {}, {}", simpSessionId, userId);
		connectedUserMap.put(simpSessionId, userId);
		return ChatResponse.builder()
				.header(ChatResponseHeader.CONNECT)
				.userId(userId)
				.build();
	}
	public ChatResponse disconnect(String simpSessionId){
		String userId = connectedUserMap.get(simpSessionId);
		connectedUserMap.remove(simpSessionId);
		return ChatResponse.builder()
				.header(ChatResponseHeader.DISCONNECT)
				.userId(userId)
				.build();
	}
	public List<String> loadConnectedUser(){
		log.info("connected user list: {}", connectedUserMap.values().stream().toList());
		return connectedUserMap.values().stream().toList();
	}
	public List<Map<String,Object>> getChatRoomUser(int roomId){
		return chatMapper.getChatRoomUser(roomId);
	}
	public ChatResponse joinChatroom(ChatVO vo){
//		int maxChatId = getMaxChatId(vo.getRoomId());
//		vo.setFirstRead(maxChatId);
//		vo.setLastRead(maxChatId);
		chatMapper.insertChatRoomUser(vo);
		return sendServerChat(ChatResponseHeader.JOIN, vo);
	}
	public ChatResponse inviteChatroom(ChatVO vo){
		chatMapper.insertChatRoomUser(vo);
		return sendServerChat(ChatResponseHeader.INVITE, vo);
	}
	public int getChatRoomHeadCount(int roomId){
		return chatMapper.getChatRoomHeadCount(roomId);
	}

	public List<Map<String,Object>> getChatRoom(String userId, String roomNm){
		return chatMapper.getChatRoom(userId, roomNm);
	}

	public Map<String,Object> getChatRoomDetail(int roomId){
		return chatMapper.getChatRoomDetail(roomId);
	}

	public ChatResponse readChatroom(int roomId, String userId){
		//		System.out.println("read Chat: "+vo);
		List<Map<String,Object>> nonReadList = chatMapper.readChatRoom(roomId, userId);
		if(nonReadList == null || nonReadList.isEmpty()){
			return null;
		}
		return ChatResponse.builder()
				.header(ChatResponseHeader.READ)
				.chatLog(nonReadList)
				.build();
	}

	// Chat Log
	public synchronized ChatResponse sendChat(ChatVO vo, ChatResponseHeader header){
		return ChatResponse.builder()
				.header(header)
				.chat(chatMapper.insertChat(vo))
				.serverSend(vo.getServerSend())
				.build();
	}
	public ChatResponse sendServerChat(ChatResponseHeader header, ChatVO vo){
		vo.setServerSend(true);
		vo.setContent(makeChatContent(vo.getUserId(), header));
		vo.setUserId("");
		return sendChat(vo, header);
	}
	private String makeChatContent(String userId, ChatResponseHeader type){
		String username;
		try{
			username = userMapper.getUser(UserVO.builder().id(userId).build()).get(0).get("name").toString();
		}catch (NullPointerException e){
			log.error(e.getMessage());
			e.printStackTrace();
			username = null;
		}

		switch (type){
			case JOIN -> {
				return username + "님이 입장하였습니다.";
			}
			case INVITE -> {
				return username + "님을 초대하였습니다.";
			}
			case QUIT -> {
				return username + "님이 나갔습니다";
			}
			case KICK -> {
				return username + "님이 추방되었습니다.";
			}
		}
		return null;
	}
	public List<Map<String,Object>> getChatLog(int roomId, String keyword){
//		ChatVO vo = ChatVO.builder().roomId(roomId).build();
//		vo.setUserId(username);
		String username = SecurityContextUtil.getUsername();
		return chatMapper.getChatLog(roomId, username, keyword);
	}
//	public List<Map<String,Object>> selectChatLogFromLastRead(ChatVO vo){
//		vo.setOrder("send_dt");
//		return chatMapper.fetchChatLogFromLastRead(vo);
//	}
//	public Map<String,Object> getLastChatLog(ChatVO vo){
//		return chatMapper.fetchLastChatLog(vo);
//	}

	// Chat Emo
	public ChatResponse sendEmoChat(ChatVO vo){
		vo.setEmo("emo"+vo.getEmo());
//		System.out.println("emo: "+vo);
		return ChatResponse.builder()
				.header(ChatResponseHeader.EMO)
				.emoji(chatMapper.insertChatEmo(vo))
				.build();
	}

	// Chat Delete
	public ChatResponse deleteChat(int roomId, int chatId){
		chatMapper.deleteChat(roomId, chatId);
		return ChatResponse.builder()
				.header(ChatResponseHeader.DELETE)
				.chatId(chatId)
				.build();
	}

	public boolean canDelete(int roomId, int chatId){
		return chatMapper.canDelete(roomId, chatId, 5);
	}

	// Chat Note
	public ChatResponse announce(ChatVO vo){
		return ChatResponse.builder()
				.header(ChatResponseHeader.NOTE)
				.note(chatMapper.insertAnnouncement(vo))
				.build();
	}

	public Map<String,Object> getAnnouncement(int roomId){
		return chatMapper.getAnnouncement(roomId);
	}

	// Chat Quit/Kick
	public ChatResponse quitChatRoom(ChatVO vo){
		chatMapper.quitChatRoom(vo);
		return ChatResponse.builder()
				.header(ChatResponseHeader.QUIT)
				.userId(vo.getUserId())
				.build();
	}


}
