package com.momo.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

// 공공데이터포털
// https://www.data.go.kr/index.do

public abstract class PublicDataOpenApiUtil {
	protected static final   ObjectMapper objectMapper = new ObjectMapper();
	protected static final String SERVICE_KEY = "8bXfsl4hHudyYTdKPi4dl%2F4%2FgRXAfzpqd3YDNOy1ID8y9jeCAfIVEeem%2FtVsExHAIiMZBvuD71wapunlRTagGw%3D%3D";

	protected static final Charset UTF_8 = StandardCharsets.UTF_8;
}
