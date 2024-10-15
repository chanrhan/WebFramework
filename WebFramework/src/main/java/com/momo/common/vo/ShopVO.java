package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ShopVO extends BaseVO {
	private String userId;
//	private Integer corpId;
	private Integer provider;
	private String brNm;
	private String brNo;
	//	private Integer corpPt;
	private String regiDt;

	private Integer shopId;
//	private String  repsId;
//	private String  repsNm;
	private String  shopNm;
	private String  shopTel;
	private String  sendTel;
	private String  shopAddr;
}
