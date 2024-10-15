package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class TermVO extends BaseVO {
	private String        userId;
	private String        role;
	private Boolean       checked;
	private LocalDateTime argmDt;

	private Integer       termId;
	private String        termNm;
	private String        content;
	private Boolean       termRqSt;
	private LocalDateTime regiDt;
}
