package com.momo.service;

import com.momo.common.vo.GMDVO;
import com.momo.mapper.GMDMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class GMDService {
    private final GMDMapper gmdMapper;

    // 정적 목록
    public Map<String,Object> getDevice(GMDVO vo){
        return gmdMapper.getDevice(vo);
    }

    public Map<String,Object> getSecondDevice(GMDVO vo){
        return gmdMapper.getSecondDevice(vo);
    }
    public Map<String,Object> getCtPlan(GMDVO vo){
        return gmdMapper.getCtPlan(vo);
    }

    public Map<String,Object> getSecondDeviceById(int id){
        return gmdMapper.getSecondDeviceById(id);
    }

    // 동적 목록
    public Map<String,Object> getExtraService(GMDVO vo){
        return gmdMapper.getExtraService(vo);
    }

    public Map<String,Object> getInternetPlan(GMDVO vo){
        return gmdMapper.getInternetPlan(vo);
    }

    public Map<String,Object> getTvPlan(GMDVO vo){
        return gmdMapper.getTvPlan(vo);
    }

    public Map<String,Object> getComb(GMDVO vo){
        return gmdMapper.getComb(vo);
    }

    public Map<String,Object> getSupportDiv(GMDVO vo){
        return gmdMapper.getSupportDiv(vo);
    }

    public Map<String,Object> getAddDiv(GMDVO vo){
        return gmdMapper.getAddDiv(vo);
    }

    // 추가

    public void insertDeviceAll(List<GMDVO> list){
         gmdMapper.insertDeviceAll(list);
    }
    public void insertSecondDeviceAll(List<GMDVO> list){
        gmdMapper.insertSecondDeviceAll(list);
    }
    public void insertCtPlanAll(List<GMDVO> list){
        gmdMapper.insertCtPlanAll(list);
    }
    // 동적 추가
    public void insertInternetPlanAll(int currShopId,List<GMDVO> list){
        gmdMapper.insertInternetPlanAll(currShopId, list);
    }
    public void insertTvPlanAll(int currShopId,List<GMDVO> list){
        gmdMapper.insertTvPlanAll(currShopId, list);
    }
    public void insertExtraServiceAll(int currShopId,List<GMDVO> list){
        gmdMapper.insertExtraServiceAll(currShopId, list);
    }
    public void insertSupportDivAll(int currShopId,List<GMDVO> list){
        gmdMapper.insertSupportDivAll(currShopId, list);
    }
    public void insertAddDivAll(int currShopId,List<GMDVO> list){
        gmdMapper.insertAddDivAll(currShopId, list);
    }
    public void insertCombAll(int currShopId,List<GMDVO> list){
        gmdMapper.insertCombAll(currShopId, list);
    }

    // 삭제
    public int deleteDeviceAll(List<Integer> list){
        return gmdMapper.deleteDeviceAll(list);
    }
    public int deleteSecondDeviceAll(List<Integer> list){
        return gmdMapper.deleteSecondDeviceAll(list);
    }
    public int deleteCtPlanAll(List<Integer> list){
        return gmdMapper.deleteCtPlanAll(list);
    }

    public int deleteInternetPlanAll(int currShopId, List<Integer> list){
        return gmdMapper.deleteInternetPlanAll(currShopId, list);
    }
    public int deleteTvPlanAll(int currShopId, List<Integer> list){
        return gmdMapper.deleteTvPlanAll(currShopId, list);
    }
    public int deleteSupportDivAll(int currShopId, List<Integer> list){
        return gmdMapper.deleteSupportDivAll(currShopId, list);
    }
    public int deleteAddDivAll(int currShopId, List<Integer> list){
        return gmdMapper.deleteAddDivAll(currShopId, list);
    }
    public int deleteExsvcAll(int currShopId, List<Integer> list){
        return gmdMapper.deleteExsvcAll(currShopId, list);
    }
    public int deleteCombTpAll(int currShopId, List<Integer> list){
        return gmdMapper.deleteCombTpAll(currShopId, list);
    }

    // 수정
    public int updateDevice(GMDVO vo){
        return gmdMapper.updateDevice(vo);
    }
    public int updateSecondDevice(GMDVO vo){
        return gmdMapper.updateSecondDevice(vo);
    }
    public int updateCtPlan(GMDVO vo){
        return gmdMapper.updateCtPlan(vo);
    }
    //
    public int updateInternetPlan(GMDVO vo){
        return gmdMapper.updateInternetPlan(vo);
    }
    public int updateTvPlan(GMDVO vo){
        return gmdMapper.updateTvPlan(vo);
    }
    public int updateSupportDiv(GMDVO vo){
        return gmdMapper.updateSupportDiv(vo);
    }
    public int updateAddDiv(GMDVO vo){
        return gmdMapper.updateAddDiv(vo);
    }
    public int updateExsvc(GMDVO vo){
        return gmdMapper.updateExsvc(vo);
    }
    public int updateCombTp(GMDVO vo){
        return gmdMapper.updateCombTp(vo);
    }

}
