package com.momo.mapper;

import com.momo.common.vo.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SaleMapper{
	// Sale
	public void insertSale(SaleVO vo);
	public int updateSale(SaleVO vo);
	public int deleteSale(int currShopId, int saleId);
	public int deleteSaleBulk(int currShopId, List<Integer> ids);
	public Map<String,Object> getSaleAll(SaleSearchVO vo);
	public List<Map<String,Object>> getSaleSimple(SaleSearchVO vo);

	public Map<String,Object> getSaleOne(int currShopId, int saleId);

	public List<String> getFilePath(SaleVO vo);
	public List<FileVO> getFiles(SaleVO vo);

	// task, category
	public Map<String,Object> getSaleAsUsedDevice(SaleSearchVO vo);
	public Map<String,Object> getSaleAsCard(SaleSearchVO vo);
	public Map<String,Object> getSaleAsComb(SaleSearchVO vo);
	public Map<String,Object> getSaleAsSupport(SaleSearchVO vo);
	public Map<String,Object> getSaleAsPromise(SaleSearchVO vo);

	public Integer getMaxSaleId(int currShopId);

	public boolean isDuplicatedTel(SaleVO vo);
	public String getSpecFilePath(int id);

	public void insertPromiseContent(SalePromiseVO vo);

	public void insertSalePromise(int currShopId, int saleId, List<SalePromiseVO> list);
	public void insertSaleSupport(int currShopId, int saleId, List<SaleSupportVO> list);
	public void insertSaleAdd(int currShopId, int saleId, List<SaleAddVO> list);
	public void insertSaleCard(int currShopId, int saleId, List<SaleCardVO> list);
	public void insertSaleUsedDevice(int currShopId, int saleId, List<SaleUsedDeviceVO> list);
	public void insertSaleFiles(int currShopId, int saleId, List<String> list);

	public int updateSaleAsPromise(int currShopId, int saleId, int pmId, boolean checked, String content);
	public int updateSaleSupport(int currShopId, int saleId, int supId, int div, int amount);
	public int updateSaleAdd(int currShopId, int saleId, int addId, int div, int amount);
	public int updateSaleCard(int currShopId, int saleId, int cardId, int cardNm, int cardTp);
	public int updateSaleUsedDevice(int currShopId, int saleId, int usedDeviceId, String usedDeviceNm, int usedDeviceStor);

	public int deleteSalePromise(int currShopId, int saleId, int pmId);
	public int deleteSaleSupport(int currShopId, int saleId, int supId);
	public int deleteSaleAdd(int currShopId, int saleId, int addId);
	public int deleteSaleCard(int currShopId, int saleId, int cardId);
	public int deleteSaleUsedDevice(int currShopId, int saleId, int usedDeviceId);

	public int deleteAllSalePromise(int currShopId, int saleId);
	public int deleteAllSaleSupport(int currShopId, int saleId);
	public int deleteAllSaleAdd(int currShopId, int saleId);
	public int deleteAllSaleCard(int currShopId, int saleId);
	public int deleteAllSaleUsedDevice(int currShopId, int saleId);
	public int deleteAllSaleFiles(SaleVO vo);

	// 진행현황 관리
	public int changeUsedDeviceState(SaleVO vo);
	public int changeCardState(SaleVO vo);
	public int changeCombState(SaleVO vo);
	public int changeSupportState(SaleVO vo);
	public int changePromiseState(SaleVO vo);

	public int updateUsedDeviceCms(SaleVO vo);

	// 메인 페이지 (Dashboard)
	//  각 항목별 요약 (판매 금액/개수, 전월대비 증가/감소량 퍼센트 )
	public List<Map<String,Object>> getSummary(int currShopId, String prevDate, String currDate);

	// 판매일보 대비 항목(카드/세컨/부가서비스) 비율 (항목 개수)
	public List<Map<String, Object>> getSaleRatio(int currShopId, String date);

	// 각 항목별 진행 현황 (완료 개수, 총 개수)
	public List<Map<String,Object>> getWorkInProcess(int currShopId, String date);

	// 각 항목별 전월 대비 증가/감소량
	public Integer getCtChangeAmount(CommonVO vo);
	public Integer getInternetChangeAmount(CommonVO vo);
	public Integer getTvChangeAmount(CommonVO vo);
	public Float getTotalCmsChangeAmount(CommonVO vo);
	public Float getAvgCmsChangeAmount(CommonVO vo);

	// 그래프(Graph) 페이지
	// 그래프 요약
	public List<Map<String,Object>> getGraphSummary(CommonVO vo);

	public Map<String,String> getCtGraphByDateType(CommonVO vo);
	public Map<String,String> getInternetGraphByDateType(CommonVO vo);
	public Map<String,String> getTvGraphByDateType(CommonVO vo);
	public Map<String,String> getMarginGraphByDateType(CommonVO vo);
	public Map<String,String> getAvgMarginGraphByDateType(CommonVO vo);

	// 바 그래프: 나이별,요일별 무선 개수
	public List<Integer> getCtCountBySelectType(CommonVO vo);

	// 슬라이더 그래프: 모델명, 요금제, 세컨 개수
	public List<Map<String,Object>> getStatBySelectType(CommonVO vo);

	// 파이 그래프: 할부,제조사,개통유형,성별 판매일보 개수, 비율
	public Map<String,Object> getIstmRatio(CommonVO vo);
	public Map<String,Object> getProviderRatio(CommonVO vo);
	public Map<String,Object> getActvTpRatio(CommonVO vo);
	public Map<String,Object> getGenderRatio(CommonVO vo);

	// 통계 페이지
	// 개인 통계
	public Map<String,Object> getPersonalStatistics(CommonVO vo);
}
