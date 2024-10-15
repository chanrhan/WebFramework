package com.momo.alimtalk;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class AlimTalkButton {
    private String type;
    private String name;
    private String linkMobile;
    private String linkPc;
    private String schemeIos;
    private String schemeAndroid;
}
