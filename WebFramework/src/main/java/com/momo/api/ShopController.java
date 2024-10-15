package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.ShopVO;
import com.momo.service.ShopService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ShopController {
	private final ShopService shopService;

//	@GetMapping("/corp")
//	public ResponseEntity<List<Map<String,Object>>> getCorpListForRoleDetail(){
//		String username = SecurityContextUtil.getUsername();
//		ShopVO vo = ShopVO.builder().userId(username).build();
//		return ResponseEntity.ok(shopService.getCorp(vo));
//	}

	/**
	 * 매장 등록
	 * @param vo ShopVO
	 * @return Boolean
	 */
	@PostMapping("/shop")
	public ResponseEntity<?> addShopOne(@RequestBody ShopVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setUserId(username);
//		log.info("add shop one info: {}",vo);
		shopService.insertShop(vo);
//		log.info("insert count: {}", rst);
		return ResponseEntity.ok(true);
	}

	// 개발 중 필요없어서 제외한 기능
//	@PostMapping("/shop/bulk")
//	public ResponseEntity<?> addShopBulk(@RequestBody List<ShopVO> list){
//		int count = 0;
//		String username = SecurityContextUtil.getUsername();
//		for(ShopVO vo : list){
//			vo.setUserId(username);
//			vo.setShopId(new Date().hashCode());
//			log.info("add shop bulk info: {}",vo);
//			count += shopService.insertShop(vo);
//		}
//		return ResponseEntity.ok(count != 0);
//	}

	/**
	 * 회사 등록
	 * @param vo ShopVO
	 * @return Boolean
	 */
//	@PostMapping("/corp")
//	public ResponseEntity<?> addCorp(@RequestBody ShopVO vo){
//		String username = SecurityContextUtil.getUsername();
//		vo.setUserId(username);
//		log.info("corp info: {}",vo);
//		return ResponseEntity.ok(shopService.insertCorp(vo) != 0);
//	}

	/**
	 *  매장 검색
	 * @param keyword string
	 * @return {
	 *     회사 식별번호
	 *     매장 식별번호
	 *     회사명
	 *     매장명
	 * }
	 */
	@GetMapping("/shop")
	public ResponseEntity<List<Map<String,Object>>> getShop(@RequestParam(required = false)String keyword){
		ShopVO vo = ShopVO.builder().keyword(keyword).build();
		return ResponseEntity.ok(shopService.getShop(vo));
	}

	/**
	 * 소속된 모든 매장 조회
	 * @return {
	 *     회사 식별번호
	 *     매장 식별번호
	 *     회사명
	 *     매장명
	 * }
	 */
	@GetMapping("/shop/all")
	public ResponseEntity<List<Map<String,Object>>> getShopAll(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(shopService.getShopItems(username));
	}

	@GetMapping("/shop/join")
	public ResponseEntity<Boolean> joinShop(@RequestParam int shopId){
		String username = SecurityContextUtil.getUsername();
		log.info("join username: {}", username);
		if(!StringUtils.hasText(username)){
			username = "SERVER";
		}
		return ResponseEntity.ok(shopService.joinShop(username, shopId));
	}

	@PostMapping("/shop/admin")
	public ResponseEntity<Map<String,Object>> getShopAdmin(@RequestBody ShopVO vo){
		return ResponseEntity.ok(shopService.getShopAdmin(vo));
	}

}
