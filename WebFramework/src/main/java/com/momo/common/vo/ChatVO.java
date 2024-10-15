package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ChatVO extends BaseVO {
	private static final int deleteLimit = 5;
	// Chatroom Info
	private Integer roomId;
	private String roomNm;
	private String roomImg;
	private Integer roomHc; // 채팅방 인원 수

	// Chatroom Member
	private String userId;
	private boolean master = false;
	private String joinDt;
	private Boolean alarmSt;
	private Boolean noteFold;
	private Integer lastRead;

	// Chatroom Last Read

	// Chatroom Note
	private Integer noteId;
	private String content;
	private String file = "";

	// Chat Log
	private Integer chatId;
	private Boolean serverSend = false;
	private Integer reply      = 0;
	private String  sendDt;
	private Integer currHc; // 채팅 보냈을 시 채팅방에 있던 인원 수

	// Chat Emo
	private String emo;

	// Chat Deleted
	private Boolean toAll;
	private String delDt;

}
