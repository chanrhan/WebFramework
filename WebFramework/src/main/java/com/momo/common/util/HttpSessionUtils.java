package com.momo.common.util;

import com.momo.common.enums.codes.CommonErrorCode;
import com.momo.exception.BusinessException;
import com.momo.mapper.UserMapper;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class HttpSessionUtils {
    private final UserMapper userMapper;

//    public static int getCurrentShopId(HttpSession session){
//        Object _attr = session.getAttribute("curr_shop_id");
//        if(_attr != null){
//            return Integer.parseInt(_attr.toString());
//        }else{
//            throw new BusinessException(CommonErrorCode.SESSION_NOT_FOUND);
//        }
//    }
}
