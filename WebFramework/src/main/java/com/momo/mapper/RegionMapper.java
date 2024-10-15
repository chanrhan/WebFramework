package com.momo.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

// 대한민국의 시/군/구
@Mapper
public interface RegionMapper {
	public List<String> selectAllState();
	public String selectCityByState(String state);
}
