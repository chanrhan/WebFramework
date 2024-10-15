package com.momo.common.util;

import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;

import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

// 국세청_사업자등록정보 진위확인 및 상태조회 서비스
// https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15081808
// 대표님 사업자번호
// -> 5218702490

// 사업자번호만으로 조회하려면 유료 API가 필요한 듯하다
// 일단 추후에 다시 알아보자
@Slf4j
public class BusinessmanApiUtil extends PublicDataOpenApiUtil{
	private static final String SERVICE_URL = "https://api.odcloud.kr/api/nts-businessman/v1/validate";

	public static Map<String, Object> validate(Map<String,String> map){
		Map<String,Object> body = new HashMap<>();
		List<Map<String,String>> businesses = new ArrayList<>();
		map.put("start_dt",map.get("start_dt").replace("-",""));
		map.put("b_nm","");
		map.put("corp_no","");
		map.put("b_sector","");
		map.put("b_type","");
		map.put("b_adr","");
		businesses.add(map);
		body.put("businesses",businesses);
		String json = JSONObject.toJSONString(body);
//		System.out.println(json);

		StringBuilder urlBuilder = new StringBuilder(SERVICE_URL);
		try{
			urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + SERVICE_KEY); /*Service Key*/
			urlBuilder.append("&" + URLEncoder.encode("returnType", "UTF-8") + "=" + URLEncoder.encode("JSON", "UTF-8"));

			URL url = new URL(urlBuilder.toString());

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-type", "application/json; utf-8");

			// 데이터 본문에 싣기
			try(DataOutputStream dos = new DataOutputStream(conn.getOutputStream())){
				dos.write(json.getBytes("UTF-8"));
			}


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

			return objectMapper.readValue(sb.toString(),Map.class);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public static boolean status(String bpNo){
		Map<String,Object> body = new HashMap<>();
		List<String> array = new ArrayList<>();
		array.add(bpNo);
		body.put("b_no", array);

		StringBuilder urlBuilder = new StringBuilder("https://api.odcloud.kr/api/nts-businessman/v1/status");
		urlBuilder.append("?").append(URLEncoder.encode("serviceKey", StandardCharsets.UTF_8)).append("=").append(SERVICE_KEY); /*Service Key*/
		try{
			URL url = new URL(urlBuilder.toString());

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-type", "application/json; utf-8");

			Map<String,Object> result = ExternalApiUtils.post(conn, body);

			log.info("result: {}", result);
			Object matchCnt = result.get("match_cnt");
			return matchCnt != null && Integer.parseInt(matchCnt.toString()) > 0;
		} catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

	public static void search(){

	}
}
