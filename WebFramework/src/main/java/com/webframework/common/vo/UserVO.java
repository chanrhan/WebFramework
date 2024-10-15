package com.webframework.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import lombok.experimental.SuperBuilder;


@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class UserVO extends BaseVO {
	private String id;
	private String pwd;
	private String updatePwd; // 변경할 비밀번호
	private String name;
	private String email;
	private String tel;
	private String terms;

	private Integer userSt; // 유저 상태 (0: 탈퇴, 1: 정상, 2: 유령)

	private String  role;
	private Integer approvalSt; // 승인 여부

	private String pfp;


	private String regiDt;


}
