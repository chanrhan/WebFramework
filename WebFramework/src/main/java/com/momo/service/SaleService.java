package com.momo.service;

import com.momo.common.vo.*;
import com.momo.mapper.SaleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SaleService  {
	private final SaleMapper saleMapper;

	public List<String> getFilePath(SaleVO vo){
		return saleMapper.getFilePath(vo);
	}

	public List<FileVO> getFiles(SaleVO vo){
		return saleMapper.getFiles(vo);
	}

	public boolean isDuplicatedTel(SaleVO vo){
		return saleMapper.isDuplicatedTel(vo);
	}

	// Common

	public void insertPromiseContent(SalePromiseVO vo){
		saleMapper.insertPromiseContent(vo);
	}

	public int insertSale(SaleVO vo) {
		saleMapper.insertSale(vo);
		int maxSaleId = saleMapper.getMaxSaleId(vo.getCurrShopId());
		vo.setSaleId(maxSaleId);
		insertAppointmentList(vo);
		insertSupportList(vo);
		insertAddList(vo);
		insertCardList(vo);
		insertUsedDeviceList(vo);
		insertFiles(vo);
		return maxSaleId;
	}

	public void insertAppointmentList(SaleVO vo){
		List<SalePromiseVO> apmList = vo.getPmList();
		if(apmList == null || apmList.isEmpty()){
			return;
		}
		saleMapper.insertSalePromise(vo.getCurrShopId(), vo.getSaleId(), apmList);

	}

	public void insertSupportList(SaleVO vo){
		List<SaleSupportVO> supList = vo.getSupList();
		if(supList == null || supList.isEmpty()){
			return;
		}
		saleMapper.insertSaleSupport(vo.getCurrShopId(), vo.getSaleId(),supList);

	}

	public void insertAddList(SaleVO vo){
		List<SaleAddVO> addList = vo.getAddList();
		if(addList == null || addList.isEmpty()){
			return;
		}
		saleMapper.insertSaleAdd(vo.getCurrShopId(), vo.getSaleId(),addList);
	}

	public void insertCardList(SaleVO vo){
		List<SaleCardVO> cardList = vo.getCardList();

		if(cardList == null || cardList.isEmpty()){
			return;
		}

		saleMapper.insertSaleCard(vo.getCurrShopId(), vo.getSaleId(),cardList);
	}

	public void insertUsedDeviceList(SaleVO vo){
		List<SaleUsedDeviceVO> usedDeviceList = vo.getUdList();

		if(usedDeviceList == null || usedDeviceList.isEmpty()){
			return;
		}
		saleMapper.insertSaleUsedDevice(vo.getCurrShopId(), vo.getSaleId(),usedDeviceList);
	}

	public void insertFiles(SaleVO vo){
		List<String> files = vo.getFiles();

		if(files == null || files.isEmpty()){
			return;
		}
		saleMapper.insertSaleFiles(vo.getCurrShopId(), vo.getSaleId(), files);
	}

	@Transactional
	public int updateSale(SaleVO vo) {
		int rst = saleMapper.updateSale(vo);
		rst += updateSaleAppointment(vo);
		rst += updateSaleSupport(vo);
		rst += updateSaleAdd(vo);
		rst += updateSaleCard(vo);
		rst += updateSaleUsedDevice(vo);
		rst += updateSaleFiles(vo);
		return rst;
	}


	public int updateSaleAppointment(SaleVO vo){
		List<SalePromiseVO> apmList = vo.getPmList();

		if(apmList == null || apmList.isEmpty()){
			return 0;
		}

		int currShopId = vo.getCurrShopId();
		int saleId = vo.getSaleId();

		int rst = saleMapper.deleteAllSalePromise(currShopId, saleId);
		saleMapper.insertSalePromise(currShopId, saleId, apmList);

		return rst;
	}

	public int updateSaleSupport(SaleVO vo){
		List<SaleSupportVO> supList = vo.getSupList();

		if(supList == null || supList.isEmpty()){
			return 0;
		}

		int currShopId = vo.getCurrShopId();
		int saleId = vo.getSaleId();

		int rst =saleMapper.deleteAllSaleSupport(currShopId,saleId);
		saleMapper.insertSaleSupport(currShopId, saleId,supList);
		return rst;
	}

	public int updateSaleAdd(SaleVO vo){
		List<SaleAddVO> addList = vo.getAddList();

		if(addList == null || addList.isEmpty()){
			return 0;
		}

		int currShopId = vo.getCurrShopId();
		int saleId = vo.getSaleId();

		int rst = saleMapper.deleteAllSaleAdd(currShopId,saleId);
		saleMapper.insertSaleAdd(currShopId, saleId,addList);
		return rst;
	}

	public int updateSaleCard(SaleVO vo){
		List<SaleCardVO> cardList = vo.getCardList();

		if(cardList == null || cardList.isEmpty()){
			return 0;
		}

		int currShopId = vo.getCurrShopId();
		int saleId = vo.getSaleId();

		int rst = saleMapper.deleteAllSaleCard(currShopId, saleId);
		saleMapper.insertSaleCard(currShopId, saleId,cardList);
		return rst;
	}

	public int updateSaleUsedDevice(SaleVO vo){
		List<SaleUsedDeviceVO> usedDeviceList = vo.getUdList();

		if(usedDeviceList == null || usedDeviceList.isEmpty()){
			return 0;
		}

		int currShopId = vo.getCurrShopId();
		int saleId = vo.getSaleId();

		int rst = saleMapper.deleteAllSaleUsedDevice(currShopId, saleId);
		saleMapper.insertSaleUsedDevice(currShopId, saleId,usedDeviceList);
		return rst;
	}

	public int updateSaleFiles(SaleVO vo){
		List<String> files = vo.getFiles();

		if(files == null || files.isEmpty()){
			return 0;
		}

		int currShopId = vo.getCurrShopId();
		int saleId = vo.getSaleId();

		int rst = saleMapper.deleteAllSaleFiles(vo);
		saleMapper.insertSaleFiles(currShopId, saleId, files);
		return rst;
	}

	public int deleteSaleFileAll(SaleVO vo){
		return saleMapper.deleteAllSaleFiles(vo);
	}



	public int deleteSale(int currShopId, int saleId) {
		return saleMapper.deleteSale(currShopId, saleId);
	}

	public Map<String,Object> getSaleAll(SaleSearchVO vo){
		return saleMapper.getSaleAll(vo);
	}
	public List<Map<String,Object>> getSaleSimple(SaleSearchVO vo){
		return saleMapper.getSaleSimple(vo);
	}

	public Map<String,Object> getSaleOne(int currShopId, int saleId){
		return saleMapper.getSaleOne(currShopId, saleId);
//		Map<String,Object> sale = new HashMap<>();
//		sale.put("sale", saleMapper.getSaleOne(currShopId,saleId));
//
//		sale.put("pm_list", saleMapper.getSalePromiseDetail(currShopId, saleId));
//		sale.put("sup_list", saleMapper.getSaleSupportDetail(currShopId, saleId));
//		sale.put("add_list", saleMapper.getSaleAddDetail(currShopId, saleId));
//		sale.put("card_list", saleMapper.getSaleCardDetail(currShopId, saleId));
//		sale.put("ud_list", saleMapper.getSaleUsedDeviceDetail(currShopId, saleId));
//
//		return sale;
	}



	public int deleteSaleBulk(int currShopId, List<Integer> deletes){
		int result = saleMapper.deleteSaleBulk(currShopId, deletes);
//		for(int saleId: deletes){
//			result += saleMapper.deleteSale(currShopId, saleId);
//		}
		return result;
	}

	// task,= category
	public Map<String,Object> getSaleAsUsedDevice(SaleSearchVO vo){
		return saleMapper.getSaleAsUsedDevice(vo);
	}

	public Map<String,Object> getSaleAsCard(SaleSearchVO vo){
		return saleMapper.getSaleAsCard(vo);
	}

	public Map<String,Object> getSaleAsComb(SaleSearchVO vo){
		return saleMapper.getSaleAsComb(vo);
	}

	public Map<String,Object> getSaleAsSupport(SaleSearchVO vo){
		return saleMapper.getSaleAsSupport(vo);
	}

//	public List<Integer> getSaleAsPromise(SaleSearchVO vo){
//		return saleMapper.getSaleAsPromise(vo);
//	}


	// promise

	public Map<String,Object>getPromise(SaleSearchVO vo){
		int currShopId = vo.getCurrShopId();
		Map<String,Object> sale = saleMapper.getSaleAsPromise(vo);

//		for(int i=0;i<sale.size();++i){
//			int saleId = Integer.parseInt(sale.get(i).get("sale_id").toString());
//			List<Map<String,Object>> promise = saleMapper.getSalePromiseDetail(currShopId, saleId);
//			sale.get(i).put("pm_list", promise);
//		}

		return sale;
	}




	// 진행현황 관리

	public int changeUsedDeviceState(SaleVO vo){
		if(vo.getState() == 2){
			return saleMapper.updateUsedDeviceCms(vo);
		}
		return saleMapper.changeUsedDeviceState(vo);
	}
	public int changeCardState(SaleVO vo){
		return saleMapper.changeCardState(vo);
	}
	public int changeCombState(SaleVO vo){
		return saleMapper.changeCombState(vo);
	}
	public int changeSupportState(SaleVO vo){
		return saleMapper.changeSupportState(vo);
	}
	public int changePromiseState(SaleVO vo){
		return saleMapper.changePromiseState(vo);
	}
	public int updateUsedDeviceCms(SaleVO vo){
		return saleMapper.updateUsedDeviceCms(vo);
	}

	// 메인 페이지 (Dashboard)
	//  각 항목별 요약 (판매 금액/개수, 전월대비 증가/감소량 퍼센트 )
	public List<Map<String,Object>> getSummary(int currShopId, String prevMonth, String currMonth){
		return saleMapper.getSummary(currShopId, prevMonth, currMonth);
	}

	// 판매일보 대비 항목(카드/세컨/부가서비스) 비율 (항목 개수)
	public List<Map<String, Object>> getSaleRatio(int currShopId, String date){
		return saleMapper.getSaleRatio(currShopId, date);
	}

	// 각 항목별 진행 현황 (완료 개수, 총 개수)
	public List<Map<String,Object>> getWorkInProcess(int currShopId, String date){
		return saleMapper.getWorkInProcess(currShopId, date);
	}

	// 각 항목별 전월 대비 증가/감소량
	public Integer getCtChangeAmount(CommonVO vo){
		return saleMapper.getCtChangeAmount(vo);
	}
	public Integer getInternetChangeAmount(CommonVO vo){
		return saleMapper.getInternetChangeAmount(vo);
	}
	public Integer getTvChangeAmount(CommonVO vo){
		return saleMapper.getTvChangeAmount(vo);
	}
	public Float getTotalCmsChangeAmount(CommonVO vo){
		return saleMapper.getTotalCmsChangeAmount(vo);
	}
	public Float getAvgCmsChangeAmount(CommonVO vo){
		return saleMapper.getAvgCmsChangeAmount(vo);
	}

	// 그래프 페이지
	// 그래프 요약
	public List<Map<String,Object>> getGraphSummary(CommonVO vo){
		vo.setRange(6);
		return saleMapper.getGraphSummary(vo);
	}

	public Map<String,String> getCtGraphByDateType(CommonVO vo){
		return saleMapper.getCtGraphByDateType(vo);
	}

	public Map<String,String> getInternetGraphByDateType(CommonVO vo){
		return saleMapper.getInternetGraphByDateType(vo);
	}

	public Map<String,String> getTvGraphByDateType(CommonVO vo){
		return saleMapper.getTvGraphByDateType(vo);
	}

	public Map<String,String> getMarginGraphByDateType(CommonVO vo){
		return saleMapper.getMarginGraphByDateType(vo);
	}

	public Map<String,String> getAvgMarginGraphByDateType(CommonVO vo){
		return saleMapper.getAvgMarginGraphByDateType(vo);
	}

	public List<Integer> getCtCountBySelectType(CommonVO vo){
		return saleMapper.getCtCountBySelectType(vo);
	}

	public List<Map<String,Object>> getStatBySelectType(CommonVO vo){
		return saleMapper.getStatBySelectType(vo);
	}

	// 파이 그래프
	public Map<String,Object> getIstmRatio(CommonVO vo){
		return saleMapper.getIstmRatio(vo);
	}
	public Map<String,Object> getProviderRatio(CommonVO vo){
		return saleMapper.getProviderRatio(vo);
	}
	public Map<String,Object> getActvTpRatio(CommonVO vo){
		return saleMapper.getActvTpRatio(vo);
	}
	public Map<String,Object> getGenderRatio(CommonVO vo){
		return saleMapper.getGenderRatio(vo);
	}

	// 통계 페이지
	public Map<String,Object> getPersonalStatistics(CommonVO vo){
		return saleMapper.getPersonalStatistics(vo);
	}

}
