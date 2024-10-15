package com.momo.mapper;

import com.momo.common.vo.ChatVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatMapper {
	// Chatroom Info
	public int createChatRoom(ChatVO vo);
	public int updateChatRoom(ChatVO vo);
	public List<Map<String,Object>> getChatRoom(String userId, String roomNm);
	public Map<String,Object> getChatRoomDetail(int roomId);
	public Integer getMaxChatRoomId();
	public Integer getChatRoomHeadCount(int roomId);

	// Chatroom Member
	public int insertChatRoomUser(ChatVO vo);
	public int deleteChatRoomMember(ChatVO vo);
	public int updateAlarmState(ChatVO vo);
	public int updateNoteFold(ChatVO vo);
	public List<Map<String,Object>> getChatRoomUser(int roomId);
//	public List<Map<String,Object>> fetchChatLogFromLastRead(ChatVO vo);
	public List<Map<String,Object>> readChatRoom(int roomId, String userId);
//	public Integer getLastRead(ChatVO vo);
	public boolean isEqualsToLastRead(ChatVO vo);

	// Chatroom Note
	public Map<String,Object> insertAnnouncement(ChatVO vo);
	public Map<String,Object> getAnnouncement(int roomId);

	// Chat Log
	public Map<String,Object> insertChat(ChatVO vo);
//	public Integer getMaxChatId(int roomId);
	public Integer getAutoIncrement();
	public List<Map<String,Object>> getChatLog(int roomId, String userId, String keyword);
//	public Map<String,Object> fetchLastChatLog(ChatVO vo);
//	public int getStackedChatCount(ChatVO vo);

	// Chat Emo
	public Map<String,Object> insertChatEmo(ChatVO vo);
	public int updateChatEmo(ChatVO vo);
	public List<String> fetchEmoList(ChatVO vo);

	// Chat Deleted
	public int deleteChat(int roomId, int chatId);

	/**
	 *
	 * @param roomId
	 * @param chatId
	 * @param deleteLimit by minute
	 * @return
	 */
	public boolean canDelete(int roomId, int chatId, int deleteLimit);

	// Chat Quit
	public int quitChatRoom(ChatVO vo);
}
