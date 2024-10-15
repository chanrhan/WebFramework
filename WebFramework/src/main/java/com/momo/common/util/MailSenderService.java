package com.momo.common.util;

import com.momo.common.response.MailCreateResponse;
import com.momo.common.enums.MailType;
import com.momo.generator.CommonMailSender;
import com.momo.service.ShopService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MailSenderService {
	@Value("${momo.mail.invite.address}")
	private String INVITE_ADDRESS;

	private final CommonMailSender  mailSender;
	private final ShopService shopService;

	public ResponseEntity<MailCreateResponse> joinEmail(String email, MailType type, HttpSession session){
		MailCreateResponse response = null;
		switch (type){
			case INVITE -> {
				response = createInviteMail(email, session);
			}
			case AUTH -> {
				response = createAuthMail(session);
			}
		}
		if(response == null){
			return ResponseEntity.badRequest().build();
		}
		mailSender.mailSend(email, response);
		return ResponseEntity.ok(response);
	}

	private MailCreateResponse createInviteMail(String email, HttpSession session){
		Object _userId = session.getAttribute("user_id");
		String userId = (_userId != null) ? _userId.toString() : "unknown";

		MailCreateResponse response = new MailCreateResponse("모모 초대 메일입니다.");
		StringBuilder sb = new StringBuilder();
		int shopId = Integer.parseInt(session.getAttribute("shop_id").toString());
		int corpId = Integer.parseInt(session.getAttribute("corp_id").toString());

		sb.append("<input type='hidden' name='shop_id' value='" +
						  shopId +
						  "'>" +
						  "<input type='hidden' name='corp_id' value='" +
						  corpId +
						  "'>");
//		if(corpId != 0){
//			Map<String,Object> corp = shopService.getCorp(corpId);
//			String corpNm = corp.get("corp_nm").toString();
//			sb.append("<p>" +
//							  "회사명: " + corpNm +
//							  "</p><br>");
//		}
		if(shopId != 0 ){
			Map<String,Object> shop = shopService.getShopById(shopId);
			String shopNm = shop.get("shop_nm").toString();
			sb.append("<p>" +
							  "매장명: " + shopNm +
							  "</p><br>");
		}
		sb.append("보낸 사람: " +
						  userId +
						  "<br>");
		sb.append("아래의 링크를 클릭하여 모모(Momo)를 체험해보세요.<br>");
		
		String link = PropertiesUtil.DOMAIN_ADDRESS + INVITE_ADDRESS;
		sb.append("<a href='" +
						  link +
						  "?email=" +
						   email +
						  "&shop_id=" +
						  shopId +
						  "&corp_id=" +
						  corpId +
						  "'>" +
						  "모모(Momo) 회원가입 진행하기" +
						  "</a>");
		response.setText(sb.toString());
		
		return response;
	}

	private MailCreateResponse createAuthMail(HttpSession session){
		MailCreateResponse response = new MailCreateResponse("모모 인증번호 확인 이메일입니다.");
		int authNumber = mailSender.makeRandomNumber();
		
		StringBuilder sb = new StringBuilder();
		sb.append("<h4>" +
						  "아래의 인증번호를 인증번호 확인란에 기입하여 주세요." +
						  "</h4>" +
						  "<br>" +
						  "<h3>" +
						  authNumber +
						  "</h3>");

		response.setText(sb.toString());
		return response;
	}

}
