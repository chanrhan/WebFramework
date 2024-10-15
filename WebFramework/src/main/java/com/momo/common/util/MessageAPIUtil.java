package com.momo.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.jfr.Timestamp;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.apache.tomcat.util.codec.binary.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RequiredArgsConstructor
public class MessageAPIUtil {
	private static final ObjectMapper objectMapper = new ObjectMapper();
	private static final String accessKey = "uPFEFiU5G9WAOrrav0PK";
	private static final String secretKey = "epyML5PeSrKUXsZ1j1kOAdR8WRzGbogpHaDgeqUq";
	private static final String serviceUrl = "https://sens.apigw.ntruss.com/sms/v2/services";

	public static JSONObject send(Map<String, Object> body){
		StringBuilder urlBuilder = new StringBuilder(serviceUrl);
		try{
			urlBuilder.append("/" + URLEncoder.encode(secretKey, "UTF-8")); /*Service Key*/
			urlBuilder.append("/messages"); /*Service Key*/

			URL url = new URL(urlBuilder.toString());

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("x-ncp-apigw-timestamp", Timestamp.MILLISECONDS_SINCE_EPOCH);
			conn.setRequestProperty("x-ncp-iam-access-key",accessKey);
			conn.setRequestProperty("x-ncp-apigw-signature", makeSignature(Timestamp.MILLISECONDS_SINCE_EPOCH, accessKey, secretKey));
			conn.setRequestProperty("Content-type", "application/json; utf-8");

			// 데이터 본문에 싣기
			try(DataOutputStream dos = new DataOutputStream(conn.getOutputStream())){
				dos.write(body.get("type").toString().getBytes());
				dos.write(body.get("contentType").toString().getBytes());
				dos.write(body.get("from").toString().getBytes());
				dos.write(body.get("content").toString().getBytes());
				dos.write(body.get("messages").toString().getBytes());
				dos.write(body.get("reserveTime").toString().getBytes());
			}

//			var body = {
//					"type":"SMS",
//					"contentType":"COMM",
//					"from": st,
//					"content": content,
//					"messages":[
//			{
//				"to":rt
//			}
//            ],
//			"reserveTime": reserveTime,
//        };


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

			return objectMapper.readValue(sb.toString(),JSONObject.class);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		} catch (InvalidKeyException e) {
			throw new RuntimeException(e);
		}
	}

	public static String makeSignature(String timestamp, String accessKey, String secretKey) throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException {
		String space = " ";					// one space
		String newLine = "\n";					// new line
		String method = "GET";					// method
		String url = "/photos/puppy.jpg?query1=&query2";	// url (include query string)
//		String timestamp = "{timestamp}";			// current timestamp (epoch)
//		String accessKey = "{accessKey}";			// access key id (from portal or Sub Account)
//		String secretKey = "{secretKey}";

		String message = new StringBuilder()
				.append(method)
				.append(space)
				.append(url)
				.append(newLine)
				.append(timestamp)
				.append(newLine)
				.append(accessKey)
				.toString();

		SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
		Mac           mac        = Mac.getInstance("HmacSHA256");
		mac.init(signingKey);

		byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
		String encodeBase64String = Base64.encodeBase64String(rawHmac);

		return encodeBase64String;
	}
}
