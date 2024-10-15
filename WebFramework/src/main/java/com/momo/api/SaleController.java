package com.momo.api;

import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.vo.*;
import com.momo.service.*;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/sale")
public class SaleController {
	private final SaleService       saleService;
	private final CommonService commonService;
	private final ReserveMsgService reserveMsgService;


	private final ImageService imageService;

	@PostMapping("/simple")
	public ResponseEntity<List<Map<String,Object>>> getSaleSimple(HttpSession session,
															   @RequestBody(required = false) SaleSearchVO vo){
//		System.out.println("get sale: "+vo);
		if(vo == null){
			vo = new SaleSearchVO();
		}
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		return ResponseEntity.ok(saleService.getSaleSimple(vo));
	}

	/**
	 * 판매일보 검색
	 * @param vo SaleSearchVO
	 * @return {
	 *     판매일보 모든 컬럼
	 * }
	 */
	@PostMapping("/all")
	public ResponseEntity<Map<String,Object>> getSaleAll(HttpSession session,
													   @RequestBody(required = false) SaleSearchVO vo){
		System.out.println("get sale: "+vo);
		if(vo == null){
			vo = new SaleSearchVO();
		}
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		return ResponseEntity.ok(saleService.getSaleAll(vo));
	}

	@GetMapping("/detail/{saleId}")
	public ResponseEntity<Map<String,Object>> getSale(HttpSession session,
													  @PathVariable int saleId){
		int currShopId = commonService.getCurrentShopId(session);
		return ResponseEntity.ok(saleService.getSaleOne(currShopId, saleId));
	}


	/**
	 * 판매일보 카테고리 검색
//	 * @param category string
	 * @return {
	 *
	 * }
	 */
	@PostMapping("/category")
	public ResponseEntity<Map<String,Object>> getSale(HttpSession session,
										   @RequestBody SaleSearchVO vo){
		int category = vo.getCategory();
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);


		switch (category){
			case 0 -> {
				return ResponseEntity.ok(saleService.getSaleAsUsedDevice(vo));
			}
			case 1 -> {
				return ResponseEntity.ok(saleService.getSaleAsCard(vo));
			}
			case 2 -> {
				return ResponseEntity.ok(saleService.getSaleAsComb(vo));
			}
			case 3 -> {
				return ResponseEntity.ok(saleService.getSaleAsSupport(vo));
			}
			case 4 -> {
				return ResponseEntity.ok(saleService.getPromise(vo));
			}
		}
		return ResponseEntity.badRequest().build();
	}

//	@PostMapping("/promise")
//	public ResponseEntity<List<Map<String,Object> >> getPromise(@RequestBody SaleSearchVO vo){
//		String currShopId = SecurityContextUtil.getUsername();
//		vo.setUserId(currShopId);
//		return ResponseEntity.ok(saleService.getPromise(vo));
//	}

//	@PostMapping("/promise")
//	public ResponseEntity<Boolean> updatePromise(@RequestBody SalePromiseVO vo){
//		String currShopId = SecurityContextUtil.getUsername();
//		vo.setUserId(currShopId);
//		return ResponseEntity.ok(saleService.changePromiseState(vo) > 0);
//	}

	/**
	 * 판매일보 다중 삭제
	 * @param deletes int[]
	 * @return Boolean
	 */
	@PostMapping("/delete/bulk")
	public ResponseEntity<?> deleteSaleBulk(HttpSession session,
											@RequestBody List<Integer> deletes){
		int currShopId = commonService.getCurrentShopId(session);
		return ResponseEntity.ok(saleService.deleteSaleBulk(currShopId, deletes) != 0);
	}


	@GetMapping("/delete/{id}")
	@ResponseBody
	public ResponseEntity<Boolean> deleteSale(HttpSession session,
											  @PathVariable int id) {
		int currShopId = commonService.getCurrentShopId(session);
		return ResponseEntityUtil.okOrNotModified(saleService.deleteSale(currShopId, id));
	}

	@Transactional
	@PostMapping("/update")
	@ResponseBody
	public ResponseEntity<Boolean> updateSale(HttpSession session,
											  @RequestPart(value = "sale") SaleVO vo,
											  @RequestPart(value = "file",required = false) List<MultipartFile> files) {
		log.info("update sale vo: {}", vo);
		log.info("update files: {}", files);
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);

		List<String> insertList = new ArrayList<>();

		// 기존 파일(경로) 불러오기
		List<FileVO> orgFileList = saleService.getFiles(vo);
		if(orgFileList == null || orgFileList.isEmpty()){
			// 기존 파일이 없다면, 그냥 추가하는 것과 다름이 없음
			for(MultipartFile mf : files){
				insertList.add(imageService.upload("sale", mf));
			}
		}else{
			// 기존 파일이 있다면, 어떤걸 수정하고, 어떤 걸 삭제할지 결정해야함
			// Delete
//			List<Integer> deleteFiles = vo.getDeleteFiles();
//			if(deleteFiles != null && !deleteFiles.isEmpty()){
//				for(int id : deleteFiles){
//					imageService.delete("sale", orgFileList.get(id).getPath());
//				}
//			}

			// Insert / Update
			List<Integer> fileOrders = vo.getFileOrders();
			if(fileOrders != null && !fileOrders.isEmpty()){
				for(int i=0;i<fileOrders.size();++i){
					Integer key = fileOrders.get(i);
					if(files != null && files.get(i) != null && files.get(i).getSize() > 0){
						// new file or updated file
						insertList.add(imageService.upload("sale", files.get(i)));
					}else if(key != null){
						// existed
						String path = orgFileList.get(key-1).getPath();
						insertList.add(path);
						orgFileList.set(key-1, null);
					}
				}
			}else{
				imageService.deleteAll("sale", orgFileList.stream().map(FileVO::getPath).toList());
				return ResponseEntity.ok(saleService.deleteSaleFileAll(vo) > 0);
			}

			if(!orgFileList.isEmpty()){
				imageService.deleteAll("sale", orgFileList.stream().filter(Objects::nonNull).map(FileVO::getPath).toList());
			}

		}
		vo.setFiles(insertList);

		return ResponseEntity.ok(saleService.updateSale(vo) > 0);
	}

	/**
	 * 판매일보 추가
	 * @param vo
	 * @param files
	 * @return
	 */
	@PostMapping("/add")
	@ResponseBody
	@Transactional
	public ResponseEntity<Boolean> createSale(HttpSession session,
											  @RequestPart(value = "sale") SaleVO vo,
											  @RequestPart(value = "file", required = false) List<MultipartFile> files) {
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);

		List<String> insertList = new ArrayList<>();
		if(files != null && !files.isEmpty()){
			for(MultipartFile mf : files){
				insertList.add(imageService.upload("sale", mf));
			}
		}

		vo.setFiles(insertList);

		int maxSaleId = saleService.insertSale(vo);
		reserveMsgService.insertMsgList(currShopId, maxSaleId, vo.getRsvMsgList());
		return ResponseEntity.ok(true);
	}




	// 매장 관리

	@PostMapping("/dup/tel")
	@ResponseBody
	public ResponseEntity<Boolean> checkDupTelOnDate(@RequestBody SaleVO vo){
//		if(vo.getShopId() == null || vo.getCustTel() == null || vo.getActvDt() ==null){
//			return null;
//		}
		return ResponseEntity.ok(saleService.isDuplicatedTel(vo));
	}

	// 진행현황 관리

	@PostMapping("/state")
	@ResponseBody
	public ResponseEntity<Boolean> changeSaleState(HttpSession session,
												   @RequestBody SaleVO vo){
		vo.setCurrShopId(commonService.getCurrentShopId(session));

		int category = vo.getCategory();

		switch (category){
			case 0 -> {
				return ResponseEntity.ok(saleService.changeUsedDeviceState(vo) > 0);
			}
			case 1 -> {
				return ResponseEntity.ok(saleService.changeCardState(vo) > 0);
			}
			case 2 -> {
				return ResponseEntity.ok(saleService.changeCombState(vo) > 0);
			}
			case 3 -> {
				return ResponseEntity.ok(saleService.changeSupportState(vo) > 0);
			}
			case 4 -> {
				return ResponseEntity.ok(saleService.changePromiseState(vo) > 0);
			}
		}
		return ResponseEntity.badRequest().build();
	}

	@PostMapping("/ud/cms")
	public ResponseEntity<Boolean> updateUsedDeviceCms(HttpSession session,
													   @RequestBody SaleVO vo){
		vo.setCurrShopId(commonService.getCurrentShopId(session));
		return ResponseEntity.ok(saleService.updateUsedDeviceCms(vo) > 0);
	}

	@PostMapping("/promise/content")
	public ResponseEntity<Boolean> insertPromiseContent(HttpSession session,
														@RequestBody SalePromiseVO vo){
		vo.setCurrShopId(commonService.getCurrentShopId(session));
		saleService.insertPromiseContent(vo);
		return ResponseEntity.ok(true);
	}

	@GetMapping("/summary")
	public ResponseEntity<List<Map<String,Object>>> getSummary(HttpSession session,
															   @RequestParam String prevMonth,
															   @RequestParam String month){
		int currShopId = commonService.getCurrentShopId(session);
		return ResponseEntity.ok(saleService.getSummary(currShopId, prevMonth,month));
	}

	@GetMapping("/ratio")
	public ResponseEntity<List<Map<String,Object>>> getSaleRatio(HttpSession session,
																 @RequestParam String date){
		int currShopId = commonService.getCurrentShopId(session);
		return ResponseEntity.ok(saleService.getSaleRatio(currShopId, date));
	}

	@GetMapping("/wip")
	public ResponseEntity<List<Map<String,Object>>> getWorkInProcess(HttpSession session,
																	 @RequestParam String date){
		int currShopId = commonService.getCurrentShopId(session);
		return ResponseEntity.ok(saleService.getWorkInProcess(currShopId, date));
	}

	@PostMapping("/change/ct")
	public ResponseEntity<Integer> getCtChangeAmount(HttpSession session,
													 @RequestBody CommonVO vo){
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		return ResponseEntity.ok(saleService.getCtChangeAmount(vo));
	}

	@PostMapping("/change/internet")
	public ResponseEntity<Integer> getInternetChangeAmount(HttpSession session,
														   @RequestBody CommonVO vo){
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		return ResponseEntity.ok(saleService.getInternetChangeAmount(vo));
	}

	@PostMapping("/change/tv")
	public ResponseEntity<Integer> getTvChangeAmount(HttpSession session,
													 @RequestBody CommonVO vo){
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		return ResponseEntity.ok(saleService.getTvChangeAmount(vo));
	}

	@PostMapping("/change/total-cms")
	public ResponseEntity<Float> getTotalCmsChangeAmount(HttpSession session,
														 @RequestBody CommonVO vo){
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		return ResponseEntity.ok(saleService.getTotalCmsChangeAmount(vo));
	}

	@PostMapping("/change/avg-cms")
	public ResponseEntity<Float> getAvgCmsChangeAmount(HttpSession session,
													   @RequestBody CommonVO vo){
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		return ResponseEntity.ok(saleService.getAvgCmsChangeAmount(vo));
	}


	// 그래프 페이지
	// 그래프 요약
	@PostMapping("/graph/summary")
	public ResponseEntity<List<Map<String,Object>>> getGraphSummary(HttpSession session,
																	@RequestBody CommonVO vo){
		log.info("summary: {}", vo);
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		return ResponseEntity.ok(saleService.getGraphSummary(vo));
	}

	@PostMapping("/graph/ct/{dateType}")
	public ResponseEntity<Map<String,String> > getCtGraphByDateType(HttpSession session,
																	@PathVariable Character dateType,
														  			@RequestBody CommonVO vo){
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		vo.setDateType(dateType);
		return ResponseEntity.ok(saleService.getCtGraphByDateType(vo));
	}

	@PostMapping("/graph/internet/{dateType}")
	public ResponseEntity<Map<String,String> > getInternetGraphByDateType(HttpSession session,
																		  @PathVariable Character dateType,
																		  @RequestBody CommonVO vo){
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		vo.setDateType(dateType);
		return ResponseEntity.ok(saleService.getInternetGraphByDateType(vo));
	}

	@PostMapping("/graph/tv/{dateType}")
	public ResponseEntity<Map<String,String> > getTvGraphByDateType(HttpSession session,
																	@PathVariable Character dateType,
																	@RequestBody CommonVO vo){
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		vo.setDateType(dateType);
		return ResponseEntity.ok(saleService.getTvGraphByDateType(vo));
	}

	@PostMapping("/graph/margin/{dateType}")
	public ResponseEntity<Map<String,String> > getMarginGraphByDateType(HttpSession session,
																		@PathVariable Character dateType,
																		@RequestBody CommonVO vo){
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		vo.setDateType(dateType);
		return ResponseEntity.ok(saleService.getMarginGraphByDateType(vo));
	}

	@PostMapping("/graph/avg-margin/date/{dateType}")
	public ResponseEntity<Map<String,String> > getAvgMarginGraphByDateType(HttpSession session,
																		   @PathVariable Character dateType,
																		   @RequestBody CommonVO vo){
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		vo.setDateType(dateType);
		return ResponseEntity.ok(saleService.getAvgMarginGraphByDateType(vo));
	}

	@PostMapping("/graph/ct/select/{selectType}")
	public ResponseEntity<List<Integer> > getCtCountBySelectType(HttpSession session,
																   @PathVariable Integer selectType,
																   @RequestBody CommonVO vo){
		if (selectType == null) {
			return ResponseEntity.badRequest().build();
		}
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		String select = switch (selectType) {
            case 0 -> "generation";
            case 1 -> "weekdays";
            default -> null;
        };
        vo.setSelectType(select);
		return ResponseEntity.ok(saleService.getCtCountBySelectType(vo));
	}

	@PostMapping("/graph/stat/select/{selectType}")
	public ResponseEntity<List<Map<String,Object>> > getStatBySelectType(HttpSession session,
																   @PathVariable Integer selectType,
																   @RequestBody CommonVO vo){
		if (selectType == null) {
			return ResponseEntity.badRequest().build();
		}
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		String select = switch (selectType) {
            case 0 -> "device";
			case 1 -> "actv_plan";
			case 2 -> "sec_device";
            default -> null;
        };
        vo.setSelectType(select);
		return ResponseEntity.ok(saleService.getStatBySelectType(vo));
	}

	@PostMapping("/graph/ratio/select/{selectType}")
	public ResponseEntity<Map<String,Object>> getRatioBySelectType(HttpSession session,
																		 @PathVariable Integer selectType,
																		 @RequestBody CommonVO vo){
		if (selectType == null) {
			return ResponseEntity.badRequest().build();
		}
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);

        return switch (selectType) {
            case 0 -> ResponseEntity.ok(saleService.getIstmRatio(vo));
            case 1 -> ResponseEntity.ok(saleService.getProviderRatio(vo));
            case 2 -> ResponseEntity.ok(saleService.getActvTpRatio(vo));
            case 3 -> ResponseEntity.ok(saleService.getGenderRatio(vo));
            default -> ResponseEntity.badRequest().build();
        };
    }




	// 통계 페이지
	@PostMapping("/stat")
	public ResponseEntity<Map<String,Object>> getPersonalStatistics(HttpSession session,
												  @RequestBody CommonVO vo){
		int currShopId = commonService.getCurrentShopId(session);
		vo.setCurrShopId(currShopId);
		return  ResponseEntity.ok(saleService.getPersonalStatistics(vo));
	}
}
