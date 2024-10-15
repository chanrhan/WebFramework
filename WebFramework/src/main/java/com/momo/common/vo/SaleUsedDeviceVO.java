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
public class SaleUsedDeviceVO extends BaseVO {
    private String userId;
    private Integer shopId;
    private Integer saleId;

    private Integer udId;
    private Integer udSt;
    private Integer udCms;

    private String udNm;
    private Integer udStor;
}
