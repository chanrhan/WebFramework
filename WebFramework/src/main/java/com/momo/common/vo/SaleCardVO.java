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
public class SaleCardVO extends BaseVO {
    private String userId;
    private Integer shopId;
    private Integer saleId;

    private Integer cardId;
    private Integer cardSt;

    private Integer cardNm; // 카드 회사명 (국민카드, 현대카드, ...)
    private Integer cardTp; // 카드 유형
}
