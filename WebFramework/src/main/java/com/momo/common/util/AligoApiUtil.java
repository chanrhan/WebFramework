package com.momo.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.momo.common.vo.ApiVO;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import net.minidev.json.JSONUtil;
import net.minidev.json.JSONValue;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.*;
import java.math.BigInteger;
import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

@Slf4j
public class AligoApiUtil {
    private static final String ACCESS_KEY = "0dkcc5mvqy65xtdmst05x8gwpowcg2kk";
    private static final String BASE_URL = "https://apis.aligo.in";
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static Map<String, Object> sendMessage(ApiVO vo){
        Map<String,Object> body = new HashMap<>();
        body.put("key", ACCESS_KEY);
        body.put("user_id", "km1104rs");
        body.put("sender", "01039031234");
        body.put("receiver", vo.getReceiver());
        body.put("msg", vo.getMsg());
        body.put("msg_type", vo.getMsgType());
        body.put("title", vo.getTitle());
        body.put("destination", vo.getDestination());
        body.put("rdate", "");
        body.put("rtime", "");
//        body.put("testmode_yn", "Y");

        HttpClient client = HttpClient.newHttpClient();
        StringBuilder boundary = new StringBuilder().append(new BigInteger(256, new Random()));
        try{
//            ExternalApiUtils.multipartToByte(body, boundary.toString());

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(new URI(BASE_URL+"/send/").toString()))
                    .setHeader("Content-Type", "multipart/form-data; boundary="+boundary)
//                    .setHeader("Content-Type", "multipart/form-data;")
                    .POST(ExternalApiUtils.multipartToByte(body, boundary.toString()))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            Map<String,Object> result = objectMapper.readValue(JSONValue.parse(response.body()).toString(), Map.class);
            log.info("res: {}", result);
            return result;
        } catch (IOException | URISyntaxException | InterruptedException e) {
            throw new RuntimeException(e);
        }

//        StringBuilder urlBuilder = new StringBuilder(BASE_URL+"/send/");
////        urlBuilder.append("?").append(URLEncoder.encode("key", StandardCharsets.UTF_8)).append("=").append(ACCESS_KEY)
////                .append("&").append(URLEncoder.encode("user_id", StandardCharsets.UTF_8)).append("=").append("km1104rs")
////                .append("&").append(URLEncoder.encode("sender", StandardCharsets.UTF_8)).append("=").append("01039031234")
////                .append("&").append(URLEncoder.encode("receiver", StandardCharsets.UTF_8)).append("=").append(tel)
//////                .append("&").append(URLEncoder.encode("destination", StandardCharsets.UTF_8)).append("=").append(tel+"|1번 파라미터|2번 파라미터")
////                .append("&").append(URLEncoder.encode("msg", StandardCharsets.UTF_8)).append("=").append("알리고 테스트 모모")
//////                .append("&").append(URLEncoder.encode("title", StandardCharsets.UTF_8)).append("=").append("문자 API Title")
////                .append("&").append(URLEncoder.encode("testmode_yn", StandardCharsets.UTF_8)).append("=").append("Y");
//        try{
//            URL url = new URL(urlBuilder.toString());
//
//            log.info("url: {}", url.toString());
//
//            StringBuilder boundary = new StringBuilder().append(new BigInteger(256, new Random()));
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//            conn.setRequestProperty("Content-type", "multipart/form-data; boundary="+boundary);
//
//            Map<String,Object> result = ExternalApiUtils.post(conn, ExternalApiUtils.multipartToByte(body, boundary.toString()).toString());
//
//            log.info("result: {}", result);
//            return result;
//        } catch (IOException e) {
//            log.error("error: {}",e.getMessage());
//            throw new RuntimeException(e);
//        }
    }
}
