package com.momo.generator;

import com.momo.service.ShopService;
import com.momo.service.UserService;
import com.momo.common.vo.ItemCommonVO;
import com.momo.common.vo.MsgCommonVO;
import com.momo.common.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class MessageGenerator {
//	private final ItemCommonService itemCommonService;
//	private final UserService       userService;
//	private final ShopService shopService;
//
//	public String createContent(MsgCommonVO vo) {
//		int    formId  = vo.getFormId();
//		int    typeId  = vo.getTypeId();
////		String content = selectForm(MsgCommonVO.builder().formId(formId).build()).get(0).get("content").toString();
//		String content = vo.getContent();
//
//		Map<String, Object> seller = userService.getUser(UserVO.builder().id(vo.getSellerId()).build()).get(0);
//		Map<String, Object> shop   = shopService.getShopById(vo.getShopId());
//		content = content.replace("#{seller_nm}", seller.get("name").toString())
//				.replace("#{cust_nm}", vo.getCustNm())
//				.replace("#{shop_nm}]", shop.get("shop_nm").toString());
//
//
//		Map<String, Object> map         = null;
//		String              serviceNm   = "null";
//		String              desciprtion = "null";
//		switch (formId) {
//			case -2: // 요금제
//				map = itemCommonService.selectPlan(ItemCommonVO.builder().planId(typeId).build()).get(0);
//				serviceNm = map.get("plan_nm").toString();
//				desciprtion = map.get("description").toString();
//				break;
//			case -3: // 부가서비스
//				map = itemCommonService.selectExsvc(ItemCommonVO.builder().exsvcId(typeId).build()).get(0);
//				serviceNm = map.get("exsvc_nm").toString();
//				desciprtion = map.get("description").toString();
//				break;
//			default:
//				break;
//		}
//		content = content.replace("#{service_nm}", serviceNm).replace("#{description}", desciprtion);
//
//		return content;
//	}

}
