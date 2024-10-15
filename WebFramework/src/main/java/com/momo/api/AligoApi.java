//package com.momo.api;
//
//import com.momo.common.util.ExternalApiUtils;
//import lombok.extern.slf4j.Slf4j;
//
//import java.io.IOException;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.util.Map;
//
//// https://smartsms.aligo.in/admin/api/auth.html
//
//@Slf4j
//public class AligoApi {
//    // 등록일: 2024.08.05 13:47
//    // Identifier: km1104rs
//    private static final String API_KEY = "0dkcc5mvqy65xtdmst05x8gwpowcg2kk";
//
//    public static void send(Map<String,Object> body){
//        StringBuilder urlBuilder = new StringBuilder("https://akv/alimtalk/send");
//        try{
//            URL url = new URL(urlBuilder.toString());
//
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//            conn.setDoOutput(true);
//            conn.setRequestMethod("POST");
//            conn.setRequestProperty("Content-type", "application/json; utf-8");
//
//            Map<String,Object> result = ExternalApiUtils.post(conn, body);
//
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }
//}
