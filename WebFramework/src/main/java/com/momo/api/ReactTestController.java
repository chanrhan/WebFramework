package com.momo.api;

import com.momo.wrapper.RereadableRequestWrapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

@RestController
public class ReactTestController {
	@PostMapping("/post")
	public String postTest(HttpServletRequest request, HttpSession session, @RequestBody Map<String, Object> map) throws IOException {
		RereadableRequestWrapper wrapper       = new RereadableRequestWrapper((HttpServletRequest) request);
		BufferedReader           reader        = wrapper.getReader();
		StringBuilder            stringBuilder = new StringBuilder();
		String line;
		while ((line = reader.readLine()) != null) {
			stringBuilder.append(line);
		}
		String requestData = stringBuilder.toString();
		System.out.println("request reader: "+requestData);
		return "Success! "+map.get("username").toString() + ", " + map.get("password").toString();
	}
}
