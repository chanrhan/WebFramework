package com.momo.mapper;

import com.momo.common.vo.MsgCommonVO;
import com.momo.common.vo.ReserveMessageVO;
import com.momo.common.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReserveMsgMapper {
	// Message Reserve
	public int insertMsg(ReserveMessageVO vo);

	public List<String> getReserveMsgForCalendar(int currShopId, String date);

	public List<Map<String,Object>> getReserveMsgDetail(int currShopId, String date,int state);
}
