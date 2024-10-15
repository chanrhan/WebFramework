package com.momo.common.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MailCreateResponse {
	private String subject;
	private String text;

	public MailCreateResponse(String subject){
		this.subject = subject;
		text = "";
	}
}
