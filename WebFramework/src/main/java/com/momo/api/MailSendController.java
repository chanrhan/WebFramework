package com.momo.api;

import com.momo.common.enums.MailType;
import com.momo.common.response.MailCreateResponse;
import com.momo.common.util.MailSenderService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mail")
public class MailSendController {
	private final MailSenderService mailSenderService;

	@GetMapping("/invite")
	@ResponseBody
	public ResponseEntity<MailCreateResponse> invite(@RequestParam String email, HttpSession session){
		return mailSenderService.joinEmail(email, MailType.INVITE, session);
	}

}
