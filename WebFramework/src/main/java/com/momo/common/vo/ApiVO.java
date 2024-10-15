package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode()
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ApiVO {
    // Aligo
    private String key;
    private String userId;
    private String sender;
    private String receiver;
    private String msg;
    private String msgType = "";
    private String title = "";
    private String destination = "";
    private String rdate ;
    private String rtime;
    private String testmodeYn;
}
