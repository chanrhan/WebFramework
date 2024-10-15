package com.webframework.mapper;

import com.webframework.common.vo.SearchVO;
import com.webframework.common.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
	public Map<String,Object> getUserAll(UserVO vo);


	public Integer getSessionData(String userId);
	public String getName(String id);

	public Map<String,String> getNotificationData(String userId, int shopId);

	public String getInnerStaff(int currShopId);
	public Map<String,Object> getInnerStaffAll(UserVO vo);
	public List<String> getInnerStaffName(int currShopId);
	public List<Map<String,Object>> findUserByTelEmail(String tel, String email);

	public List<Map<String,Object>> getStaffByShopId(String shopId);

	public int updateApprovalState(int shopId, String staffId, int state);

	public int updateCurrentShop(String userId, int shopId);
	public int updateNickname(String id, String nickname);
	public int updateBrNo(String userId, String brNo);

	public String getPassword(String id);
	public int updatePassword(UserVO vo);
	public int resetPassword(UserVO vo);

	public Map<String,Object> findTelEmailById(String id);

	public boolean existUserId(String userId);
	public boolean existEmail(String email);

	public boolean matchUserId(UserVO vo);

	public String getProfilePicture(String id);
	public int updatePfp(String id, String path);

	public Map<String,Object> getConnectedUser(String id);

	public int loginNow(String id);
	public List<Map<String,Object>> getChatInvitableUser(SearchVO vo);

	public int updateUserToDormant(int date);

	// User Account
	public int insertUser(UserVO vo);
	public int updateUser(UserVO vo);
	public int deleteUser(String id);
	public Map<String,Object> getUserAsAuthorization(String userId);

	public Map<String,Object> getUserInfo(String userId);
	public List<Map<String,Object>> getUser(UserVO vo);

	// Staff
	public int insertStaff(UserVO vo);
	public int updateStaff(UserVO vo);
	public int deleteStaff(String id);

	public Integer getInnerStaffTotalCount(int currShopId);

//	public List<Map<String,Object>> getUserAsStaff(UserVO vo);
//	public List<Map<String,Object>> searchEmp(SearchVO vo);
	public boolean isApproved(String id);
}
