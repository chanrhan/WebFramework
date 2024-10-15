package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.TodoVO;
import com.momo.service.TodoService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/v1/todo")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @GetMapping("")
    public ResponseEntity<List<Integer>> getTodoForCalendar(HttpSession session,
                                                            @RequestParam String date){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        return ResponseEntity.ok(todoService.getTodoForCalendar(TodoVO.builder().date(date).currShopId(currShopId).build()));
    }

    @GetMapping("/detail")
    public ResponseEntity<List<Map<String,Object>>> getTodoDetail(HttpSession session,
                                                                  @RequestParam String date){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        return ResponseEntity.ok(todoService.getTodoDetail(TodoVO.builder().date(date).currShopId(currShopId).build()));
    }

    @PostMapping("/detail/content")
    public ResponseEntity<Boolean> updateTodoContent(HttpSession session,
                                                     @RequestBody TodoVO vo){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        vo.setCurrShopId(currShopId);
//        int id = Integer.parseInt(map.get("index").toString());
//        String content = map.get("content").toString();
//        String date = map.get("date").toString();

        return ResponseEntity.ok(todoService.updateTodoContent(vo) > 0);
    }

    @PostMapping("/detail/color")
    @Deprecated
    public ResponseEntity<Boolean> updateTodoColor(HttpSession session,
                                                   @RequestBody TodoVO vo){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        vo.setCurrShopId(currShopId);
//        int id = Integer.parseInt(map.get("index").toString());
//        int color = Integer.parseInt(map.get("color").toString());
//        String date = map.get("date").toString();

        return ResponseEntity.ok(todoService.updateTodoColor(vo) > 0);
    }

    @PostMapping("/detail/checked")
    public ResponseEntity<Boolean> updateTodoChecked(HttpSession session,
                                                   @RequestBody TodoVO vo){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        vo.setCurrShopId(currShopId);
//        int id = Integer.parseInt(map.get("index").toString());
//        int color = Integer.parseInt(map.get("color").toString());
//        String date = map.get("date").toString();

        return ResponseEntity.ok(todoService.updateTodoChecked(vo) > 0);
    }

    @PostMapping("/detail/add")
    public ResponseEntity<Boolean> addTodo(HttpSession session,
                                           @RequestBody TodoVO vo){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        vo.setCurrShopId(currShopId);
//        int color = Integer.parseInt(map.get("color").toString());
//        String content = map.get("content").toString();
//        String date = map.get("date").toString();

        todoService.insertTodo(vo);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/detail/del")
    public ResponseEntity<Boolean> deleteTodo(HttpSession session,
                                              @RequestBody TodoVO vo){
        int currShopId = Integer.parseInt(session.getAttribute("curr_shop_id").toString());
        vo.setCurrShopId(currShopId);
//        int id = Integer.parseInt(map.get("id").toString());
//        String date = map.get("date").toString();

        return ResponseEntity.ok(todoService.deleteTodo(vo) > 0);
    }
}
