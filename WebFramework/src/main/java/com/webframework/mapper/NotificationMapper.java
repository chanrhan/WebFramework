package com.webframework.mapper;

import com.webframework.common.vo.NotifVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
@Mapper
public interface NotificationMapper {
	public int countUnreadNotif(String userId);
	public List<Map<String,Object>> getNotifList(String userId);
	// Notification
	public void insertNotification(NotifVO vo);
//	public List<Map<String,Object>> getNotification(NotifVO vo);
//	public List<Map<String,Object>> searchAlert(SearchVO vo);
	public int read(int id);
	public int readAll(String userId);
	public int readAllByReceiver(String id);
	public int approve(int id);
}
