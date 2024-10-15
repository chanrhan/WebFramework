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
public class ReserveMessageVO extends BaseVO {
    private String userId;
    private Integer saleId;
    private Integer msgId;
    private String rsvDt;

    private Integer currShopId;

    private String content;

    private Integer dday;

    private Integer msgTp;
    private Integer rsvTp;
    private String regiDt;
}
