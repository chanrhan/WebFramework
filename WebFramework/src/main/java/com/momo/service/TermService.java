package com.momo.service;

import com.momo.mapper.TermMapper;
import com.momo.common.vo.SearchVO;
import com.momo.common.vo.TermVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TermService {
	private final TermMapper termMapper;

	public int insert(TermVO vo) {
		return termMapper.insertTerm(vo);
	}
	public int update(TermVO vo) {
		return termMapper.updateTerm(vo);
	}
	public int delete(int id) {
		return termMapper.deleteTerm(id);
	}
	public List<Map<String,Object>> selectTerm(TermVO vo) {
		return termMapper.selectTerm(vo);
	}
	public List<Map<String,Object>> searchTerm(SearchVO vo) {
		return termMapper.searchTerm(vo);
	}
}
