package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.momo.common.util.IntegerUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class MsgCommonVO extends BaseVO {
	private Integer formId;
	private String  formNm;
	private Integer typeId;
	private String  content;
	private String selectBtnNm;
	private Integer    rsvDay;

	private String bpNo;

	private Integer corpId;

	private Integer msgId;
	private Integer shopId;
	private String  shopNm;
	private Integer saleId;
	private String  sendTp;
	private boolean sendSt;
	private String  custNm;
	private String  custTel;
	private String  sellerId;
	private String  sellerNm;

	private String rsvDt;
	private String regiDt;

	private List<MsgCommonVO> msgList;

	public Integer getShopId(){
		return IntegerUtil.zeroToNull(shopId);
	}

}
