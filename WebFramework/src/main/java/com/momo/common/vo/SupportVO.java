package com.momo.common.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class SupportVO {
	private String supDivId;
	private String supDivNm;
	private String supPay;

	public SupportVO(String supDivId, String supPay) {
		this.supDivId = supDivId;
		this.supPay   = supPay;
	}
}
