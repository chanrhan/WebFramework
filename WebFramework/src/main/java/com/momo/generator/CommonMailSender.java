package com.momo.generator;

import com.momo.common.response.MailCreateResponse;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
@RequiredArgsConstructor
public class CommonMailSender {
	private static final String FROM_EMAIL = "momocorp@gmail.com";

	private final JavaMailSenderImpl mailSender;

	public int makeRandomNumber(){
		return new Random().nextInt(8888888)+111111;
	}

	public void mailSend(String toEmail, MailCreateResponse response){
		MimeMessage message = mailSender.createMimeMessage();
		try{
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
			helper.setFrom(FROM_EMAIL);
			helper.setTo(toEmail);
			helper.setSubject(response.getSubject());
			helper.setText(response.getText(), true);
			mailSender.send(message);
		} catch (jakarta.mail.MessagingException e) {
			throw new RuntimeException(e);
		}
	}
}
