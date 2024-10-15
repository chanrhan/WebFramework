package com.momo.mapper;

import com.momo.common.vo.ItemCommonVO;
import com.momo.common.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemCommonMapper {
	// Phone Model
	public List<Map<String,Object>> selectPhoneModel(ItemCommonVO vo);
	public String getColorById(String id);
	public String getStorageById(String id);

	// Extra Service
	public int insertExsvc(ItemCommonVO vo);
	public int updateExsvc(ItemCommonVO vo);
	public int deleteExsvc(int id);
	public List<Map<String,Object>> selectExsvc(ItemCommonVO vo);
	public List<Map<String,Object>> searchExsvc(SearchVO vo);


	// Plan
	public int insertPlan(ItemCommonVO vo);
	public int updatePlan(ItemCommonVO vo);
	public int deletePlan(int id);
	public List<Map<String,Object>> selectPlan(ItemCommonVO vo);
	public List<Map<String,Object>> searchPlan(SearchVO vo);
}
