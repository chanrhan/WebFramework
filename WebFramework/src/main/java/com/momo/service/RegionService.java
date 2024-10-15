package com.momo.service;

import com.momo.mapper.RegionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RegionService {
	private final RegionMapper regionMapper;

	public List<String> selectAllState(){
		return regionMapper.selectAllState();
	}

	public String selectCityByState(String state){
		return regionMapper.selectCityByState(state);
	}
}
