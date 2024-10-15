package com.momo.common.util;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Unmarshaller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

// 과학기술정보통신부 우정사업본부_우편번호 정보조회
// https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15056971

public class AddressAreaApiUtil extends PublicDataOpenApiUtil{
	// 서비스 url
	private static final String serviceUrl = "http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdSearchAllService/retrieveNewAdressAreaCdSearchAllService/getNewAddressListAreaCdSearchAll";

	public static Map<String, AddressAreaApiResponse> getAddressArea(String srchwrd, String countPerPage, String currentPage) {
		StringBuilder urlBuilder = new StringBuilder(serviceUrl);
		try {
			urlBuilder.append("?" + URLEncoder.encode("serviceKey", UTF_8) + "=" + SERVICE_KEY);
			urlBuilder.append("&" + URLEncoder.encode("srchwrd", UTF_8) + "=" + URLEncoder.encode(srchwrd, UTF_8));
			urlBuilder.append("&" + URLEncoder.encode("countPerPage", UTF_8) + "=" + URLEncoder.encode(countPerPage, UTF_8));
			urlBuilder.append("&" + URLEncoder.encode("currentPage", UTF_8) + "=" + URLEncoder.encode(currentPage, UTF_8));

			URL url = new URL(urlBuilder.toString());

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			BufferedReader br;
			if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
				br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			}
			else {
				br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}
			StringBuilder sb = new StringBuilder();
			String        line;
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			br.close();
			conn.disconnect();

			return parseXmlToMap(sb.toString());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private static Map<String, AddressAreaApiResponse> parseXmlToMap(String xml){
		Map<String, AddressAreaApiResponse> map = new HashMap<>();
		try {
			JAXBContext            jaxbContext            = JAXBContext.newInstance(AddressAreaApiResponse.class);
			Unmarshaller           unmarshaller           = jaxbContext.createUnmarshaller();
			AddressAreaApiResponse addressAreaApiResponse = (AddressAreaApiResponse) unmarshaller.unmarshal(new StringReader(xml));
			map.put("address", addressAreaApiResponse);
			return map;

		} catch (JAXBException e) {
			map.put("address", AddressAreaApiResponse.emptyResponse());
			return map;
		}
	}

}
