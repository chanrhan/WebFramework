package com.momo.mapper;

import com.momo.common.vo.ShopVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


@Mapper
public interface ShopMapper {
	// Shop
	public void insertShop(ShopVO vo);
	public int updateShop(ShopVO vo);
	public int deleteShop(int shopId);
	public List<Map<String,Object>> getShop(ShopVO vo);
	public List<Map<String,Object>> getShopItems(String userId);

	public void joinShop(String userId, int shopId);

	public Map<String,Object> getShopAdmin(ShopVO vo);

	// 데이터 초기화
//	public void initializeShopData()
}
