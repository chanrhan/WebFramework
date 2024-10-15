package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
import com.momo.service.CommonService;
import com.momo.service.ReserveMsgService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/msg")
public class ReserveMsgController {
    private final ReserveMsgService reserveMsgService;
    private final CommonService commonService;

    @GetMapping("/calendar")
    public ResponseEntity<List<String>> getReserveMsgForCalendar(HttpSession session,
                                                                              @RequestParam String date){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(reserveMsgService.getReserveMsgForCalendar(currShopId, date));
    }

    @GetMapping("/detail")
    public ResponseEntity<List<Map<String,Object>>> getReserveMsgDetail(HttpSession session,
                                                                        @RequestParam String date,
                                                                        @RequestParam int state){
        int currShopId = commonService.getCurrentShopId(session);
        return ResponseEntity.ok(reserveMsgService.getReserveMsgDetail(currShopId, date, state));
    }
}
