package com.momo.common.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.momo.common.enums.ChatResponseHeader;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ChatResponse {
	private ChatResponseHeader header;
	private Map<String,Object> body = new HashMap<>();

	@Builder
	public ChatResponse(ChatResponseHeader header, Integer chatId, String userId, List<Map<String, Object>> chatLog, Map<String, Object> chat, Map<String,Object> emoji, Map<String,Object> note, boolean serverSend, List<Map<String,Object>> connectedUsers) {
		this.header = header;
		putIfNotNull("chat_id", chatId);
		putIfNotNull("user_id",userId);
		putIfNotNull("server_send", serverSend);
		if(chat != null){
			if(chatLog == null){
				chatLog = new ArrayList<>();
			}
			chatLog.add(chat);
		}
		putIfNotNull("chat_log", chatLog);
		putIfNotNull("connected_user", connectedUsers);
		putIfNotNull("emoji",emoji);
		putIfNotNull("note", note);
	}

	private void putIfNotNull(String key, Object ob){
		if(ob != null){
			body.put(key, ob);
		}
	}

//	public int getHeader(){
//		return header.ordinal();
//	}
}
