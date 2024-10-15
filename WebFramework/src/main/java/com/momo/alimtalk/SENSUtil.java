package com.momo.alimtalk;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Component
@Slf4j
//@RequiredArgsConstructor
public class SENSUtil {
//    private static final String SERVICE_URL = "https://sens.apigw.ntruss.com/alimtalk/v2/services/";
    private static final String ACCESS_KEY = "pQ8MmAuXgTYyqZxIefdv";
    private static final String SECRET_KEY = "ZcujEnHC6lzLPmPaKPeKJAY5ikkZyM1g8UxrCkla";
    private static final String SERVICE_KEY = "ncp:kkobizmsg:kr:3344532:linetaksong";

    private static final RestTemplate restTemplate = new RestTemplate();

    private static final ObjectMapper objectMapper = new ObjectMapper();

    // 서비스 URL 생성
    private static String getAlimTalkApiUrl(){
        return "https://sens.apigw.ntruss.com/alimtalk/v2/services/" + SERVICE_KEY + "/messages";
    }

    public static ResponseEntity<ImageAlimTalk> sendWithRestTemplate(Map<String,String> map) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        ImageAlimTalk alimTalk = ImageAlimTalk.builder()
                .plusFriendId("@탁송라인")
                .templateCode("T010")
                .messages(Collections.singletonList(AlimTalkMessage.builder()
                        .to("010-3844-3140")
                        .content(make_T010(map))
                        .buttons(Collections.singletonList(AlimTalkButton.builder()
                                .type("WL")
                                .name("차량 상태 사진 등록")
                                .linkMobile("http://1.243.204.46:10010/login2")
                                .linkPc("http://1.243.204.46:10010/login2")
                                .build()))
                        .build()))
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        headers.add("x-ncp-apigw-timestamp", Long.toString(new Date().getTime()));
        headers.add("x-ncp-iam-access-key", ACCESS_KEY);
        headers.add("x-ncp-apigw-signature-v2", makeSignature());

        HttpEntity<ImageAlimTalk> entity = new HttpEntity<>(alimTalk, headers);

        return restTemplate.exchange(getAlimTalkApiUrl(), HttpMethod.POST, entity, ImageAlimTalk.class);
    }

    /**
     * 카카오톡 알림톡 전송
     * @param map 알림톡 본문에 들어갈 아래 변수들을 매핑. <br>
     *            { <br>
     *            to: <i>수신인 전화번호</i> <br>
     *            corp_name: <i>회사명</i> <br>
     *            name: <i>배송기사 이름</i> <br>
     *            car_type: <i>출발지 차종</i> <br>
     *            car_no: <i>출발지 차량번호</i> <br>
     *            d_tel: <i>출발지 연락처</i> <br>
     *            a_tel: <i>도착지 연락처</i> <br>
     *            d_addr: <i>출발지 주소</i> <br>
     *            a_addr: <i>도착지 주소</i> <br>
     *            driver_req: <i>기사 요청사항</i> <br>
     *            }
     *
     * @return
     */
    public static Map<String, Object> send(Map<String,String> map){
        try{
            URL url = new URL(getAlimTalkApiUrl());  // 서비스 URL
//            log.info("timestamp: {}",Long.toString(new Date().getTime()));
//            log.info("url: {}", getAlimTalkApiUrl());

            HttpURLConnection conn = (HttpURLConnection) url.openConnection(); // url 커넥션 생성

            conn.setDoOutput(true); // 해당 세팅을 해줘야 응답이 옴 (아마...?);

            // 요청 헤더 설정
            conn.setRequestProperty("Content-Type", "application/json; charset=utf-8");
            conn.setRequestProperty("x-ncp-apigw-timestamp", Long.toString(new Date().getTime()));
            conn.setRequestProperty("x-ncp-iam-access-key", ACCESS_KEY);
            conn.setRequestProperty("x-ncp-apigw-signature-v2", makeSignature());

            // 요청 Body 생성
            // 빌더 패턴을 활용하여 Java에서도 편하게 json 형태의 객체를 만들 수 있도록 하였다
            ImageAlimTalk alimTalk = ImageAlimTalk.builder()
                    .plusFriendId("@탁송라인")
                    .templateCode("T010")
                    .messages(Collections.singletonList(AlimTalkMessage.builder()
                                    .to(map.get("to"))
                                    .content(make_T010(map))
                                    .buttons(Collections.singletonList(AlimTalkButton.builder()
                                            .type("WL")
                                            .name("차량 상태 사진 등록")
                                            .linkMobile("http://1.243.204.46:10010/login2")
                                            .linkPc("http://1.243.204.46:10010/login2")
                                            .build()))
                                    .build()))
                    .build();

            String json = objectMapper.writeValueAsString(alimTalk); // 객체를 json으로 변환
//            log.info("json: {}",json);

            // 생성한 Body를 요청의 output stream에 추가
            try(DataOutputStream dos = new DataOutputStream(conn.getOutputStream())){
                dos.write(json.getBytes("UTF-8"));
            }

            // 응답 받아오기
            BufferedReader br;
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            br.close();
            conn.disconnect();


            Map<String,Object> result = objectMapper.readValue(sb.toString(), Map.class);
//            log.info("result: {}",result);
            return result;
        } catch (IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException(e);
        }
    }

    // Signatrue key 생성
    // https://api.ncloud-docs.com/docs/common-ncpapi#%EC%9D%B8%EC%A6%9D%ED%82%A4%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0
    private static String makeSignature() throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException {
        String space = " ";					// one space
        String newLine = "\n";					// new line
        String method = "POST";					// method
        String timestamp = Long.toString(new Date().getTime());

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append("/alimtalk/v2/services/"+SERVICE_KEY+"/messages") // 요청 url과 동일하게 적으면 안됨, 앞부분의 페이지 도메인을 제외한 url 작성
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(ACCESS_KEY)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(SECRET_KEY.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256"); // ncloud에서 사용하는 암호화 알고리즘
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }

    // T010 템플릿을 동적으로 만들어주는 함수
    private static String make_T010(Map<String,String> map){

        return "["+map.get("corp_name")+" 차량 배정 안내]\n" +
                "\n" +
                "    "+map.get("name")+" 기사님 안녕하세요\n" +
                "    탁송이 배정되었습니다. 출발 장소로 이동 후 차량 사진의 등록을 부탁드립니다.\n" +
                "\n" +
                "    ◼\uFE0F 출발지 차종: "+map.get("car_type")+"\n" +
                "    ◼\uFE0F 출발지 차량번호: "+map.get("car_no")+"\n" +
                "    ◼\uFE0F 출발지 연락처: "+map.get("d_tel")+"\n" +
                "\n" +
                "    ◼\uFE0F 도착지 연락처: "+map.get("a_tel")+"\n" +
                "\n" +
                "    ▶ 출발지 주소 : "+map.get("d_addr")+"\n" +
                "    ▶\uFE0F 도착지 주소:  "+map.get("a_addr")+"\n" +
                "    \n" +
                "    ▶\uFE0F기사 요청사항:\n" +
                "     "+map.get("driver_req")+"\n" +
                "\n" +
                "    ※ 차량 사진을 등록하지 않았을 시 불이익에 대해서 책임지지 않습니다.";
//
//        return "["+map.get("corp_name") + " 차량 배정 안내]\n" +
//                "\n" +
//                map.get("name") +" 기사님 안녕하세요\n" +
//                "탁송이 배정되었습니다. 출발 장소로 이동 후 차량 사진의 등록을 부탁드립니다.\n" +
//                "\n" +
//                "◼ 출발지 차종: " + map.get("car_type") + "\n" +
//                "◼ 출발지 차량번호: " + map.get("car_no") + "\n" +
//                "◼ 출발지 연락처: " + map.get("d_tel") +"\n" +
//                "\n" +
//                "◼ 도착지 연락처: "+map.get("a_tel")+"\n" +
//                "\n" +
//                "▶ 출발지 주소 : "+map.get("d_addr")+"\n" +
//                "▶ 도착지 주소:  "+map.get("a_addr")+"\n" +
//                "\n" +
//                "▶ 기사 요청사항:\n"
//                + map.get("driver_req")+ " \n" +
//                "\n" +
//                "※ 차량 사진을 등록하지 않았을 시 불이익에 대해서 책임지지 않습니다.";
    }
}
