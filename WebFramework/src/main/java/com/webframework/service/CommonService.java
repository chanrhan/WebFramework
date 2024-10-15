package com.webframework.service;

import com.webframework.common.enums.codes.CommonErrorCode;
import com.webframework.common.util.SecurityContextUtil;
import com.webframework.exception.BusinessException;
import com.webframework.mapper.UserMapper;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommonService {
    private static final Logger log = LoggerFactory.getLogger(CommonService.class);
    private final UserMapper userMapper;


    // Authentication
    public void setCurrentShopId(HttpSession session){
        int currShopId = getCurrentShopId(session);
        session.setAttribute("curr_shop_id", currShopId);
    }

    public int getCurrentShopId(HttpSession session){
        Object _attr = session.getAttribute("curr_shop_id");
        if(_attr != null){
            return Integer.parseInt(_attr.toString());
        }
        else{
            log.info("Session('curr_shop_id') is not found. Try to find on Database...");
            String username = SecurityContextUtil.getUsername();
            Integer currShopId = userMapper.getSessionData(username);
            if(currShopId == null){
                throw new BusinessException(CommonErrorCode.SESSION_NOT_FOUND);
            }
            session.setAttribute("curr_shop_id", currShopId);
            return currShopId;
        }
//        throw new BusinessException(CommonErrorCode.SESSION_NOT_FOUND);
    }
}
