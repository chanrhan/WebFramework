package com.momo.service;

import com.momo.common.vo.ReserveMessageVO;
import com.momo.mapper.ReserveMsgMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReserveMsgService {
	private final ReserveMsgMapper reserveMsgMapper;

    public void insertMsgList(int currShopId, int saleId, List<ReserveMessageVO> list){
		for(ReserveMessageVO vo : list){
			vo.setSaleId(saleId);
			vo.setCurrShopId(currShopId);
			reserveMsgMapper.insertMsg(vo);
		}
	}

	public List<String> getReserveMsgForCalendar(int currShopId, String date){
		return reserveMsgMapper.getReserveMsgForCalendar(currShopId,date);
	}

	public List<Map<String ,Object>> getReserveMsgDetail(int currShopId, String date, int state){
		return reserveMsgMapper.getReserveMsgDetail(currShopId, date, state);
	}
}
