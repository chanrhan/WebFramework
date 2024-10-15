package com.momo.alimtalk;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class ImageAlimTalk {
    private String plusFriendId;
    private String templateCode;
    private List<AlimTalkMessage> messages;
    private List<AlimTalkButton> buttons;
    private Boolean useSmsFailover;
    private String reserveTime;
    private String reserveTimeZone;
}
