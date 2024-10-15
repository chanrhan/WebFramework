package com.webframework.api;

import com.webframework.common.response.JwtVO;
import com.webframework.common.util.SecurityContextUtil;
import com.webframework.common.vo.LoginVO;
import com.webframework.common.vo.UserVO;
import com.webframework.provider.JwtProvider;
import com.webframework.service.JwtService;
import com.webframework.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/public")
public class PublicController {
	private final UserService userService;
	private final JwtProvider jwtProvider;
	private final JwtService jwtService;

	/**
	 * 로그인
	 * @param vo map
	 * @return ResponseEntity
	 */
	@PostMapping("/login")
	public ResponseEntity<Boolean> login(HttpSession session,
								   HttpServletResponse response, @RequestBody LoginVO vo) {
		Authentication authentication = userService.login(vo.getUsername(), vo.getPassword());

		JwtVO jwtVO = jwtProvider.generateToken(authentication, vo.isRememberMe());
		System.out.println(jwtVO);

		jwtService.saveRefreshToken(jwtVO);
		jwtProvider.setHeaderJwtToken(response, jwtVO);

		session.setAttribute("curr_shop_id", userService.getSessionData(vo.getUsername()));

		return ResponseEntity.ok(vo.isRememberMe());
	}

	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session,
									@RequestParam String refreshToken){
		String username = SecurityContextUtil.getUsername();
		if(StringUtils.hasText(username)){
			jwtService.revokeToken(username, refreshToken);
			session.removeAttribute("curr_shop_id");
		}
		return ResponseEntity.ok().build();
	}

	/**
	 * 회원가입
	 * @param vo UserVO
	 * @return ResponseEntity
	 */
	@PostMapping("/signup")
	@Transactional
	public ResponseEntity<?> signup(HttpServletResponse response, HttpSession session, @RequestBody UserVO vo){
//		boolean existed = userService.existUserId(vo.getId());
////		log.info("existed: {}", existed);
//		if(existed){
//			return ResponseEntity.ok(2);
//		}
		int result = userService.insertUser(vo);
		if (result == 0) {
			return ResponseEntity.notFound().build();
		}

		// 즉시 로그인
		Authentication authentication = userService.loginDirectly(vo.getId(), session);
		JwtVO          jwtVO          = jwtProvider.generateToken(authentication, false);

		jwtService.saveRefreshToken(jwtVO);
		jwtProvider.setHeaderJwtToken(response, jwtVO);

		return ResponseEntity.ok(true);
	}


	/**
	 * 휴대폰 인증번호 전송
	 * @param tel string
	 * @return authNumber
	 */
	@GetMapping("/auth/send")
	public ResponseEntity<Boolean> sendAuthNumber(@RequestParam String tel){
		// 휴대폰 인증번호 보내는 api
		return ResponseEntity.ok(false);
	}

	/**
	 * 아이디 존재 여부 검사
	 * @param userId string
	 * @return Boolean
	 */
	@GetMapping("/user/id/{userId}/exist")
	public ResponseEntity<Boolean> existUserId(@PathVariable String userId) {
		return ResponseEntity.ok(userService.existUserId(userId));
	}

	/**
	 * 이메일 존재 여부 검사
	 * @param email string
	 * @return Boolean
	 */
	@GetMapping("/user/email/{email}/exist")
	public ResponseEntity<Boolean> existEmail(@PathVariable String email) {
		return  ResponseEntity.ok(userService.existEmail(email));
	}

	/**
	 * 전화번호, 이메일 보호된 상태로 가져오기
	 * @param id string
	 * @return protected tel, email
	 */
	@GetMapping("/user/tel-email/protected")
	public ResponseEntity<Map<String,Object>> getProtectedTelAndEmail(@RequestParam String id){
		return ResponseEntity.ok(userService.getProtectedTelAndEmail(id));
	}

	/**
	 * 아이디와 휴대폰번호 또는 이메일 일치 여부 검사
	 * @param userId string
	 * @param tel string
	 * @param email string
	 * @return Boolean
	 */
	@GetMapping("/user/{userId}/match")
	public ResponseEntity<Boolean> matchUserId(@PathVariable String userId,
												  @RequestParam(required = false)String tel,
												  @RequestParam(required = false)String email){
		UserVO vo = UserVO.builder().id(userId).tel(tel).email(email).build();
		return ResponseEntity.ok(userService.matchUserId(vo));
	}

	/**
	 * 휴대폰번호 또는 이메일로 아이디 찾기
	 * @param tel string
	 * @param email string
	 * @return {
	 *     아이디
	 *     가입일자
	 * }
	 */
	@GetMapping("/user/find")
	public ResponseEntity<List<Map<String,Object>>> findUser(@RequestParam String by,
										   @RequestParam(required = false) String data){
		if("tel".equals(by)){
			return ResponseEntity.ok(userService.findUserByTelEmail(data, ""));
		}else{
			return ResponseEntity.ok(userService.findUserByTelEmail("", data));
		}
	}






	/**
	 * 비밀번호 재설정
	 * @param bearerToken string
	 * @param vo UserVO
	 * @return Boolean
	 */
	@PostMapping("/reset/password")
	public ResponseEntity<?> resetPassword(@RequestHeader(value = "RESET-TOKEN", required = true)String bearerToken, @RequestBody UserVO vo){
		log.info("reset token: {}",bearerToken);
		String accessToken = jwtProvider.getBearerTokenToString(bearerToken);
		Authentication authentication = jwtProvider.getAuthentication(accessToken);
		log.info("reset auth: {}",authentication);
		if(!authentication.getAuthorities().contains(new SimpleGrantedAuthority("RESET_PWD"))){
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}


		return ResponseEntity.ok(userService.resetPassword(vo) != 0);
	}


}
