package com.webframework.common.vo;

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
public class CommonVO extends BaseVO {
//    private static final String[] SELECT_TYPE = new String[]{
//            "generation","weekdays","device","sec_device","actv_plan"
//    };
//    private String userId;

    private Integer provider;
    private String date;

    private Integer year;
    private Integer month;
    private Integer day;

    private String selectType;

    private Integer range;
    private Character dateType;

    private String prevFromYmd;
    private String prevToYmd;

    private String currFromYmd;
    private String currToYmd;

    private String fromYmd;
    private String toYmd;

    private String fromYm;
    private String toYm;

    private String prevDate;
    private String currDate;


//    public void setSelectType(int value){
//        if(value >= 0 && value <= 4){
//            this.selectType = SELECT_TYPE[value];
//        }
//    }

}
