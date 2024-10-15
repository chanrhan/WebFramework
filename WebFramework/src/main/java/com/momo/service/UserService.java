package com.momo.service;

import com.momo.common.UserDetailsImpl;
import com.momo.common.enums.codes.CommonErrorCode;
import com.momo.common.util.AligoApiUtil;
import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.ApiVO;
import com.momo.common.vo.SearchVO;
import com.momo.common.vo.UserVO;
import com.momo.exception.BusinessException;
import com.momo.mapper.UserMapper;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService  implements UserDetailsService{
	private static final Logger log = LoggerFactory.getLogger(UserService.class);
	private final PasswordEncoder  passwordEncoder;
	private final UserMapper       userMapper;

	public int getSessionData(String userId){
		return userMapper.getSessionData(userId);
	}

	public Integer sendAuthNumber(String tel){
		Random random = new Random();
		int authNumber = random.nextInt(1000, 9000);
		ApiVO vo = ApiVO.builder()
				.msg("[모모] 인증번호는 [" + authNumber +"] 입니다")
				.msgType("SMS")
				.receiver(tel)
				.build();
		Map<String,Object> res = AligoApiUtil.sendMessage(vo);
		log.info("send auth: {}", res);
		if(!res.get("result_code").toString().equals("1")){
			return null;
		}
		return authNumber;
	}


	public Map<String,Object> getUserAll(UserVO vo){
		return userMapper.getUserAll(vo);
	}

	public String getInnerStaff(int currShopId){
		return userMapper.getInnerStaff(currShopId);
	}

	public Map<String,Object> getInnerStaffAll(UserVO vo){
		return userMapper.getInnerStaffAll(vo);
	}

	public Integer getInnerStaffTotalCount(int currShopId){
		return userMapper.getInnerStaffTotalCount(currShopId);
	}

	public List<String> getInnerStaffName(int currShopId){
		return userMapper.getInnerStaffName(currShopId);
	}

	@Deprecated
	public List<Map<String,Object>> getStaffByShopId(String shopId){
		return userMapper.getStaffByShopId(shopId);
	}

	public int updateCurrentShop(String userId, int shopId){
		return userMapper.updateCurrentShop(userId, shopId);
	}

	public int updateNickname(String id, String nickname){
		return userMapper.updateNickname(id, nickname);
	}
	public int updateBrNo(String id, String brNo){
		return userMapper.updateBrNo(id, brNo);
	}

	public int resetPassword(UserVO vo){
		vo.setPwd(passwordEncoder.encode(vo.getPwd()));
		return userMapper.resetPassword(vo);
	}
	public boolean existUserId(String userId){
		return userMapper.existUserId(userId);
	}

	public boolean existEmail(String email){
		return userMapper.existEmail(email);
	}

	public List<Map<String,Object>> findUserByTelEmail(String tel, String email){
		return userMapper.findUserByTelEmail(tel, email);
	}

	public boolean inviteAll(String senderId, List<String> telList){
		return false;
	}


	public Map<String,Object> getProtectedTelAndEmail(String id){
		Map<String,Object> map = userMapper.findTelEmailById(id);

		String tel = map.get("tel").toString();
		String email = map.get("email").toString();

		if(tel == null || email == null){
			return null;
		}
		map.put("tel", tel.substring(0, tel.length()-3) + "****");

		int idx = email.indexOf('@');
		StringBuilder sb = new StringBuilder(email);
		sb.replace(Math.max(idx - 4, 0), idx, "****");
		map.put("email", sb.toString());

		return map;
	}

	public boolean matchUserId(UserVO vo){
		return userMapper.matchUserId(vo);
	}


	public int updateUserToDormant(int date){
		return userMapper.updateUserToDormant(date);
	}

	public Map<String,Object> getUserInfo(String id){
		return userMapper.getUserInfo(id);
	}

	public Map<String,Object> getUserAsAuthorization(String id){
		return userMapper.getUserAsAuthorization(id);
	}

	// Common
	public Authentication loginDirectly(String username, HttpSession session){
		UserDetails user = loadUserByUsername(username);
		Authentication authentication  = new UsernamePasswordAuthenticationToken(user,"",user.getAuthorities());

		SecurityContext context = SecurityContextHolder.createEmptyContext();
		context.setAuthentication(authentication);
		SecurityContextHolder.setContext(context);
		// 수정된 context를 현재 session에 넣어줘야 로그인 상태가 유지된다.
		session.setAttribute("SPRING_SECURITY_CONTEXT", context);
		return authentication;
	}

	// User Account
	public int insertUser(UserVO vo){
		vo.setPwd(passwordEncoder.encode(vo.getPwd()));
		return userMapper.insertUser(vo);
	}
	public int updateUser(UserVO vo){
		return userMapper.updateUser(vo);
	}

	public int updatePassword(UserVO vo){
		String orgPwd = userMapper.getPassword(vo.getId());
		if(!passwordEncoder.matches(vo.getPwd(), orgPwd)){
			return 0;
		}
		vo.setPwd(orgPwd);
		vo.setUpdatePwd(passwordEncoder.encode(vo.getUpdatePwd()));
		return userMapper.updatePassword(vo);
	}
	public int updateApprovalState(int shopId, String staffId, int state){
		return userMapper.updateApprovalState(shopId,staffId,state);
	}
	public int updatePfp(String userId, String pfpPath){
		return userMapper.updatePfp(userId, pfpPath);
	}
	public int deleteUser(String id) {
		return userMapper.deleteUser(id);
	}

	public List<Map<String,Object>> getUser(UserVO vo) {
		return userMapper.getUser(vo);
	}

	public List<Map<String,Object>> searchChatInvitableUser(SearchVO vo){
		return userMapper.getChatInvitableUser(vo);
	}


//	public void replaceAuthority(String role){
//		replaceAuthority(role, false);
//	}

//	public void replaceAuthority(String role, boolean approve){
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		List<GrantedAuthority> updateAuthorities = new ArrayList<>();
//
//		updateAuthorities.add(new SimpleGrantedAuthority(role));
//		if(approve){
//			updateAuthorities.add(new SimpleGrantedAuthority("APPROVE"));
//		}
//
//		Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(),auth.getCredentials(),updateAuthorities);
//
//		SecurityContextHolder.getContext().setAuthentication(newAuth);
//	}

	public Authentication login(String username, String password){
		Authentication authentication = authenticate(username, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		userMapper.loginNow(username);

		return authentication;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws BusinessException{
		Map<String,Object> user = getUserAsAuthorization(username);
//		log.info("load user: {}",user);
		if(user == null){
			throw new BusinessException(CommonErrorCode.LOGIN_FAILED);
		}

		String id = user.get("id").toString();
		String pwd = user.get("pwd").toString();
//		System.out.println("role: "+Integer.parseInt(user.get("role")));

		String role = null;
		try {
			role = switch (Integer.parseInt(user.get("role").toString())) {
				case 1 -> "STF";
				case 2 -> "BM";
				case 3 -> "ADMIN";
				default -> "NONE";
			};
		}catch (NullPointerException e){
			role = "NONE";
		}


		if(Objects.equals(role, "NONE")){
			return new UserDetailsImpl(id, pwd, "ROLE_NONE");
		}

		UserDetailsImpl userDetails = new UserDetailsImpl(id, pwd, "ROLE_"+role);

		if(!Objects.equals(role, "ADMIN")){
//			Map<String,Object> emp = selectEmp(UserVO.builder().empId(id).build()).get(0);
			if(userMapper.isApproved(id)){
//				System.out.println("success!");
				userDetails.add(new SimpleGrantedAuthority("APPROVE"));
			}
		}

		return userDetails;
	}


	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = loadUserByUsername(username);

//		if (userDetails == null) {
//			throw new BusinessException(CommonErrorCode.LOGIN_FAILED);
////			throw new BadCredentialsException("Invalid username and password");
//		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BusinessException(CommonErrorCode.LOGIN_FAILED);
//			throw new BadCredentialsException("Invalid password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
}
