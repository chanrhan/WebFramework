package com.webframework.api;

import com.webframework.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/img")
public class ImageController {
	private final ImageService imageService;

	@PostMapping("/upload")
	public ResponseEntity<String> upload(@RequestPart MultipartFile file) {
		return ResponseEntity.ok(imageService.upload("spec", file));
	}

	@GetMapping("/download/{dir}")
	public ResponseEntity<?> downloadPfp(@PathVariable String dir,
										 @RequestParam String filename) throws IOException {
		return imageService.downloadResource(dir,filename);
	}


//	/**
//	 * 견적서 사진 불러오기
//	 * @param id integer
//	 * @return Image Binary
//	 * @throws IOException
//	 */
//	@GetMapping("/spec/{id}")
//	@ResponseBody
//	public ResponseEntity<byte[]> downloadSpecImage(@PathVariable int id) throws IOException {
//		String path = saleService.getSpecFilePath(id);
//		if(!StringUtils.hasText(path)){
//			return ResponseEntity.status(HttpStatus.OK).body(null);
//		}
//		return imageService.download("spec",path);
//	}
//
//	/**
//	 * 프로필 사진 불러오기
//	 * @param id string
//	 * @return Image Binary
//	 * @throws IOException
//	 */
//	@GetMapping("/pfp/{id}")
//	@ResponseBody
//	public ResponseEntity<byte[]> downloadPfpImage(@PathVariable String id) throws IOException {
////		log.info("request pfp : {}", id);
//		String path = userService.getPfpFilePath(id);
////		log.info("pfp path : {}", path);
//		if(!StringUtils.hasText(path)){
//			return ResponseEntity.status(HttpStatus.OK).body(null);
//		}
//		return imageService.download("pfp",path);
//	}

}
