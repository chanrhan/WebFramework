package com.momo.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.apache.ibatis.jdbc.Null;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.http.HttpRequest;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
public class ExternalApiUtils {
    private static final String LINEFEED = "\r\n";
    private static final String DOUBLE_HYPHEN = "--";
    private static final String QUTATE = "\"";
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static Map<String,Object> get(HttpURLConnection conn) throws ProtocolException {
        conn.setRequestMethod("GET");
        return request(conn);
    }

    public static Map<String,Object> post(HttpURLConnection conn, Map<String,Object> body) throws ProtocolException {
        String json = JSONObject.toJSONString(body);
        return post(conn, json);
    }

    public static Map<String,Object> post(HttpURLConnection conn, String body) throws ProtocolException {
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        try{
            log.info("body: {}", body);
            // 데이터 본문에 싣기
            try(DataOutputStream dos = new DataOutputStream(conn.getOutputStream())){
                dos.write(body.getBytes(StandardCharsets.UTF_8));
            }

            return request(conn);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static Map<String,Object> request(HttpURLConnection conn){
        try{
            BufferedReader br;
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                br = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
            } else {
                InputStream inputStream = conn.getErrorStream();
                if(inputStream == null){
//                    throw new NullPointerException("getErrorStram() is null");
                    br = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
                }else{
                    br = new BufferedReader(new InputStreamReader(inputStream));
                }
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            br.close();
            conn.disconnect();

            log.info("res: {}", sb.toString());
            return objectMapper.readValue(sb.toString(), Map.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static HttpRequest.BodyPublisher multipartToByte (Map<String, Object> map, String boundary) throws IOException {
        List<byte[]> byteArrays = new ArrayList<>();
        StringBuilder stringBuilder = new StringBuilder();

        for (Map.Entry<String, Object> data : map.entrySet()) {
            stringBuilder.setLength(0);
            stringBuilder.append(DOUBLE_HYPHEN)
                    .append(boundary)
                    .append(LINEFEED);

            if (data.getValue() instanceof Path filePath) {
                log.info("file data: {}", filePath);
                String mimeType = Files.probeContentType(filePath);
                byte[] fileByte = Files.readAllBytes(filePath);

                stringBuilder.append("Content-Disposition: form-data; name=")
                        .append(QUTATE)
                        .append(data.getKey())
                        .append(QUTATE)
                        .append("; filename= ")
                        .append(QUTATE)
                        .append(data.getValue())
                        .append(QUTATE)
                        .append(LINEFEED)
                        .append("Content-Type: ")
                        .append(mimeType)
                        .append(LINEFEED)
                        .append(LINEFEED);

                byteArrays.add(stringBuilder.toString().getBytes(StandardCharsets.UTF_8));
                byteArrays.add(fileByte);
                byteArrays.add(LINEFEED.getBytes(StandardCharsets.UTF_8));
            } else {
                stringBuilder.append("Content-Disposition: form-data; name=")
                        .append(QUTATE)
                        .append(data.getKey())
                        .append(QUTATE)
                        .append(";")
                        .append(LINEFEED)
                        .append(LINEFEED)
                        .append(data.getValue())
                        .append(LINEFEED);

                byteArrays.add(stringBuilder.toString().getBytes(StandardCharsets.UTF_8));
            }
        }

        stringBuilder.setLength(0);
        stringBuilder.append(DOUBLE_HYPHEN)
                .append(boundary)
                .append(DOUBLE_HYPHEN);
        byteArrays.add(stringBuilder.toString().getBytes(StandardCharsets.UTF_8));

        return HttpRequest.BodyPublishers.ofByteArrays(byteArrays);
    }
}
