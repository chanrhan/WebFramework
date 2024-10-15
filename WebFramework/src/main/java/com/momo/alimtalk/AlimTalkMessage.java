package com.momo.alimtalk;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class AlimTalkMessage {
    private String countryCode;
    private String to;
    private String title;
    private String content;
    private List<AlimTalkButton> buttons;
}