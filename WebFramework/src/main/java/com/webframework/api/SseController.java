package com.webframework.api;

import com.webframework.emitter.NotificationEmitter;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Controller
@RequestMapping("/sse")
@Slf4j
@RequiredArgsConstructor
public class SseController {
	private final NotificationEmitter notificationEmitter;
	@GetMapping(value = "/connect",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	@ResponseBody
	public ResponseEntity<SseEmitter> connect(@RequestHeader(value = "Last-Event-ID",required = false,defaultValue = "") String lastEventId, HttpServletResponse response, HttpSession session){
		response.setHeader("X-Accel-Buffering","no");
		return ResponseEntity.ok(notificationEmitter.connect(lastEventId, session));
	}
}


