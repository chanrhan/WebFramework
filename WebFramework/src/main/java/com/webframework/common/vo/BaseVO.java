package com.webframework.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class BaseVO {
	protected String userId;
	protected Integer currShopId;
	protected String keyword;
	protected String keydate;

	protected String target;
	protected Integer order; // 정렬
	protected boolean asc = false; // true: asc(오름차순), false: desc(내림차순)
	protected Integer offset;
	protected Integer limit;

	public String getAsc(){
		return asc ? "asc" : "desc";
	}

	protected static String[] COLUMNS = {
			"main_div","actv_dt","cust_nm","cust_tel","cust_cd","device_nm","total_cms","seller_nm"
	};

	public String getOrder(){
		return order != null ? COLUMNS[order] : null;
	}

//	protected Integer zeroToNull(Integer value){
//		return (value == null || value == 0) ? null : value;
//	}
}
