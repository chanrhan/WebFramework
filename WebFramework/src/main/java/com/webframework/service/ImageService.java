package com.webframework.service;

import com.webframework.common.util.FileServiceUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@Slf4j
public class ImageService {
	public byte[] download(String dir,String path) throws IOException {
		UrlResource resource = FileServiceUtil.getUrlResource(dir, path);
		if(!resource.exists()){
			return null;
		}
		return Files.readAllBytes(resource.getFile().toPath());
	}

	public ResponseEntity<?> downloadResource(String dir, String fileName) throws IOException {
		String str = URLEncoder.encode(fileName, StandardCharsets.UTF_8);
		str = str.replaceAll("\\+","%20");

		Path path = Paths.get(FileServiceUtil.getFilePath(dir,fileName));
		Resource resource = new InputStreamResource(Files.newInputStream(path));


		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_TYPE, "application/octect-stream")
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename="+str+";")
				.body(resource);
	}

	public boolean deleteAll(String dir, List<String> pathes){
		boolean result = true;
		for(String path: pathes){
			if(!delete(dir, path)){
				result = false;
			}
		}
		return result;
	}

	public boolean delete(String dir, String path){
		String orgPath = FileServiceUtil.getFilePath(dir, path);
		if(StringUtils.hasText(orgPath)){
			File file = new File(orgPath);
			if(file.exists()){
				if(file.delete()){
					log.info("파일이 성공적으로 삭제되었습니다");
					return true;
				}else{
					log.error("파일 삭제에 실패하였습니다");
				}
			}else{
				log.error("파일이 존재하지 않습니다");
			}
		}
		return false;
	}


	public String replace(String dir, String orgFileName, MultipartFile mf){
//		String orgPath = FileServiceUtil.getFilePath(dir, orgFileName);
		delete(dir, orgFileName);

		return upload(dir, mf);
	}

	public String upload(String dir, MultipartFile mf) {
		if (mf == null || mf.isEmpty()) {
			return null;
		}

		String fileName = FileServiceUtil.createSaveFileName(mf);
		String formatName = FileServiceUtil.extractExt(fileName);
		long fileSize = mf.getSize();
		String savePath = FileServiceUtil.getFileSavePath(dir);

		if(!new File(savePath).exists()){
			log.info(savePath+" is not existed..");
			log.info("Try to create a new directory: {}", savePath);
			try {
				new File(savePath).mkdir();
			}catch (Exception e){
				throw new IllegalArgumentException("디렉토리 생성에 실패하였습니다.");
			}
		}

		String filePath = savePath + fileName;

		try{
			FileServiceUtil.resizeImageAndSave(mf, filePath, formatName);
//			FileServiceUtil.compress(mf.getInputStream(), filePath);
//			mf.transferTo(FileServiceUtil.compressWithThumbnails(mf.getInputStream(), filePath));
		}catch (IOException e){
			log.error("파일 저장에 실패하였습니다. "+e.getMessage());
			e.printStackTrace();
			return null;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		log.info("파일 저장에 성공하였습니다: {}", filePath);
		return fileName;
	}
}
