package com.webframework.common.util;

import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.UUID;

@Component
@Slf4j
public class FileServiceUtil {
	private static final int RESIZE_WIDTH = 512;
	public static String LOCAL_STORAGE_PATH;

	@Value("${momo.file.path}") // @Value 어노테이션은 static 변수 위에 붙여서 쓰면 오류가 발생한다.
						   // 따라서 아래와 같이 Setter와 같이 사용한다.
	public void setLocalStoragePath(String path){
		LOCAL_STORAGE_PATH = path;
	}

	public static String createSaveFileName(String fileName){
		return UUID.randomUUID() + "." + extractExt(fileName);
	}

	public static String createSaveFileName(MultipartFile file){
		return createSaveFileName(file.getOriginalFilename());
	}

	public static String extractExt(String fileName){
		return fileName.substring(fileName.lastIndexOf(".") + 1);
	}

	public static String getFileSavePath(String dir){
		return LOCAL_STORAGE_PATH + dir + '/';
	}

	public static UrlResource getUrlResource(String dir, String path) throws MalformedURLException {
		return new UrlResource("file:" + LOCAL_STORAGE_PATH + dir + '/' + path);
	}

	public static Resource getResource(String dir,String path) throws IOException {
		Path path1 = Paths.get("file:" + LOCAL_STORAGE_PATH + dir + '/' + path);
		return new InputStreamResource(Files.newInputStream(path1));
	}

	public static String getFilePath(String dir, String fileName){
		return getFileSavePath(dir) + fileName;
	}

	// 대충 리사이징한 이미지 비율만큼 용량도 줄어듬
	// 1024 -> 500 했더니 용량이 약 절반 감소
	public static void resizeImageAndSave(MultipartFile file, String filePath, String formatName) throws IOException {
		BufferedImage inputImage = ImageIO.read(file.getInputStream());

		int orgWidth = inputImage.getWidth();
		int orgHeight = inputImage.getHeight();

		if(orgWidth > RESIZE_WIDTH){
			int newHeight = (orgHeight * RESIZE_WIDTH) / orgWidth;
			// 이미지 품질 설정
			// Image.SCALE_DEFAULT : 기본 이미지 스케일링 알고리즘 사용
			// Image.SCALE_FAST : 이미지 부드러움보다 속도 우선
			// Image.SCALE_REPLICATE : ReplicateScaleFilter 클래스로 구체화 된 이미지 크기 조절 알고리즘
			// Image.SCALE_SMOOTH : 속도보다 이미지 부드러움을 우선
			// Image.SCALE_AREA_AVERAGING : 평균 알고리즘 사용
			Image resizeImage = inputImage.getScaledInstance(RESIZE_WIDTH, newHeight, Image.SCALE_FAST);
			BufferedImage outputImage = new BufferedImage(RESIZE_WIDTH, newHeight, inputImage.getType());

			Graphics2D graphics2D = outputImage.createGraphics();

			// 아무 알고리즘 없이 리사이징을 하게 되면, 엘리어싱(계단현상) 등으로 인한 의도하지 않는 패턴이 생길 수 있다
			// 이를 해결하기 위한 interporlation 적용
			// 처리 속도는 느려지지만 퀄리티는 좋아진다.
			graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);

			graphics2D.drawImage(resizeImage,0,0,null);
			graphics2D.dispose();

			File newFile = new File(filePath);
			ImageIO.write(outputImage, formatName, newFile);
		}else{
			file.transferTo(new File(filePath));
		}
	}


	// 시도했지만 안 쓰는 이미지 압축 함수들
	public static void compress(InputStream is) throws Exception{
		compress(is, "C:/"+LOCAL_STORAGE_PATH);
	}

	public static void compress(InputStream is, String dest) throws Exception{
		File compressFile = new File(dest);

		OutputStream os = new FileOutputStream(compressFile);
		Thumbnails.of(is)
				.scale(1)
				.outputQuality(0.5f)
				.toOutputStream(os);


		float quality = 0.2f; // 0.1~1.0 , 숫자가 낮을수록 화질과 용량이 줄어든다

		BufferedImage image = ImageIO.read(is);
		Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("png");

		if(!writers.hasNext()){
			throw new IllegalStateException("No writers found");
		}

		ImageWriter writer = (ImageWriter) writers.next();
		ImageOutputStream ios = ImageIO.createImageOutputStream(os);
		writer.setOutput(ios);

		ImageWriteParam param = writer.getDefaultWriteParam();

		param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
		param.setCompressionQuality(quality);
		writer.write(null, new IIOImage(image, null,null), param);
		is.close();
		os.close();
		ios.close();
		writer.dispose();
	}

	public static File compressWithThumbnails(InputStream is, String dest) throws IOException {
		File output = new File(dest);
		Thumbnails.of(is)
				.scale(0.3)
				.outputQuality(0.2f)
				.toFile(output);
		return output;
	}


}
