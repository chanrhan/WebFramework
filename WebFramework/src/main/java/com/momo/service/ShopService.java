package com.momo.service;

import com.momo.mapper.ShopMapper;
import com.momo.common.vo.ShopVO;
import com.momo.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShopService {
	private static final Logger log = LoggerFactory.getLogger(ShopService.class);
	private final ShopMapper shopMapper;
	private final UserMapper userMapper;
	private final NotificationService notificationService;

	public int updateSendTel(ShopVO vo){
		return shopMapper.updateShop(vo);
	}

	// Common
	// Shop
	public void insertShop(ShopVO vo) {
		shopMapper.insertShop(vo);
	}

	public int updateShop(ShopVO vo) {
		return shopMapper.updateShop(vo);
	}

	public int deleteShop(int id) {
		return shopMapper.deleteShop(id);
	}

	public List<Map<String,Object>> getShop(ShopVO vo) {
		return shopMapper.getShop(vo);
	}

	public List<Map<String ,Object>> getShopItems(String userId){
		return shopMapper.getShopItems(userId);
	}

	public Map<String,Object> getShopById(int id){
		ShopVO vo = ShopVO.builder().shopId(id).build();
		return shopMapper.getShop(vo).get(0);
	}

	@Transactional
	public boolean joinShop(String userId, int shopId){
		shopMapper.joinShop(userId, shopId);
		Map<String,String> map = userMapper.getNotificationData(userId, shopId);
		String senderName = map.get("name").toString();
		String receiverId = map.get("id").toString();
		log.info("join: {}",map);
		if(!StringUtils.hasText(receiverId)){
			return false;
		}
		StringBuilder sb = new StringBuilder();
		sb.append(senderName).append("님의 매장 가입 요청입니다.");

		notificationService.sendRequest(userId, receiverId, sb.toString());
		return true;
	}

	public Map<String,Object> getShopAdmin(ShopVO vo){
		return shopMapper.getShopAdmin(vo);
	}

}
