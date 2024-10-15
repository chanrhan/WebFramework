package com.webframework.api;

import com.webframework.common.util.SecurityContextUtil;
import com.webframework.common.vo.UserVO;
import com.webframework.service.CommonService;
import com.webframework.service.ImageService;
import com.webframework.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
	private final ImageService imageService;
	private final CommonService commonService;

	/**
	 * 사용자 정보 불러오기
	 * @return {
	 * 		아이디
	 *		이름
	 *		역할
	 *		회사명
	 *		매장명
	 * }
	 */
	@GetMapping("/info")
	public ResponseEntity<Map<String,Object>> getUserInfo() throws IOException {
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.getUserInfo(username));
	}

	/**
	 * 사용자 정보 수정하기
	 * @param user UserVO
	 * @return Boolean
	 */
	@PostMapping("/profile")
	public ResponseEntity<?> updateProfile(@RequestBody UserVO user){
		String username = SecurityContextUtil.getUsername();
		user.setId(username);
		return ResponseEntity.ok(userService.updateUser(user));
	}

	@PostMapping("/pfp")
	public ResponseEntity<Boolean> updateProfileImg(@RequestPart MultipartFile file){
		String username = SecurityContextUtil.getUsername();
		String path = imageService.upload("pfp", file);
		log.info("path: {}",path);
		return ResponseEntity.ok(userService.updatePfp(username, path) > 0);
	}

	/**
	 * 호칭 변경하기
	 * @param nickname string
	 * @return Boolean
	 */
	@GetMapping("/nickname")
	public ResponseEntity<Boolean> updateNickname(@RequestParam String nickname){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.updateNickname(username, nickname) > 0);
	}

	/**
	 * 현재 매장 변경
	 */
	@GetMapping("/shop/curr")
	public ResponseEntity<?> updateCurrentShop(HttpSession session,
											   @RequestParam int shopId) {
		String username = SecurityContextUtil.getUsername();
		int result = userService.updateCurrentShop(username, shopId);
		if(result > 0){
			session.setAttribute("curr_shop_id", shopId);
		}
		return ResponseEntity.ok(result > 0);
	}


	/**
	 * 비밀번호 변경
	 * @return Boolean
	 */
	@PostMapping("/password")
	public ResponseEntity<?> updatePassword(@RequestBody UserVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setId(username);
		return ResponseEntity.ok(userService.updatePassword(vo) != 0);
	}

	/**
	 * (대표 권한)직원 검색
	 * @return {
	 *     이름
	 *     소속 매장
	 *     역할
	 *     승인 여부
	 * }
	 */
	@Deprecated
	@GetMapping("/staff")
	public ResponseEntity<List<Map<String,Object>>> getStaffList(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.getStaffByShopId(username));
	}

	/**
	 * (관리자 권한) 모든 유저 불러오기
	 * @param keyword string
	 * @return {
	 *     가입채널
	 *     이름
	 *     이메일
	 *     휴대폰번호
	 *     사입자 등록 여부
	 *     가입일
	 *     마지막 로그인 일자
	 *     역할
	 * }
	 */
	@PostMapping("/all")
	public ResponseEntity<Map<String,Object>> getUserAll(@RequestBody(required = false) UserVO vo){
		log.info("user all: {}", vo);
		return ResponseEntity.ok(userService.getUserAll(vo));
	}

	/**
	 * 매장 가입 요청
	 * @param shopId integer
	 * @return Boolean
	 */
	@PostMapping("/shop/request")
	public ResponseEntity<Boolean> reqeustShop(@RequestParam Integer shopId){

		return null;
	}

	/**
	 * 사용자 매장 가입 요청 승인
	 * @return Boolean
	 */
	@PostMapping("/{staffId}/{shopId}/state")
	@Transactional
	public ResponseEntity<Boolean> updateApprovalState(HttpSession session,
													   @PathVariable Integer shopId,
													   @PathVariable String staffId,
													   @RequestBody Integer state){
//		int currShopId = commonService.getCurrentShopId(session);
//		if(state == 1){
//			userService.updateCurrentShop(staffId, currShopId);
//		}
		return ResponseEntity.ok(userService.updateApprovalState(shopId,staffId,state)> 0);
	}

	/**
	 * 사용자 역할 변경
	 * @param userId string
	 * @param role string
	 * @return Boolean
	 */
	@PutMapping("/{userId}/role")
	public ResponseEntity<Boolean> updateRole(@PathVariable String userId,
											  @RequestParam String role){
		return null;
	}

	@GetMapping("/staff/inner")
	public ResponseEntity<String> getInnerStaff(HttpSession session){
		int currShopId = commonService.getCurrentShopId(session);
		return ResponseEntity.ok(userService.getInnerStaff(currShopId));
	}

	@GetMapping("/staff/inner/all")
	public ResponseEntity<Map<String,Object>> getInnerStaffAll(HttpSession session,
															 @RequestParam(required = false) String keyword){
		int currShopId = commonService.getCurrentShopId(session);
		UserVO vo = UserVO.builder().keyword(keyword).currShopId(currShopId).build();
		return ResponseEntity.ok(userService.getInnerStaffAll(vo));
	}

	@GetMapping("/staff/inner/count")
	public ResponseEntity<Integer> getInnerStaffTotalCount(HttpSession session){
		int currShopId = commonService.getCurrentShopId(session);
		return ResponseEntity.ok(userService.getInnerStaffTotalCount(currShopId));
	}


	@GetMapping("/staff/name/inner")
	public ResponseEntity<List<String>> getInnerStaffName(HttpSession session){
		int currShopId = commonService.getCurrentShopId(session);
		return ResponseEntity.ok(userService.getInnerStaffName(currShopId));
	}

	@PostMapping("/invite")
	public ResponseEntity<Boolean> invite(@RequestBody List<String> telList){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.inviteAll(username, telList));
	}

}
